import PropTypes from 'prop-types';
import React from 'react';

import BasenameContext from '../config/BasenameContext';
import IconButton from '../../../reusable-components/icon-button';
import PollsListItem from './PollsListItem';

const PollsList = ({ polls }) => <div className="grid-x grid-margin-x">
  {polls.map(poll => {
  return <PollsListItem
    creatorId={poll.creator}
    key={poll._id}
    numberOfVotes={poll.voters.length}
    pollDuration={Math.floor((Date.now() - new Date(poll.creationDate)) / 1000 / 60 / 60 / 24 + 1)}
    pollId={poll._id}
    question={poll.question}
  />})}
  {polls.length === 0 && <div className="cell text-center">There are no polls at this time</div>}
</div>;

PollsList.propTypes = {
  polls: PropTypes.array.isRequired,
};

export default PollsList;
