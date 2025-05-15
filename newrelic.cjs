// newrelic.cjs
'use strict';

/**
 * New Relic agent configuration.
 */
exports.config = {
  app_name: ['TnnEducationFrontend:PROD'],
  license_key: 'd10e3a5dbcaf2bd2570558451a192c5dFFFFNRAL',
  distributed_tracing: {
    enabled: true
  },
  logging: {
    level: 'info'
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*'
    ]
  },
  utilization: {
    detect_aws: true,
    detect_docker: true,
    detect_azure: true,
    detect_gcp: true,
    detect_pcf: true,
    detect_kubernetes: true
  },
  event_loop_metrics: true
};
