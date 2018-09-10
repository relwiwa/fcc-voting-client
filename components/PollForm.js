import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import FormHelpText from '../../../reusable-components/form-help-text';
import IconButton from '../../../reusable-components/icon-button';
import PollFormInput from './PollFormInput';
import PollOption from '../models/PollOption';
import './PollForm.scss';
import { getJwtToken } from '../../../services/authentication';
import BasenameContext from '../config/BasenameContext';
import { POLL_PHASES } from '../config/ApplicationVocab';
const { ENTER_POLL, ERROR_HAPPENED, SUBMIT_POLL } = POLL_PHASES;

const statusMessages = {};
statusMessages[ENTER_POLL] = 'Enter your question with at least two options';
statusMessages[SUBMIT_POLL] = <Fragment><FontAwesomeIcon icon="spinner" spin /> Your poll is being transferred</Fragment>;
statusMessages[ERROR_HAPPENED] = 'An error happened while trying to save your new poll';

class PollForm extends Component {
  constructor(props) {
    super(props);
    const { poll } = this.props;
    this.state = {
      question: poll.question,
      options: [...poll.options],
      phase: ENTER_POLL,
    };
    this.handleAddOption = this.handleAddOption.bind(this);
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
    const { apiMethod, apiUrl, onPollTransmitted } = this.props;
    const { options, question } = this.state;
    const jwtToken = getJwtToken();

    this.setState({
      phase: SUBMIT_POLL,
    });
    axios[apiMethod](apiUrl, {
      question,
      options,
      jwtToken,
    })
    .then(
      response => {
        onPollTransmitted(response.data.poll);
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
    const { cancelUrlFragment, headline, history } = this.props;
    const { options, phase, question } = this.state;
    const questionValid = this.validateInput(question, 5);
    const optionsValid = this.validateOptions(options);
    const submissionPhase = phase === SUBMIT_POLL;

    return <div className="poll-form grid-x">
      <div className="cell">
        <div className="callout primary"><h2>{headline}</h2></div>
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
      <h3 className="cell">Options</h3>
      {options.map((option, index) => <PollFormInput
        buttonDisabled={options.length <= 2}
        buttonDisplay={true}
        buttonIcon="trash"
        buttonOnClick={() => this.handleDeleteOption(index)}
        key={index}
        label={`${index + 1}`}
        onChangeInput={(option) => this.handleChangeOption(option, index)}
        placeholder={`Enter Option ${index + 1}`}
        value={option.value}
      />)}
      <FormHelpText
        text="Enter at least two options with at least one character each"
        valid={optionsValid}
      />
      <div className="cell">
        <div className="button-group align-right">
          <BasenameContext.Consumer>
            {basename => <IconButton
              faIcon="times"
              foundationClass={(submissionPhase ? 'disabled ' : '') + 'warning'}
              onClick={!submissionPhase ? () => history.push(`${basename}${cancelUrlFragment}`) : null}
              text="Cancel"
            />}
          </BasenameContext.Consumer>
          <IconButton
            faIcon="plus"
            foundationClass={(submissionPhase ? 'disabled ' : '') + 'secondary'}
            onClick={!submissionPhase ? this.handleAddOption : null}
            text="Add Option"
          />
          <IconButton
            faIcon="save"
            foundationClass={(!submissionPhase && questionValid && optionsValid ? '' : 'disabled ') + 'primary'}
            onClick={(!submissionPhase && questionValid && optionsValid) ? this.handleSubmitPoll : null}
            text="Submit Poll"
          />
        </div>
      </div>
    </div>;
  }
}

PollForm.propTypes = {
  apiMethod: PropTypes.oneOf(['patch', 'post']).isRequired,
  apiUrl: PropTypes.string.isRequired,
  cancelUrlFragment: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  onPollTransmitted: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
};

export default withRouter(PollForm);
