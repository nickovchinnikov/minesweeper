/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  thresholds: { high: 90, low: 85, break: 1 },
  mutate: [
    'src/**/*.ts?(x)',
    '!src/**/*@(.test|.spec|Spec|stories|styled).ts?(x)',
  ],
};
