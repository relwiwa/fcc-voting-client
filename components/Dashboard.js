import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import IconLink from '../../../reusable-components/icon-link';
import PollsList from './PollsList';
import BasenameContext from '../config/BasenameContext';

import './Dashboard.scss';

const Dashboard = ({ error, latestPolls, popularPolls }) => {
  return <div className="dashboard">
    <BasenameContext.Consumer>
      {basename => <div className="grid-x grid-padding-x grid-padding-y grid-margin-x text-center">
        <h3 className="cell subheader">Collaborative decision making has finally arrived with Decisions, Decisions</h3>
        <div className="cell medium-4 callout primary">
          <p><FontAwesomeIcon icon="sign-in-alt" size="2x" /></p>
          <p><IconLink link="/sign-in" icon="sign-in-alt" text="Sign in" /> now and let people around the globe help you in making decisions by creating your own polls.</p>
        </div>
        <div className="cell medium-4 callout primary">
          <p><FontAwesomeIcon icon="user-plus" size="2x" /></p>
          <p>If you do not have an account yet, now is the time to <IconLink link="/sign-up" icon="user-plus" text="sign up" />.</p>
        </div>
        <div className="cell medium-4 callout primary">
          <p><FontAwesomeIcon icon="times-circle" size="2x" /></p>
          <p>Or, check out other people's polls and <IconLink link={`${basename}polls`} icon="times-circle" text="cast your vote" /></p>
        </div>
      </div>}
    </BasenameContext.Consumer>
    <hr />
    {error && <div className="grid-x">
      <div className="cell callout alert">{error}</div>
    </div>}
    {!error && <div className="grid-x grid-margin-x">
      <div className="cell medium-6">
        <h3>Latest Polls</h3>
        {latestPolls.length
          ? <PollsList polls={latestPolls.slice(0, 3)} />
          : <span><FontAwesomeIcon icon="spinner" spin /> Loading latest polls</span>}
      </div>
      <div className="cell medium-6">
        <h3>Most Popular Polls</h3>
        {popularPolls.length
          ? <PollsList polls={popularPolls.slice(0, 3)} />
          : <span><FontAwesomeIcon icon="spinner" spin /> Loading most popular polls</span>}
      </div>
    </div>}
  </div>;
};

Dashboard.propTypes = {
  error: PropTypes.string,
  latestPolls: PropTypes.array.isRequired,
  popularPolls: PropTypes.array.isRequired,
};

export default Dashboard;
