import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import IconLink from '../../../reusable-components/icon-link';
import BasenameContext from '../config/BasenameContext';

const WithLoadingAndErrorHandling = (WrappedComponent)  => {
  return ({ error, loading, ...props }) => {
    if (loading) {
      return <div className="text-center"><FontAwesomeIcon icon="spinner" spin /> {loading}</div>;
    }
    else if (error) {
      return <div className="text-center">
        <div><FontAwesomeIcon icon="exclamation-circle" /> {error}</div>
        <BasenameContext.Consumer>
          {basename => <div><br />Return to <IconLink link={basename} text="Dashboard" icon="home" /></div>}
        </BasenameContext.Consumer>
      </div>;
    }
    else {
      return <WrappedComponent {...props} />;
    }
  }
};

WithLoadingAndErrorHandling.propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
};

export default WithLoadingAndErrorHandling;
