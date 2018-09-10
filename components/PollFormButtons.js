import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import BasenameContext from '../config/BasenameContext';
import IconButton from '../../../reusable-components/icon-button';

const PollFormButtons = ({ cancelUrlFragment, formValid, history, onAddOption, onSubmitPoll, submissionPhase }) => <div className="poll-form-buttons button-group align-right">
  <BasenameContext.Consumer>
    {basename => <IconButton
      faIcon="times"
      foundationClass={(submissionPhase ? 'disabled ' : '') + 'warning'}
      onClick={!submissionPhase ? () => history.push(`${basename}${cancelUrlFragment}`) : null}
      text="Cancel"
    />}
  </BasenameContext.Consumer>
  <IconButton
    faIcon="plus"
    foundationClass={(submissionPhase ? 'disabled ' : '') + 'secondary'}
    onClick={!submissionPhase ? onAddOption : null}
    text="Add Option"
  />
  <IconButton
    faIcon="save"
    foundationClass={(!submissionPhase && formValid ? '' : 'disabled ') + 'primary'}
    onClick={(!submissionPhase && formValid) ? onSubmitPoll : null}
    text="Submit Poll"
  />
</div>;

PollFormButtons.propTypes = {
  cancelUrlFragment: PropTypes.string.isRequired,
  formValid: PropTypes.bool.isRequired,
  onAddOption: PropTypes.func.isRequired,
  onSubmitPoll: PropTypes.func.isRequired,
  submissionPhase: PropTypes.bool.isRequired,
};

export default withRouter(PollFormButtons);
