module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 8,  
      branches: 0,     
      functions: 0,    
      lines: 8       
    }
  },
  testMatch: [
    '**/tests/**/*.test.js',
    '**/*.test.js'
  ]
};