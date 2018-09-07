import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const PollFormInput = ({ buttonDisabled, buttonDisplay, buttonIcon, buttonOnClick, label, onChangeInput, placeholder, value }) => <div className="cell">
  <div className="input-group">
    <span className="input-group-label"><strong>{label}</strong></span>
    <input
      className="input-group-field"
      type="text"
      onChange={(event) => onChangeInput(event.target.value)}
      placeholder={placeholder}
      value={value}
    />
    {buttonDisplay && <div className="input-group-button">
      <button
        className={(buttonDisabled ? 'disabled ' : '') + 'button secondary'}
        onClick={!buttonDisabled ? buttonOnClick : null}
      >
        <FontAwesomeIcon icon={buttonIcon} />
      </button>
    </div>}
  </div>
</div>;

PollFormInput.propTypes = {
  buttonDisabled: PropTypes.bool,
  buttonDisplay: PropTypes.bool.isRequired,
  buttonIcon: PropTypes.string,
  buttonOnClick: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onChangeInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default PollFormInput;
