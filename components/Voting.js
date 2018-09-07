import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import PollAdd from './PollAdd';
import PollEdit from './PollEdit';
import PollResult from './PollResult';
import PollVote from './PollVote';

import BasenameContext from '../config/BasenameContext';

class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPoll: null,
      polls: [],
      error: null,
    };
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

  render() {
    const { basename } = this.props;
    const { currentPoll, error, polls } = this.state;

    return (
      <div className="voting grid-container grid-container-padded">
        <h1 className="text-center">
          Decisions, Decisions
        </h1>
        <BasenameContext.Provider value={basename}>
          <Switch>
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
            <Route path={`${basename}poll/:id/vote`} render={({ match }) => {
              if (!error && (!currentPoll || currentPoll._id !== match.params.id)) {
                this.getPoll(match.params.id);
                return <div className="text-center"><FontAwesomeIcon icon="spinner" spin /> Loading current poll</div>;
              }
              else {
                return <PollVote
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
                  poll={currentPoll}
                />;
              }
            }} />
            {/* route will be protected */}
            <Route path={`${basename}poll-add`} render={() => {
              return <PollAdd />
            }} />
            {/* route will be protected */}
            <Route path={`${basename}poll/:id/edit`} render={({ match }) => {
              if (!error && (!currentPoll || currentPoll._id !== match.params.id)) {
                this.getPoll(match.params.id);
                return <div className="text-center"><FontAwesomeIcon icon="spinner" spin /> Loading current poll</div>;
              }
              else {
                return <PollEdit
                  poll={currentPoll}
                />;
              }
            }} />
          </Switch>
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

export default Voting;
