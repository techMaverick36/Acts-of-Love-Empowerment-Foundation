import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

type PaymentComponentProps = {
  amount: number;
};

const PaymentComponent = ({ amount }: PaymentComponentProps) => {
  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: `${Date.now()}`, // String format is safer
    amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://your-logo-url.com/logo.png',
    },
  };

  //Initialize the hook
  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response: unknown) => {
               console.log("Payment Response:", response);
               closePaymentModal();
            },
            onClose: () => {
              console.log("User closed the modal");
            },
          });
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default PaymentComponent;
