import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import BasenameContext from '../config/BasenameContext';
import Dashboard from './Dashboard';
import IconButton from '../../../reusable-components/icon-button';
import IconLink from '../../../reusable-components/icon-link';
import PollsList from './PollsList';
import ProtectedRoute from '../../../reusable-components/protected-route';
import WithLoadingAndErrorHandling from '../hoc/WithLoadingAndErrorHandling';

const PollsListWithLoadingAndErrorHandling = WithLoadingAndErrorHandling(PollsList);

class PollsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPolls: null,
      errorAllPolls: false,
      loadingAllPolls: 'Loading polls',
      userPolls: null,
      errorUserPolls: false,
      loadingUserPolls: this.props.isAuthenticated ? 'Loading your polls' : false,
    };
  }

  componentDidMount() {
    this.getAllPolls();
    if (this.props.isAuthenticated) {
      this.getUsersPolls(this.props.authenticatedUserId);
    }
  }

  getUsersPolls(userId) {
    const { apiRoot } = this.props;

    axios.get(`${apiRoot}polls/${userId}`)
    .then(
      response => {
        this.setState({
          userPolls: response.data.polls,
          loadingUserPolls: false,
          errorUserPolls: false,
        });
      },
      error => {
        this.setState({
          userPolls: null,
          loadingUserPolls: false,
          errorUserPolls: 'An error happened while loading your polls',
        });
      }
    );
  }

  getAllPolls() {
    const { apiRoot } = this.props;

    axios.get(`${apiRoot}polls`)
    .then(
      response => {
        this.setState({
          allPolls: response.data.polls,
          loadingAllPolls: false,
          errorAllPolls: false,
        });
      },
      error => {
        this.setState({
          allPolls: null,
          loadingAllPolls: false,
          errorAllPolls: 'An error happened while loading polls',
        });
      }
    );
  }

  render() {
    const { allPolls, errorAllPolls, errorUserPolls, loadingAllPolls, loadingUserPolls, userPolls, } = this.state;
    const { authenticatedUserId, history, isAuthenticated } = this.props;

    return <BasenameContext.Consumer>
      {basename => <Switch>
        <Route
          path={`${basename}`}
          exact
          render={() => <Dashboard>
            <div className="grid-x grid-margin-x">
              <div className="cell medium-6">
                <h3>Latest Polls</h3>
                <PollsListWithLoadingAndErrorHandling
                  error={errorAllPolls}
                  errorReset={<Fragment>
                    <IconLink
                      icon="redo"
                      onClick={() => {
                        this.setState({
                          loadingAllPolls: 'Loading polls',
                        });
                        this.getAllPolls();
                      }}
                      text="Try again"
                    />
                  </Fragment>}
                  loading={loadingAllPolls}
                  polls={allPolls && allPolls.length > 3 ? allPolls.slice(0, 3) : allPolls}
                />
                {(allPolls && allPolls.length > 3) && <div className="text-center">
                  <IconButton text="View all" link={`${basename}polls`} faIcon="list" foundationClass="primary" />
                </div>}
              </div>
              <div className="cell show-for-small-only">
                <hr />
              </div>
              <div className="cell medium-6">
                <h3>My Polls</h3>
                {isAuthenticated && <div>
                  <PollsListWithLoadingAndErrorHandling
                    error={errorUserPolls}
                    errorReset={<Fragment>
                      <IconLink
                        icon="redo"
                        onClick={() => {
                          this.setState({
                            loadingUserPolls: 'Loading your polls',
                          });
                          this.getUsersPolls(authenticatedUserId);
                        }}
                        text="Try again"
                      />
                    </Fragment>}
                      loading={loadingUserPolls}
                    polls={userPolls && userPolls.length > 3 ? userPolls.slice(0, 3) : userPolls}
                  />
                  {(userPolls && userPolls.length > 3) && <div className="text-center">
                    <IconButton text="View all" link={`${basename}polls-user`} faIcon="list" foundationClass="primary" />
                  </div>}
                </div>}
                {!isAuthenticated && <div className="cell">
                  <IconLink link="/interaction/sign-in" icon="sign-in-alt" text="Sign in" /> or <IconLink link="/interaction/sign-up" icon="user-plus" text="sign up" /> to add and manage your own polls
                </div>}
              </div>
            </div>
          </Dashboard>}
        />
        <Route
          path={`${basename}polls`}
          render={() => <div>
            <h3>List Of All Polls</h3>
            <PollsListWithLoadingAndErrorHandling
              error={errorAllPolls}
              errorReset={<Fragment>
                <IconLink
                  icon="redo"
                  onClick={() => {
                    this.setState({
                      loadingAllPolls: 'Loading polls',
                    });
                    this.getAllPolls();
                  }}
                  text="Try again"
                /> or go back to <IconLink
                  icon="home"
                  onClick={() => {
                    history.push(basename)
                  }}
                  text="Dashboard"
                />
              </Fragment>}
              loading={loadingAllPolls}
              polls={allPolls}
            />
          </div>}
        />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={`${basename}polls-user`}
          render={() => <div>
            <h3>List Of My Polls</h3>
            <PollsListWithLoadingAndErrorHandling
              error={errorUserPolls}
              errorReset={<Fragment>
                <IconLink
                  icon="redo"
                  onClick={() => {
                    this.setState({
                      loadingUserPolls: 'Loading your polls',
                    });
                    this.getUsersPolls(authenticatedUserId);
                  }}
                  text="Try again"
                /> or go back to <IconLink
                  icon="home"
                  onClick={() => {
                    history.push(basename)
                  }}
                  text="Dashboard"
                />
              </Fragment>}
              loading={loadingUserPolls}
              polls={userPolls}
            />
          </div>}
          project="Decisions, Decisions"
        />
      </Switch>}
    </BasenameContext.Consumer>;
  }
}

PollsContainer.propTypes = {
  apiRoot: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withRouter(PollsContainer);
