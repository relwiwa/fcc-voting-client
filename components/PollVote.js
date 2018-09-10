import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import BasenameContext from '../config/BasenameContext';
import IconButton from '../../../reusable-components/icon-button';
import Poll from './Poll';

import { ANONYMOUS_VOTER, VOTING_PHASES } from '../config/ApplicationVocab';
const { CHOSE_VOTE, ERROR_HAPPENED, SUBMIT_VOTE, VOTE_SUBMITTED } = VOTING_PHASES;

const statusMessages = {};
statusMessages[CHOSE_VOTE] = 'Choose one of the options below and submit your vote';
statusMessages[ERROR_HAPPENED] = 'An error happened while transferring your vote';
statusMessages[SUBMIT_VOTE] = <Fragment><FontAwesomeIcon icon="spinner" spin /> Your vote is being transferred</Fragment>;
statusMessages[VOTE_SUBMITTED] = 'Thank you for submitting your vote';

class PollVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: this.props.poll,
      selectedOptionId: null,
      votingPhase: CHOSE_VOTE,
    };
    this.handleSubmitVote = this.handleSubmitVote.bind(this);
  }

  handleSubmitVote() {
    const { poll, selectedOptionId } = this.state;
    const { onVoteTransmitted } = this.props;

    this.setState({
      votingPhase: SUBMIT_VOTE,
    });
    axios.patch(`http://localhost:3000/poll/${poll._id}/vote`, {
      optionId: selectedOptionId,
      voter: ANONYMOUS_VOTER,
    })
    .then(response => {
      onVoteTransmitted(response.data.poll);
      this.setState({
        poll: response.data.poll,
        votingPhase: VOTE_SUBMITTED,
      });
    })
    .catch(error => {
      this.setState({
        votingPhase: ERROR_HAPPENED,
      });
    });
  }

  render() {
    const { selectedOptionId, poll, votingPhase } = this.state;
    const { history } = this.props;

    return <div className="poll-vote">
      <Poll
        displayChart={false}
        displayResults={false}
        onSelectOption={votingPhase === CHOSE_VOTE ? (selectedOptionId) => this.setState({ selectedOptionId }) : null}
        selectedOptionId={selectedOptionId}
        poll={poll}
        statusMessage={statusMessages[votingPhase]}
      />
      <BasenameContext.Consumer>
        {basename => <div className="grid-x grid-margin-y">
          <div className="cell text-center medium-text-right medium-order-2 medium-6">
            {(votingPhase === CHOSE_VOTE || votingPhase === ERROR_HAPPENED) && <IconButton
              faIcon="save"
              foundationClass={selectedOptionId === null ? 'disabled ' : '' + 'primary'}
              onClick={selectedOptionId !== null ? this.handleSubmitVote : null}
              text="Submit Vote"
            />}
            {votingPhase === VOTE_SUBMITTED && <IconButton
              faIcon="chart-pie"
              foundationClass="success"
              onClick={() => history.push(`${basename}poll/${poll._id}/result`)}
              text="View Results"
            />}
          </div>
          <div className="cell text-center medium-text-left medium-order-1 medium-6">
            <IconButton
              faIcon="home"
              foundationClass="primary"
              link={`${basename}`}
              text="Dashboard"
            />
          </div>
        </div>}
      </BasenameContext.Consumer>
    </div>;
  }
}

PollVote.propTypes = {
  poll: PropTypes.object.isRequired,
  onVoteTransmitted: PropTypes.func.isRequired,
};

export default withRouter(PollVote);
