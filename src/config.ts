import { DeliveryFeeCalculatorConfig } from './functions/delivery_fee_calculation';

export const current_config: DeliveryFeeCalculatorConfig = {
  free_delivery_limit: 200,
  max_delivery_fee: 15,
  surcharge_limit: 10,
  base_fee: 2,

  base_fee_distance_limit: 1000,
  additional_distance_range: 500,
  additional_distance_fee: 1,

  base_fee_numberOfItems_limit: 4,
  numberOfItems_fee: 0.5,
  numberOfItems_bulk_limit: 12,
  numberOfItems_bulk_fee: 1.2,

  rushday_count: 5, // Friday
  rushday_start_hour: 15,
  rushday_end_hour: 19,
  rushday_fee: 1.2,
};
