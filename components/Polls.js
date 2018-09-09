import PropTypes from 'prop-types';
import React from 'react';

import PollsList from './PollsList';

const Polls = ({ polls }) => <div className="polls">
  <h3>All Polls</h3>
  <PollsList polls={polls} />
</div>;

Polls.propTypes = {
  polls: PropTypes.array.isRequired,
};

export default Polls;
