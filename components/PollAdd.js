import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import './PollAdd.scss';

import { getJwtToken } from '../../../services/authentication';
import FormHelpText from '../../../reusable-components/form-help-text';
import Poll from '../models/Poll';
import PollFormButtons from './PollFormButtons';
import PollFormInput from './PollFormInput';
import PollOption from '../models/PollOption';
import PollOptionsForm from './PollOptionsForm';
import { POLL_PHASES } from '../config/ApplicationVocab';

const { ENTER_POLL, ERROR_HAPPENED, SUBMIT_POLL } = POLL_PHASES;

const statusMessages = {};
statusMessages[ENTER_POLL] = 'Enter your question with at least two options';
statusMessages[SUBMIT_POLL] = <Fragment><FontAwesomeIcon icon="spinner" spin /> Your poll is being transferred</Fragment>;
statusMessages[ERROR_HAPPENED] = 'An error happened while trying to save your new poll';

class PollAdd extends Component {
  constructor(props) {
    super(props);
    const poll = new Poll();
    this.state = {
      question: poll.question,
      options: [...poll.options],
      phase: ENTER_POLL,
    };
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleSubmitPoll = this.handleSubmitPoll.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.validateOptions = this.validateOptions.bind(this);
  }

  handleAddOption() {
    const { options } = this.state;
    this.setState({
      options: [...options].concat([new PollOption()]),
    });
  }

  handleChangeOption(value, index) {
    const { options } = this.state;
    const newOptions = [...options];
    const newOption = {...newOptions[index]};
    newOption.value = value;
    newOptions[index] = newOption;
    this.setState({
      options: newOptions,
    });
  }

  handleDeleteOption(index) {
    const { options } = this.state;
    this.setState({
      options: options.slice(0, index).concat(options.slice(index + 1)),
    });
  }

  handleSubmitPoll() {
    const { onNewPollTransmitted } = this.props;
    const { options, question } = this.state;
    const jwtToken = getJwtToken();

    this.setState({
      phase: SUBMIT_POLL,
    });
    axios.post('http://localhost:3000/poll', {
      question,
      options,
      jwtToken,
    })
    .then(
      response => {
        onNewPollTransmitted(response.data.poll);
      },
      error => {
        this.setState({
          phase: ERROR_HAPPENED,
        });
      }
    );
  }

  validateInput(value, length) {
    const pattern = /^[a-zA-Z0-9 ?,.]*$/;
    if (!pattern.test(value)) {
      return false;
    }
    if (value.length < length) {
      return false;
    }
    return true;
  }

  validateOptions(options) {
    for (let i = 0; i < options.length; i++) {
      if (!this.validateInput(options[i].value, 1)) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { options, phase, question } = this.state;
    const questionValid = this.validateInput(question, 5);
    const optionsValid = this.validateOptions(options);

    return <div className="poll-add grid-x">
      <div className="cell">
        <div className="callout primary"><h2>Add New Poll</h2></div>
        <div className="callout">{statusMessages[phase]}</div>
      </div>
      <h3 className="cell">Question</h3>
      <PollFormInput
        buttonDisplay={false}
        label={<FontAwesomeIcon icon="question" />}
        onChangeInput={(question) => this.setState({ question })}
        placeholder="Enter Your Question"
        value={question}
      />
      <FormHelpText
        text="Enter your question with at least 5 characters"
        valid={questionValid}
      />
      <div className="cell">
        <PollOptionsForm
          headline="Options"
          helptext="Add at least two options with at least one character each"
          minOptionsAmount={2}
          onChangeOption={this.handleChangeOption}
          onDeleteOption={this.handleDeleteOption}
          options={options}
          optionsValid={optionsValid}
        />
      </div>
      <div className="cell">
        <PollFormButtons
          cancelUrlFragment={``}
          formValid={optionsValid && questionValid}
          onAddOption={this.handleAddOption}
          onSubmitPoll={this.handleSubmitPoll}
          submissionPhase={phase === SUBMIT_POLL}
        />
      </div>
    </div>;
  }
}

PollAdd.propTypes = {
  onNewPollTransmitted: PropTypes.func.isRequired,
};

export default PollAdd;
