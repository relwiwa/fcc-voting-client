import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PollContainer from './PollContainer';
import PollsContainer from './PollsContainer';
import ProtectedRoute from '../../../reusable-components/protected-route';

import { AuthenticationContext } from '../../../services/authentication';
import BasenameContext from '../config/BasenameContext';

const Voting = ({ basename = '/backend-projects/voting/' }) => {
  return (
    <div className="voting grid-container grid-container-padded">
      <h1 className="text-center">
        Decisions, Decisions
      </h1>
      <BasenameContext.Provider value={basename}>
        <AuthenticationContext.Consumer>
          {({ isAuthenticated, authenticatedUserId }) => <Switch>
            <Route
              path={`${basename}`}
              exact
              render={() => <PollsContainer
                authenticatedUserId={authenticatedUserId}
                isAuthenticated={isAuthenticated}
              />}
            />
            <Route
              path={`${basename}polls`}
              exact
              render={() => <PollsContainer
                authenticatedUserId={authenticatedUserId}
                isAuthenticated={isAuthenticated}
              />}
            />
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path={`${basename}polls-user`}
              render={() => <PollsContainer
                authenticatedUserId={authenticatedUserId}
                isAuthenticated={isAuthenticated}
              />}
              project="Decisions, Decisions"
            />
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
              render={() => <PollContainer
                isAuthenticated={isAuthenticated}
              />}
              project="Decisions, Decisions"
            />
          </Switch>}
        </AuthenticationContext.Consumer>
      </BasenameContext.Provider>
    </div>
  );
};

Voting.propTypes = {
  basename: PropTypes.string,
};

export default Voting;
