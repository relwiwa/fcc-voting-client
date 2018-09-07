import PropTypes from 'prop-types';
import React from 'react';

import PollForm from './PollForm';

import Poll from '../models/Poll';

const PollAdd = ({ }) => <PollForm
  headline="Create New Poll"
  poll={new Poll()}
/>;

PollAdd.propTypes = {

};

export default PollAdd;
