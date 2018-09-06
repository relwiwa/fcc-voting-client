import PropTypes from 'prop-types';
import React from 'react';

import Poll from './Poll';

const PollResult = ({ poll }) => {
  const numberOfVotes = poll.options.reduce((acc, curr) => acc + curr.votes, 0);
  const pollDuration = Math.floor((Date.now() - poll.creationDate) / 1000 / 60 / 60 / 24);
  return <Poll
    displayResults={true}
    statusMessage={`${numberOfVotes} ${numberOfVotes === 1 ? 'vote was' : 'votes were'} submitted within ${pollDuration} day${pollDuration !== 1 ? 's' : ''}`}
    poll={poll}
  />;
}

PollResult.propTypes = {
  poll: PropTypes.object.isRequired,
};

export default PollResult;
