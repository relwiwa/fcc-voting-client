import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import IconLink from '../../../reusable-components/icon-link';
import BasenameContext from '../config/BasenameContext';

const WithLoadingAndErrorHandling = (WrappedComponent)  => {
  return ({ error, errorReset, loading, ...props }) => {
    if (loading) {
      return <div className="text-center"><FontAwesomeIcon icon="spinner" spin /> {loading}</div>;
    }
    else if (error) {
      return <div className="text-center">
        <div><FontAwesomeIcon icon="exclamation-circle" /> {error}</div>
        <div><br />{errorReset}</div>
      </div>;
    }
    else {
      return <WrappedComponent {...props} />;
    }
  }
};

WithLoadingAndErrorHandling.propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  errorReset: PropTypes.object,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
};

export default WithLoadingAndErrorHandling;
