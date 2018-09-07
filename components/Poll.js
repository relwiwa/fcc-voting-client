import PropTypes from 'prop-types';
import React from 'react';
import { Pie } from 'react-chartjs-2';

import './Poll.scss';

const Poll = ({ displayResults, poll: { question, options }, numberOfVotes, onSelectOption, optionSelected, optionsSelectable, statusMessage }) => <div className="poll grid-x grid-margin-y">
  <div className="cell">
    <div className="callout">
      <h4>{question}</h4>
    </div>
    {(displayResults && numberOfVotes > 0) && <div className="callout">
      <div className="grid-x">
        <div className="cell medium-8 medium-offset-2">
          <Pie
            data={{
              datasets: [{ data: options.map(option => option.votes) }],
              labels: options.map(option => option.value),
            }}
          />
        </div>
      </div>
    </div>}
    <div className="callout text-center"><p>{statusMessage}</p></div>
    {options.map(option => <div
      className={(optionSelected === option.value ? 'option-selected ' : '') + 'callout' + (onSelectOption ? ' option-selectable' : '')}
      key={option.value}
      onClick={onSelectOption ? () => onSelectOption(option.value) : null}
    >
      <div className="grid-x">
        <div className={displayResults ? 'small-10 ' : '' + 'cell'}>
          {option.value}
        </div>
        {displayResults  && <div className="cell small-2 text-right">
          <span className="badge">{option.votes}</span>
        </div>}
      </div>
    </div>)}
  </div>
</div>;

Poll.propTypes = {
  displayResults: PropTypes.bool.isRequired,
  numberOfVotes: PropTypes.number,
  poll: PropTypes.object.isRequired,
  onSelectOption: PropTypes.func,
  optionSelected: PropTypes.string,
  optionsSelectable: PropTypes.bool.isRequired,
  statusMessage: PropTypes.string,
}

export default Poll;
