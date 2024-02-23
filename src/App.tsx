import './App.scss';
import DeliveryFeeCalculator from './components/deliveryFeeCalculator';

function App() {
  return (
    <>
      <div className="container col-xl-5 col-md-6 vh-100 d-flex flex-column justify-content-center">
        <DeliveryFeeCalculator />
      </div>
    </>
  );
}

export default App;
