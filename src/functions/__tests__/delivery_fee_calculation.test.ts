import { current_config } from '../../config.ts';
import { deliveryFeeCalculator } from '../delivery_fee_calculation.ts';

const normal_day = new Date('2024-01-01T01:01:01');
const rush_day = new Date('2024-01-05T16:01:01'); // Friday

test('test_free_delivery', () => {
  const fee = deliveryFeeCalculator({
    config: current_config,
    cartValue: 200,
    deliveryDistance: 15000,
    numberOfItems: 1100,
    orderTime: normal_day,
  });
  expect(fee).toBe(0);
});

test('test_base_fee', () => {
  const fee = deliveryFeeCalculator({
    config: current_config,
    cartValue: 10,
    deliveryDistance: 1,
    numberOfItems: 1,
    orderTime: normal_day,
  });
  expect(fee).toBe(2);
});

test('test_add_surcharge', () => {
  const fee = deliveryFeeCalculator({
    config: current_config,
    cartValue: 5.8,
    deliveryDistance: 1,
    numberOfItems: 1,
    orderTime: normal_day,
  });
  expect(fee).toBe(6.2);
});

test('test_add_distance_fee', () => {
  let fee = deliveryFeeCalculator({
    config: current_config,
    cartValue: 10,
    deliveryDistance: 1500,
    numberOfItems: 1,
    orderTime: normal_day,
  });
  expect(fee).toBe(3);

  fee = deliveryFeeCalculator({
    config: current_config,
    cartValue: 10,
    deliveryDistance: 1501,
    numberOfItems: 1,
    orderTime: normal_day,
  });
  expect(fee).toBe(4);
});

test('test_numberOfItems_fee', () => {
  let fee = deliveryFeeCalculator({
    config: current_config,
    cartValue: 10,
    deliveryDistance: 1,
    numberOfItems: 11,
    orderTime: normal_day,
  });
  expect(fee).toBe(5.5);
  fee = deliveryFeeCalculator({
    config: current_config,
    cartValue: 10,
    deliveryDistance: 1,
    numberOfItems: 13,
    orderTime: normal_day,
  });
  expect(fee).toBe(7.7);
});

test('test_rushday', () => {
  let fee = deliveryFeeCalculator({
    config: current_config,
    cartValue: 10,
    deliveryDistance: 1,
    numberOfItems: 1,
    orderTime: rush_day,
  });
  expect(fee).toBe(2.4);
});

test('test_fee_limit', () => {
  let fee = deliveryFeeCalculator({
    config: current_config,
    cartValue: 1,
    deliveryDistance: 100000,
    numberOfItems: 100000,
    orderTime: rush_day,
  });
  expect(fee).toBe(15);
});

// To test this problem (https://stackoverflow.com/questions/588004/is-floating-point-math-broken)
test('test_is_floating_point_math_broken', () => {
  let fee = deliveryFeeCalculator({
    config: current_config,
    cartValue: 9.8,
    deliveryDistance: 1,
    numberOfItems: 14,
    orderTime: normal_day,
  });
  expect(fee).toBe(8.4);
});
