import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './',
  modulePaths: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/setup.jest.ts'],
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __EXTERNAL_SERVER_URL__: process.env.EXTERNAL_SERVER_URL || 'http://localhost:3000',
    __INTERNAL_SERVER_URL__: process.env.INTERNAL_SERVER_URL || 'http://server:3001'
  },
}
