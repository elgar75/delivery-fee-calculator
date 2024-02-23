import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { current_config } from '../config.ts';
import { deliveryFeeCalculator } from '../functions/delivery_fee_calculation.ts';
import { InputGroup } from '../ui/inputs.tsx';

type DeliveryFeeFormInputs = {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  orderTime: Date;
};

export default function DeliveryFeeCalculator() {
  const [deliveryFee, setDeliveryFee] = useState(NaN);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryFeeFormInputs>();

  const submitCalculation: SubmitHandler<DeliveryFeeFormInputs> = (data: DeliveryFeeFormInputs) => {
    data.orderTime = new Date(data.orderTime);
    setDeliveryFee(deliveryFeeCalculator({ config: current_config, ...data }));
  };
  return (
    <div className="card">
      <div className="card-header">Delivery Fee Calculator</div>
      <form id="delivery-fee-form" className="m-4" onSubmit={handleSubmit(submitCalculation)}>
        <InputGroup
          id="cartValue"
          title="Cart Value"
          unit="€"
          type="float"
          form_register={register('cartValue', {
            required: 'cart value is required',
            min: { value: 1, message: 'cart value must be more than 0' },
          })}
          error={errors.cartValue?.message}
        />
        <InputGroup
          id="deliveryDistance"
          title="Delivery Distance"
          unit="m"
          type="number"
          form_register={register('deliveryDistance', {
            required: 'delivery distance is required',
            min: { value: 1, message: 'delivery distance must be more than 0' },
          })}
          error={errors.deliveryDistance?.message}
        />
        <InputGroup
          id="numberOfItems"
          title="Amount of Items"
          type="number"
          form_register={register('numberOfItems', {
            required: 'number of items is required',
            min: { value: 1, message: 'number of items must be more than 0' },
          })}
          error={errors.numberOfItems?.message}
        />
        <InputGroup
          id="orderTime"
          title="Time"
          type="datetime-local"
          form_register={register('orderTime', { required: 'order time is required' })}
          error={errors.orderTime?.message}
        />
        <div className="d-flex justify-content-center mt-4">
          <div
            style={{ visibility: isNaN(deliveryFee) ? 'hidden' : 'visible' }}
            className="p-2 bg-primary text-primary-text rounded"
          >
            Delivery Price:{' '}
            <span id="fee" data-test-id="fee">
              {deliveryFee || ''}
            </span>
            €
          </div>
        </div>
      </form>
      <button
        type="submit"
        id="delivery-fee-form-submit"
        form="delivery-fee-form"
        className="btn btn-primary text-primary-text card-footer"
      >
        Calculate Delivery Price
      </button>
    </div>
  );
}
