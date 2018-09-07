import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import IconButton from '../../../reusable-components/icon-button';

import BasenameContext from '../config/BasenameContext';

import './PollsListItem.scss';

const PollsListItem = ({ numberOfVotes, question, pollDuration, pollId }) => <div className="polls-list-item cell">
  <div className="card">
    <div className="card-divider">
      <h4>{question}</h4>
    </div>
    <div className="card-section">
      <div className="grid-x align-middle">
        <div className="cell small-9 text-left"><small>{numberOfVotes} vote{numberOfVotes === 1 ? '' : 's'} within {pollDuration} day{pollDuration === 1 ? '' : 's'}</small></div>
        <div className="cell small-3 align-self-middle text-right">
          <BasenameContext.Consumer>
            {basename => <IconButton
              faIcon="times-circle"
              foundationClass="primary"
              link={`${basename}poll/${pollId}/vote`}
              style={{margin: 0}}
              text="Vote now"
            />}          
          </BasenameContext.Consumer>
        </div>
      </div>
    </div>
  </div>
</div>;

PollsListItem.propTypes = {
  numberOfVotes: PropTypes.number.isRequired,
  pollDuration: PropTypes.number.isRequired,
  pollId: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default PollsListItem;
