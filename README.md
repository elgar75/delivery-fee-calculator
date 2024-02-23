# Delivery Fee Calcultor

You need [Yarn](https://classic.yarnpkg.com/lang/en/docs/install) and node.js version 20.11 to be able to run this project.

### Setup

```
yarn install
```

### Runing test

```
yarn run test
```

### Running dev

```
yarn run dev
```

### Building prod deployment

```
yarn run build
```

### Overview

- main function for calculating delivery fee is `deliveryFeeCalculator` in `src\functions\delivery_fee_calculation.ts` file.
- tests are in `src\functions\__tests__\delivery_fee_calculation.test.ts`.
- you can change fee calculation configs here `src\config.ts`.
