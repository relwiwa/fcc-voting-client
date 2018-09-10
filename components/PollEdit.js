import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import Poll from './Poll';
import PollFormButtons from './PollFormButtons';
import PollOptionsForm from './PollOptionsForm';
import PollOption from '../models/PollOption';
import { getJwtToken } from '../../../services/authentication';
import { POLL_PHASES } from '../config/ApplicationVocab';
const { ENTER_POLL, ERROR_HAPPENED, SUBMIT_POLL } = POLL_PHASES;

const statusMessages = {};
statusMessages[ENTER_POLL] = 'Enter new options';
statusMessages[SUBMIT_POLL] = <Fragment><FontAwesomeIcon icon="spinner" spin /> Your poll with its new options is being transferred</Fragment>;
statusMessages[ERROR_HAPPENED] = 'An error happened while trying to save the new options of your poll';

class PollEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [new PollOption()],
      phase: ENTER_POLL,
    }
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
    const { onNewOptionsTransmitted, poll } = this.props;
    const { options } = this.state;
    const jwtToken = getJwtToken();
  
    this.setState({
      phase: SUBMIT_POLL,
    });
    axios.patch(`http://localhost:3000/poll/${poll._id}`, {
      options,
      jwtToken,
    })
    .then(
      response => {
        onNewOptionsTransmitted(response.data.poll);
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

  render () {
    const { poll } = this.props;
    const { options, phase } = this.state;
    const optionsValid = this.validateOptions(options);
    
    return <div className="poll-edit grid-x grid-margin-y">
      <div className="cell">
        <Poll
          displayChart={false}
          displayResults={true}
          poll={poll}
          statusMessage={statusMessages[phase]}
        />
      </div>
      <div className="cell">
        <PollOptionsForm
          headline="Add New Options"
          helptext="Add new options with at least one character each"
          minOptionsAmount={1}
          onChangeOption={this.handleChangeOption}
          onDeleteOption={this.handleDeleteOption}
          options={options}
          optionsValid={optionsValid}
        />
      </div>
      <div className="cell">
        <PollFormButtons
          cancelUrlFragment={`poll/${poll._id}/result`}
          formValid={optionsValid}
          onAddOption={this.handleAddOption}
          onSubmitPoll={this.handleSubmitPoll}
          submissionPhase={false}
        />
      </div>
    </div>;
  }
}

PollEdit.propTypes = {
  onNewOptionsTransmitted: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
};

export default PollEdit;
