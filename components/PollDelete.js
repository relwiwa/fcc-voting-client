import PropTypes from 'prop-types';
import React from 'react';

import IconButton from '../../../reusable-components/icon-button';

const PollDelete = ({ onCancelDeletePoll, onDeletePoll }) => <div className="text-center">
  <p>Are you sure you want to delete this poll?</p>
  <div className="button-group expanded">
    <IconButton
      faIcon="check"
      foundationClass="alert"
      onClick={onDeletePoll}
      text="Yes, Delete Poll"
    />
    <IconButton
      faIcon="times"
      foundationClass="primary"
      onClick={onCancelDeletePoll}
      text="No, Cancel"
    />
  </div>
</div>;

PollDelete.propTypes = {
  onCancelDeletePoll: PropTypes.func.isRequired,
  onDeletePoll: PropTypes.func.isRequired,
};

export default PollDelete;

