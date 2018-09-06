import PropTypes from 'prop-types';
import React from 'react';

import PollsListItem from './PollsListItem';

const PollsList = ({ polls }) => <div className="grid-x grid-margin-x">
  {polls.map(poll => <PollsListItem
    key={poll.pollId}
    numberOfVotes={poll.numberOfVotes}
    pollDuration={Math.floor((Date.now() - poll.creationDate) / 1000 / 60 / 60 / 24)}
    pollId={poll.pollId}
    question={poll.question}
  />)}
</div>;

PollsList.propTypes = {
  polls: PropTypes.array.isRequired,
};

export default PollsList;
