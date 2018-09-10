import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { AuthenticationContext, getAuthenticationData } from '../../../services/authentication';

class AuthenticationContainer extends Component {
  constructor(props) {
    super(props);
    /*  values of isAuthenticated:
        - null: not yet determined (or SSR)
        - true
        - false */
    this.state = {
      authenticationData: getAuthenticationData(),
    };
  }

  render() {
    return <AuthenticationContext.Provider value={this.state.authenticationData}>
      {this.props.children}
    </AuthenticationContext.Provider>;
  }
}

AuthenticationContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AuthenticationContainer;
