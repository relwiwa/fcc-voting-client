import PropTypes from 'prop-types';
import React from 'react';

import Poll from './Poll';

const PollResult = ({ poll }) => {
  const numberOfVotes = poll.voters.length;
  const pollDuration = Math.floor((Date.now() - new Date(poll.creationDate)) / 1000 / 60 / 60 / 24 + 1);
  return <Poll
    displayResults={true}
    numberOfVotes={numberOfVotes}
    poll={poll}
    statusMessage={`${numberOfVotes} ${numberOfVotes === 1 ? 'vote was' : 'votes were'} submitted within ${pollDuration} day${pollDuration !== 1 ? 's' : ''}`}
  />;
}

PollResult.propTypes = {
  poll: PropTypes.object.isRequired,
};

export default PollResult;
