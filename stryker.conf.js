/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  thresholds: { high: 90, low: 88, break: 85 },
  mutate: [
    'src/**/*.ts?(x)',
    '!src/**/*@(.test|.spec|Spec|stories|styled).ts?(x)',
    '!src/**/__mocks__/**/*',
  ],
  // Unknown memory leak 🤷‍♀️
  maxTestRunnerReuse: 20,
};
