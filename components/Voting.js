import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import PollResult from './PollResult';
import PollVote from './PollVote';

import { mockPoll, mockPollsList } from '../mocking/mock-data';

const Voting = (props) => {
  return (
    <div className="voting grid-container grid-container-padded">
      <h1 className="text-center">
        Decisions, Decisions
      </h1>
      <Switch>
        <Route path="/frontend-projects/voting" exact render={() => {
          return <Dashboard
            polls={mockPollsList.slice(0, 3)}
          />;
         }} />
        <Route path="/frontend-projects/voting/poll/:id/vote" render={() => {
          return <PollVote
            poll={mockPoll['325bcb5a-daa8-479f-8f4b-5109eff09c4f']}
          />
        }} />
        <Route path="/frontend-projects/voting/poll/:id/result" render={() => {
          return <PollResult
            poll={mockPoll['325bcb5a-daa8-479f-8f4b-5109eff09c4f']}
          />
        }} />
      </Switch>
    </div>
  );
}

export default Voting;
