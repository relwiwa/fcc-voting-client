import PropTypes from 'prop-types';
import React from 'react';

import PollForm from './PollForm';

import Poll from '../models/Poll';

const PollAdd = ({ onNewPollTransmitted }) => {

  return <PollForm
    apiMethod="post"
    apiUrl="http://localhost:3000/poll"
    cancelUrlFragment=""
    headline="Create New Poll"
    onPollTransmitted={onNewPollTransmitted}
    poll={new Poll()}
  />
};

PollAdd.propTypes = {
  onNewPollTransmitted: PropTypes.func.isRequired,
};

export default PollAdd;
