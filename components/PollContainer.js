import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import IconLink from '../../../reusable-components/icon-link';
import PollAdd from './PollAdd';
import PollEdit from './PollEdit';
import PollResult from './PollResult';
import PollVote from './PollVote';
import ProtectedRoute from '../../../reusable-components/protected-route';

import { getJwtToken } from '../../../services/authentication';
import BasenameContext from '../config/BasenameContext';

import WithLoadingAndErrorHandling from '../hoc/WithLoadingAndErrorHandling';

const PollEditWithLoadingAndErrorHandling = WithLoadingAndErrorHandling(PollEdit);
const PollResultWithLoadingAndErrorHandling = WithLoadingAndErrorHandling(PollResult);
const PollVoteWithLoadingAndErrorHandling = WithLoadingAndErrorHandling(PollVote);

class PollContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPoll: null,
      error: false,
      loading: 'Loading poll',
    };
    this.handleDeletePoll = this.handleDeletePoll.bind(this);
    this.handleNewOptionsTransmitted = this.handleNewOptionsTransmitted.bind(this);
    this.handleNewPollTransmitted = this.handleNewPollTransmitted.bind(this);
    this.handleVoteTransmitted = this.handleVoteTransmitted.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;

    this.getPoll(match.params.pollId);
  }

  getPoll(pollId) {
    const { apiRoot } = this.props;

    this.setState({
      currentPoll: null,
      loading: 'Loading poll',
    });
    axios.get(`${apiRoot}poll/${pollId}`)
    .then(
      response => this.setState({
        currentPoll: response.data.poll,
        loading: false,
      }),
      error => this.setState({
        currentPoll: null,
        error: 'An error happened while loading this poll',
        loading: false,
      })
    );
  }

  handleDeletePoll(basename) {
    const { currentPoll } = this.state;
    const { apiRoot, history } = this.props;
    const jwtToken = getJwtToken();

    axios.delete(`${apiRoot}poll/${currentPoll._id}`, {
      // delete requests send data via data property
      data: { jwtToken },
    })
    .then(
      response => {
        history.push(`${basename}`);
      },
      error => {
        this.setState({
          error: 'An error happened while deleting your poll',
        });
      }
    );
  }

  handleNewOptionsTransmitted(updatedPoll, basename) {
    const { history } = this.props;
    this.setState({
      currentPoll: updatedPoll,
    });
    history.push(`${basename}poll/${updatedPoll['_id']}/result`);
  }

  handleNewPollTransmitted(newPoll, basename) {
    const { history } = this.props;
    this.setState({
      currentPoll: newPoll,
    });
    history.push(`${basename}poll/${newPoll['_id']}/result`);
  }

  handleVoteTransmitted(updatedPoll) {
    this.setState({
      currentPoll: updatedPoll,
    });
  }

  renderErrorReset(basename) {
    const { history } = this.props;

    return <Fragment>
      <IconLink
        icon="redo"
        onClick={() => {
          this.setState({
            error: false,
            loading: 'Loading poll',
          });
          this.getPoll();
        }}
        text="Try again"
      /> or go back to <IconLink
        icon="home"
        onClick={() => {
          history.push(basename)
        }}
        text="Dashboard"
      />
    </Fragment>;
  }

  render() {
    const { apiRoot, isAuthenticated } = this.props;
    const { currentPoll, error, loading } = this.state;

    return <BasenameContext.Consumer>
      {basename => <Switch>
        <Route
          path={`${basename}poll/:id/vote`}
          render={() => <PollVoteWithLoadingAndErrorHandling
            apiRoot={apiRoot}
            error={error}
            errorReset={this.renderErrorReset(basename)}
            loading={loading}
            onVoteTransmitted={this.handleVoteTransmitted}
            poll={currentPoll}
          />}
        />
        <Route
          path={`${basename}poll/:id/result`}
          render={() => <PollResultWithLoadingAndErrorHandling
            error={error}
            errorReset={this.renderErrorReset(basename)}
            loading={loading}
            onDeletePoll={() => this.handleDeletePoll(basename)}
            poll={currentPoll}
          />}
        />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={`${basename}poll/:id/edit`}
          render={() => <PollEditWithLoadingAndErrorHandling
            apiRoot={apiRoot}
            error={error}
            errorReset={this.renderErrorReset(basename)}
            loading={loading}
            onNewOptionsTransmitted={(updatedPoll) => this.handleNewOptionsTransmitted(updatedPoll, basename)}
            poll={currentPoll}
          />}
          project="Decisions, Decisions"
        />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={`${basename}poll-add`}
          render={() => <PollAdd
            apiRoot={apiRoot}
            onNewPollTransmitted={(newPoll) => this.handleNewPollTransmitted(newPoll, basename)}
          />}
          project="Decisions, Decisions"
        />
      </Switch>}
    </BasenameContext.Consumer>;
  }
}

PollContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withRouter(PollContainer);
