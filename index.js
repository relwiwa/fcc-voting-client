import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '../../styles/global-styles.scss';
import '../../config/font-awesome';

import Voting from './components/Voting';

render(
  <BrowserRouter>
    <Voting />
  </BrowserRouter>,
  document.getElementById('root')
);
