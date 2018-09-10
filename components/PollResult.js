import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { AuthenticationContext } from '../../../services/authentication';
import BasenameContext from '../config/BasenameContext';
import IconButton from '../../../reusable-components/icon-button';
import Poll from './Poll';

const PollResult = ({ poll }) => {
  const numberOfVotes = poll.voters.length;
  const pollDuration = Math.floor((Date.now() - new Date(poll.creationDate)) / 1000 / 60 / 60 / 24 + 1);

  return <AuthenticationContext.Consumer>
    {({ authenticatedUserId }) => <BasenameContext.Consumer>
      {basename => <Fragment>
        <Poll
          displayChart={true}
          displayResults={true}
          numberOfVotes={numberOfVotes}
          poll={poll}
          statusMessage={`${numberOfVotes} ${numberOfVotes === 1 ? 'vote was' : 'votes were'} submitted within ${pollDuration} day${pollDuration !== 1 ? 's' : ''}`}
        />
        <div className="grid-x grid-margin-y">
          <div className="cell text-center medium-text-left small-order-2 medium-order-1 medium-6">
            <IconButton
              faIcon="home"
              foundationClass="primary"
              link={`${basename}`}
              text="Dashboard"
            />
          </div>
          {authenticatedUserId === poll.creator && <div className="cell text-center medium-text-right small-order-1 medium-order-2 medium-6">
            <IconButton
              faIcon="edit"
              foundationClass="secondary"
              link={`${basename}poll/${poll._id}/edit`}
              text="Edit Poll"
              />
          </div>}
        </div>
      </Fragment>}
    </BasenameContext.Consumer>}
  </AuthenticationContext.Consumer>;
}

PollResult.propTypes = {
  poll: PropTypes.object.isRequired,
};

export default PollResult;
