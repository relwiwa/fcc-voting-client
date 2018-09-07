import PropTypes from 'prop-types';
import React from 'react';

import PollsListItem from './PollsListItem';

const PollsList = ({ polls }) => <div className="grid-x grid-margin-x">
  {polls.map(poll => <PollsListItem
    key={poll._id}
    numberOfVotes={poll.voters.length}
    pollDuration={Math.floor((Date.now() - new Date(poll.creationDate)) / 1000 / 60 / 60 / 24 + 1)}
    pollId={poll._id}
    question={poll.question}
  />)}
</div>;

PollsList.propTypes = {
  polls: PropTypes.array.isRequired,
};

export default PollsList;
