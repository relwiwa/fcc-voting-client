import PropTypes from 'prop-types';
import React from 'react';

import PollForm from './PollForm';

const PollEdit = ({ poll }) => <PollForm
  headline="Edit Your Poll"
  poll={poll}
/>;

PollEdit.propTypes = {
  poll: PropTypes.object.isRequired,
};

export default PollEdit;
