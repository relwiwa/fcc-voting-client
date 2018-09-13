import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

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
    this.handleVoteTransmitted = this.handleVoteTransmitted.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;

    this.getPoll(match.params.pollId);
  }

  getPoll(pollId) {
    this.setState({
      currentPoll: null,
      loading: 'Loading poll',
    });
    axios.get(`http://localhost:3000/poll/${pollId}`)
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
    const { history } = this.props;
    const jwtToken = getJwtToken();

    axios.delete(`http://localhost:3000/poll/${currentPoll._id}`, {
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

  handleVoteTransmitted(updatedPoll) {
    this.setState({
      currentPoll: updatedPoll,
    });
  }
  
  render() {
    const { isAuthenticated } = this.props;
    const { currentPoll, error, loading } = this.state;

    return <BasenameContext.Consumer>
      {basename => <Switch>
        <Route
          path={`${basename}poll/:id/vote`}
          render={() => <PollVoteWithLoadingAndErrorHandling
            error={error}
            loading={loading}
            onVoteTransmitted={this.handleVoteTransmitted}
            poll={currentPoll}
          />}
        />
        <Route
          path={`${basename}poll/:id/result`}
          render={() => <PollResultWithLoadingAndErrorHandling
            error={error}
            loading={loading}
            onDeletePoll={() => this.handleDeletePoll(basename)}
            poll={currentPoll}
          />}
        />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={`${basename}poll/:id/edit`}
          render={() => <PollEditWithLoadingAndErrorHandling
            error={error}
            loading={loading}
            onNewOptionsTransmitted={(updatedPoll) => this.handleNewOptionsTransmitted(updatedPoll, basename)}
            poll={currentPoll}
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
