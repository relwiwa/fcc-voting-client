import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { AuthenticationContext } from '../../../services/authentication';
import BasenameContext from '../config/BasenameContext';
import IconButton from '../../../reusable-components/icon-button';
import ModalDialogue from '../../../reusable-components/modal-dialogue';
import Poll from './Poll';
import PollDelete from './PollDelete';

import './PollResult.scss';

class PollResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.setupTwitterLink = this.setupTwitterLink.bind(this);
  }

  setupTwitterLink(basename) {
    const { poll } = this.props;
    const appRoot = `${window.location.protocol}//${window.location.host}`;
    const twitterUrl = 'https://twitter.com/intent/tweet?text=';
    const text = `Help me decide on Decisions, Decisions on the following question: "${poll.question}" `;
    const link = `${appRoot}${basename}poll/${poll._id}/vote`;
    return twitterUrl + text + link;
  }

  render() {
    const { showModal } = this.state;
    const { onDeletePoll, poll } = this.props;
    const numberOfVotes = poll.voters.length;
    const pollDuration = Math.floor((Date.now() - new Date(poll.creationDate)) / 1000 / 60 / 60 / 24 + 1);

    return <AuthenticationContext.Consumer>
      {({ authenticatedUserId }) => <BasenameContext.Consumer>
        {basename => <div className="poll-result">
          {showModal && <ModalDialogue
            closeModal={() => this.setState({ showModal: false })}
          >
            <PollDelete
              onCancelDeletePoll={() => this.setState({ showModal: false })}
              onDeletePoll={onDeletePoll}
            />
          </ModalDialogue>}
          <Poll
            displayChart={true}
            displayResults={true}
            numberOfVotes={numberOfVotes}
            poll={poll}
            statusMessage={`${numberOfVotes} ${numberOfVotes === 1 ? 'vote was' : 'votes were'} submitted within ${pollDuration} day${pollDuration !== 1 ? 's' : ''}`}
          />
          <div className="grid-x grid-margin-y">
            <div className="cell text-center medium-text-left small-order-2 medium-order-1 medium-3">
              <IconButton
                faIcon="home"
                foundationClass="primary"
                link={`${basename}`}
                text="Dashboard"
              />
            </div>
            {authenticatedUserId === poll.creator && <div className="cell text-center medium-text-right small-order-1 medium-order-2 medium-9">
              <IconButton
                faIcon={['fab', 'twitter']}
                foundationClass="primary"
                link={this.setupTwitterLink(basename)}
                target="new"
                text="Tweet Poll"
                />
              <IconButton
                faIcon="trash"
                foundationClass="alert"
                onClick={() => this.setState({ showModal: true })}
                text="Delete Poll"
                />
              <IconButton
                faIcon="edit"
                foundationClass="secondary"
                link={`${basename}poll/${poll._id}/edit`}
                text="Edit Poll"
                />
            </div>}
          </div>
        </div>}
      </BasenameContext.Consumer>}
    </AuthenticationContext.Consumer>;
  }
}

PollResult.propTypes = {
  onDeletePoll: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
};

export default PollResult;
