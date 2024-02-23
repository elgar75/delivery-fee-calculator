export interface DeliveryFeeCalculatorConfig {
  surcharge_limit: number;
  free_delivery_limit: number;
  base_fee: number;
  max_delivery_fee: number;

  base_fee_distance_limit: number;
  additional_distance_range: number;
  additional_distance_fee: number;

  base_fee_numberOfItems_limit: number;
  numberOfItems_fee: number;
  numberOfItems_bulk_limit: number;
  numberOfItems_bulk_fee: number;

  rushday_count: number;
  rushday_start_hour: number;
  rushday_end_hour: number;
  rushday_fee: number;
}

export interface DeliveryFeeCalculatorInput {
  config: DeliveryFeeCalculatorConfig;
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  orderTime: Date;
}

export function deliveryFeeCalculator({
  config,
  cartValue,
  deliveryDistance,
  numberOfItems,
  orderTime,
}: DeliveryFeeCalculatorInput) {
  let delivery_fee = 0;

  // Customer enjoys free delivery
  if (cartValue >= config.free_delivery_limit) return delivery_fee;

  // Adding surcharge
  if (cartValue < config.surcharge_limit) {
    delivery_fee += config.surcharge_limit - cartValue;
  }

  // Adding Base Fee
  delivery_fee += config.base_fee;

  // Adding distance fee
  if (deliveryDistance > config.base_fee_distance_limit) {
    delivery_fee +=
      Math.ceil((deliveryDistance - config.base_fee_distance_limit) / config.additional_distance_range) *
      config.additional_distance_fee;
  }

  // Adding items count fee
  if (numberOfItems > config.base_fee_numberOfItems_limit) {
    delivery_fee += (numberOfItems - config.base_fee_numberOfItems_limit) * config.numberOfItems_fee;
    if (numberOfItems > config.numberOfItems_bulk_limit) {
      delivery_fee += config.numberOfItems_bulk_fee;
    }
  }

  // Adding rush hours fee
  if (
    orderTime.getDay() === config.rushday_count &&
    orderTime.getHours() >= config.rushday_start_hour &&
    orderTime.getHours() <= config.rushday_end_hour
  ) {
    delivery_fee *= config.rushday_fee;
  }

  // To fix this problem (https://stackoverflow.com/questions/588004/is-floating-point-math-broken)
  // And also we don't have more that 2 floating points in currency
  delivery_fee = Number(delivery_fee.toFixed(2));

  return Math.min(config.max_delivery_fee, delivery_fee);
}
