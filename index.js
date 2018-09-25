import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '../../styles/global-styles.scss';
import '../../config/font-awesome';

import ApiRootContext from '../../config/api-root-context';
import AuthenticationContainer from './components/AuthenticationContainer';
import Voting from './components/Voting';

render(
  <BrowserRouter>
    <AuthenticationContainer>
      <ApiRootContext.Provider value="http://localhost:3000/api/">
        <Voting
          basename="/"
        />
      </ApiRootContext.Provider>
    </AuthenticationContainer>
  </BrowserRouter>,
  document.getElementById('root')
);
