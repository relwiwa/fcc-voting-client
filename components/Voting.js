import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Dashboard from './Dashboard';
import PollAdd from './PollAdd';
import PollEdit from './PollEdit';
import PollResult from './PollResult';
import Polls from './Polls';
import PollVote from './PollVote';
import ProtectedRoute from '../../../reusable-components/protected-route';

import { AuthenticationContext, getJwtToken } from '../../../services/authentication';
import BasenameContext from '../config/BasenameContext';

class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPoll: null,
      polls: [],
      error: null,
    };
    this.handleDeletePoll = this.handleDeletePoll.bind(this);
    this.handleNewPollTransmitted = this.handleNewPollTransmitted.bind(this);
    this.handleNewOptionsTransmitted = this.handleNewOptionsTransmitted.bind(this);
    this.handleVoteTransmitted = this.handleVoteTransmitted.bind(this);
  }

  getPoll(pollId) {
    // error handing if poll does not exist, no such poll message
    axios.get(`http://localhost:3000/poll/${pollId}`)
    .then(response => {
      this.setState({
        currentPoll: response.data.poll,
      });
    })
    .catch(error => {
      this.setState({
        error: 'An error happened while getting this poll',
      });
    });
  }

  getPolls() {
    axios.get('http://localhost:3000/polls')
    .then(response => {
      this.setState({
        polls: response.data.polls,
      });
    })
    .catch(error => {
      this.setState({
        error: 'An error happened while getting the list of polls',
      });
    });
  }

  handleDeletePoll() {
    const { currentPoll, polls } = this.state;
    const { basename, history } = this.props;
    const jwtToken = getJwtToken();

    axios.delete(`http://localhost:3000/poll/${currentPoll._id}`, {
      // delete requests send data via data property
      data: { jwtToken },
    })
    .then(
      response => {
        history.push(`${basename}`);
        this.setState({
          currentPoll: null,
          polls: polls.filter(poll => poll._id !== currentPoll._id),
        });
      },
      error => {
        this.setState({
          error: 'An error happened while deleting your poll',
        });
      }
    );
  }

  handleNewPollTransmitted(newPoll) {
    const { basename, history } = this.props;
    this.setState({
      currentPoll: newPoll,
    });
    history.push(`${basename}poll/${newPoll['_id']}/result`);
  }

  handleNewOptionsTransmitted(updatedPoll) {
    const { basename, history } = this.props;
    this.setState({
      currentPoll: updatedPoll,
    });
    history.push(`${basename}poll/${updatedPoll['_id']}/result`);
  }

  handleVoteTransmitted(updatedPoll) {
    this.setState({
      currentPoll: updatedPoll,
    });
  }

  render() {
    const { basename } = this.props;
    const { currentPoll, error, polls } = this.state;

    return (
      <div className="voting grid-container grid-container-padded">
        <h1 className="text-center">
          Decisions, Decisions
        </h1>
        <BasenameContext.Provider value={basename}>
          <AuthenticationContext.Consumer>
            {({ isAuthenticated }) => <Switch>
              <Route path={`${basename}`} exact render={() => {
                if (polls.length === 0 && error === null) {
                  this.getPolls();
                }
                return <Dashboard
                  error={error}
                  latestPolls={polls}
                  popularPolls={polls}
                />;
              }} />
              <Route path={`${basename}polls`} render={() => {
                if (polls.length === 0 && error === null) {
                  this.getPolls();
                }
                return <Polls
                  polls={polls}
                />;
              }} />
              <Route path={`${basename}poll/:id/vote`} render={({ match }) => {
                if (!error && (!currentPoll || currentPoll._id !== match.params.id)) {
                  this.getPoll(match.params.id);
                  return <div className="text-center"><FontAwesomeIcon icon="spinner" spin /> Loading current poll</div>;
                }
                else {
                  return <PollVote
                    onVoteTransmitted={this.handleVoteTransmitted}
                    poll={currentPoll}
                  />;
                }
              }} />
              <Route path={`${basename}poll/:id/result`} render={({ match }) => {
                if (!error && (!currentPoll || currentPoll._id !== match.params.id)) {
                  this.getPoll(match.params.id);
                  return <div className="text-center"><FontAwesomeIcon icon="spinner" spin /> Loading current poll</div>;
                }
                else {
                  return <PollResult
                    onDeletePoll={this.handleDeletePoll}
                    poll={currentPoll}
                  />;
                }
              }} />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path={`${basename}poll-add`}
                render={() => <PollAdd
                  onNewPollTransmitted={this.handleNewPollTransmitted}
                />}
                project="Decisions, Decisions"
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path={`${basename}poll/:id/edit`}
                render={({ match }) => {
                  if (!error && (!currentPoll || currentPoll._id !== match.params.id)) {
                    this.getPoll(match.params.id);
                    return <div className="text-center"><FontAwesomeIcon icon="spinner" spin /> Loading current poll</div>;
                  }
                  else {
                    return <PollEdit
                      onNewOptionsTransmitted={this.handleNewOptionsTransmitted}
                      poll={currentPoll}
                    />;
                  }
                }}
                project="Decisions, Decisions"
              />
            </Switch>}
          </AuthenticationContext.Consumer>
        </BasenameContext.Provider>
      </div>
    );
  }
}

Voting.defaultProps = {
  basename: '/backend-projects/voting/',
};

Voting.propTypes = {
  basename: PropTypes.string,
};

export default withRouter(Voting);
