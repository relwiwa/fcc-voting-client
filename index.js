import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '../../styles/global-styles.scss';
import '../../config/font-awesome';

import AuthenticationContainer from './components/AuthenticationContainer';
import Voting from './components/Voting';

render(
  <BrowserRouter>
    <AuthenticationContainer>
      <Voting
        basename="/"
      />
    </AuthenticationContainer>
  </BrowserRouter>,
  document.getElementById('root')
);
