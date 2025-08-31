import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../api/axios";

const PaymentForm = ({ jobId, amount, milestone }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/payments/create-intent", { amount, jobId, milestone });
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <CardElement className="mb-4 p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay ${amount / 100}
      </button>
    </form>
  );
};

export default PaymentForm;
