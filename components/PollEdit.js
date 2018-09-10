import PropTypes from 'prop-types';
import React from 'react';

import PollForm from './PollForm';

const PollEdit = ({ onUpdatedPollTransmitted, poll }) => <PollForm
  apiMethod="patch"
  apiUrl={`http://localhost:3000/poll/${poll._id}`}
  cancelUrlFragment={`poll/${poll._id}/result`}
  headline="Edit Your Poll"
  onPollTransmitted={onUpdatedPollTransmitted}
  poll={poll}
/>;

PollEdit.propTypes = {
  onUpdatedPollTransmitted: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
};

export default PollEdit;
