import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import PollFormInput from './PollFormInput';
import FormHelpText from '../../../reusable-components/form-help-text';

const PollOptionsForm = ({ headline, helptext, minOptionsAmount, onChangeOption, onDeleteOption, options, optionsValid }) => {
  return <Fragment>
    <h3 className="cell">{headline}</h3>
    {options.map((option, index) => <PollFormInput
      buttonDisabled={options.length <= minOptionsAmount}
      buttonDisplay={true}
      buttonIcon="trash"
      buttonOnClick={() => onDeleteOption(index)}
      key={index}
      label={`${index + 1}`}
      onChangeInput={(option) => onChangeOption(option, index)}
      placeholder={`Enter Option ${index + 1}`}
      value={option.value}
    />)}
    <FormHelpText
      text={helptext}
      valid={optionsValid}
    />
  </Fragment>;
};

PollOptionsForm.propTypes = {
  headline: PropTypes.string.isRequired,
  helptext: PropTypes.string.isRequired,
  minOptionsAmount: PropTypes.number.isRequired,
  onChangeOption: PropTypes.func.isRequired,
  onDeleteOption: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  optionsValid: PropTypes.bool.isRequired,
};

export default PollOptionsForm;

