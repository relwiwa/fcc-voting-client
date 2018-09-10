import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import IconButton from '../../../reusable-components/icon-button';

import { AuthenticationContext } from '../../../services/authentication';
import BasenameContext from '../config/BasenameContext';

import './PollsListItem.scss';

const PollsListItem = ({ creatorId, numberOfVotes, question, pollDuration, pollId }) => <div className="polls-list-item cell">
  <div className="card">
    <div className="card-divider">
      <h4>{question}</h4>
    </div>
    <div className="card-section">
      <div className="grid-x align-middle">
        <div className="cell small-6 text-left">
          <small>{numberOfVotes} vote{numberOfVotes === 1 ? '' : 's'} within {pollDuration} day{pollDuration === 1 ? '' : 's'}</small>
        </div>
        <AuthenticationContext.Consumer>
          {({ authenticatedUserId }) => {
            const authenticatedUserOwnsPoll = authenticatedUserId === creatorId; 
            return <BasenameContext.Consumer>
              {basename => <div className="cell small-6 align-self-middle text-right">
                {authenticatedUserOwnsPoll && <IconButton
                  faIcon="chart-pie"
                  foundationClass="success"
                  link={`${basename}poll/${pollId}/result`}
                  style={{margin: 0}}
                  text="Manage Poll"
                />}
                {!authenticatedUserOwnsPoll && <IconButton
                  faIcon="times-circle"
                  foundationClass="primary"
                  link={`${basename}poll/${pollId}/vote`}
                  style={{margin: 0}}
                  text="Vote Now"
                />}
              </div>}
            </BasenameContext.Consumer>}
          }
        </AuthenticationContext.Consumer>
      </div>
    </div>
  </div>
</div>;

PollsListItem.propTypes = {
  creatorId: PropTypes.string.isRequired,
  numberOfVotes: PropTypes.number.isRequired,
  pollDuration: PropTypes.number.isRequired,
  pollId: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default PollsListItem;
