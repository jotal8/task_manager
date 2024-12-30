'use client';

// Import Modules
import PropTypes from 'prop-types';

// Import Components
import SwaggerUI from 'swagger-ui-react';

// Import Miscs
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDoc = ({ spec }) => (
  <SwaggerUI spec={spec} />
);

SwaggerDoc.propTypes = {
  /**
   * OpenApi specifications
   */
  spec: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default SwaggerDoc;