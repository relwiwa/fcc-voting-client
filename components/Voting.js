import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import PollAdd from './PollAdd';
import PollEdit from './PollEdit';
import PollResult from './PollResult';
import PollVote from './PollVote';

import BasenameContext from '../config/BasenameContext';
import { mockPoll, mockPollsList } from '../mocking/mock-data';

const Voting = ({ basename = '/backend-projects/voting/'}) => {
  return (
    <div className="voting grid-container grid-container-padded">
      <h1 className="text-center">
        Decisions, Decisions
      </h1>
      <BasenameContext.Provider value={basename}>
        <Switch>
          <Route path={`${basename}`} exact render={() => {
            return <Dashboard
              polls={mockPollsList.slice(0, 3)}
            />;
          }} />
          <Route path={`${basename}poll/:id/vote`} render={() => {
            return <PollVote
              poll={mockPoll['325bcb5a-daa8-479f-8f4b-5109eff09c4f']}
            />
          }} />
          <Route path={`${basename}poll/:id/result`} render={() => {
            return <PollResult
              poll={mockPoll['325bcb5a-daa8-479f-8f4b-5109eff09c4f']}
            />
          }} />
          <Route path={`${basename}poll-add`} render={() => {
            return <PollAdd />
          }} />
          <Route path={`${basename}poll-edit`} render={() => {
            return <PollEdit
              poll={mockPoll['325bcb5a-daa8-479f-8f4b-5109eff09c4f']}              
            />
          }} />
        </Switch>
      </BasenameContext.Provider>
    </div>
  );
}

Voting.propTypes = {
  basename: PropTypes.string,
};

export default Voting;
