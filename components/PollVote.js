import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import IconButton from '../../../reusable-components/icon-button';
import Poll from './Poll';

import { VOTING_PHASES } from '../config/ApplicationVocab';
const { CHOSE_VOTE, SUBMIT_VOTE, VOTE_SUBMITTED } = VOTING_PHASES;

const statusMessages = {};
statusMessages[CHOSE_VOTE] = 'Choose one of the options below and submit your vote';
statusMessages[SUBMIT_VOTE] = <Fragment><FontAwesomeIcon icon="spinner" spin /> Your vote is being transferred</Fragment>;
statusMessages[VOTE_SUBMITTED] = 'Thank you for submitting your vote';

class PollVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: this.props.poll,
      optionSelected: null,
      votingPhase: CHOSE_VOTE,
    };
    this.handleSubmitVote = this.handleSubmitVote.bind(this);
  }

  handleSubmitVote() {
    // TODO: API Call
    this.setState({
      votingPhase: SUBMIT_VOTE,
    });
    setTimeout(() => this.setState({ votingPhase: VOTE_SUBMITTED }), 3000);
  }

  render() {
    const { optionSelected, poll, votingPhase } = this.state;

    return <div className="poll-vote">
      <Poll
        displayResults={false}
        onSelectOption={votingPhase === CHOSE_VOTE ? (optionSelected) => this.setState({ optionSelected }) : null}
        optionSelected={optionSelected}
        poll={poll}
        statusMessage={statusMessages[votingPhase]}
      />
      <div className="grid-x grid-margin-y">
        <div className="cell text-right">
          {votingPhase === CHOSE_VOTE && <IconButton
            faIcon="save"
            foundationClass={optionSelected === null ? 'disabled ' : '' + 'primary'}
            onClick={optionSelected !== null ? this.handleSubmitVote : null}
            text="Submit Vote"
          />}
          {votingPhase === VOTE_SUBMITTED && <IconButton
            faIcon="chart-pie"
            foundationClass="success"
            text="View Results"
          />}
        </div>
      </div>
    </div>;
  }
}

Poll.propTypes = {
  poll: PropTypes.object.isRequired,
}

export default PollVote;
