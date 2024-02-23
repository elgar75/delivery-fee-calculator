import { UseFormRegisterReturn } from 'react-hook-form';

export function InputGroup(props: {
  id: string;
  title: string;
  type: 'number' | 'float' | 'datetime-local';
  form_register: UseFormRegisterReturn;
  error?: string;
  unit?: string;
}) {
  return (
    <div className="d-flex mb-3">
      <label className="ml-1 col-4" htmlFor={props.title}>
        {props.title}
      </label>
      <div className="input-group">
        <input
          id={props.id}
          data-test-id={props.id}
          type={props.type === 'float' ? 'number' : props.type}
          step={props.type === 'float' ? 0.01 : undefined}
          className={`form-control ${props.error && 'is-invalid'}`}
          {...props.form_register}
        />
        {props.unit ? <span className="input-group-text">{props.unit}</span> : ''}
        <div className="invalid-feedback">{props.error}</div>
      </div>
    </div>
  );
}
