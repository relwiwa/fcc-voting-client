import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Dashboard from './Dashboard';
import PollAdd from './PollAdd';
import PollContainer from './PollContainer';
import Polls from './Polls';
import ProtectedRoute from '../../../reusable-components/protected-route';

import { AuthenticationContext, getJwtToken } from '../../../services/authentication';
import BasenameContext from '../config/BasenameContext';
import Poll from '../models/Poll';

class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      error: null,
    };
    this.handleNewPollTransmitted = this.handleNewPollTransmitted.bind(this);
    console.log(props.history.location);
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

  handleNewPollTransmitted(newPoll) {
    const { basename, history } = this.props;
    history.push(`${basename}poll/${newPoll['_id']}/result`);
  }

  render() {
    const { basename } = this.props;
    const { error, polls } = this.state;

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
              <Route
                path={`${basename}poll/:pollId/vote`}
                render={() => <PollContainer
                  isAuthenticated={isAuthenticated}
                />}
              />
              <Route
                path={`${basename}poll/:pollId/result`}
                render={() => <PollContainer
                  isAuthenticated={isAuthenticated}
                />}
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path={`${basename}poll/:pollId/edit`}
                render={() => <PollContainer
                  isAuthenticated={isAuthenticated}
                />}
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path={`${basename}poll-add`}
                render={() => <PollAdd
                  onNewPollTransmitted={this.handleNewPollTransmitted}
                />}
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
