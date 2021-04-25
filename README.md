## Description

## Installation

```bash
$ npm install
```

## Environment variables

All secrets should be stored in `.env*.local` and these files are intended to be ignored.
There are 5 environments: `∅` (default), `production`, `development`, `staging` and `test`.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
