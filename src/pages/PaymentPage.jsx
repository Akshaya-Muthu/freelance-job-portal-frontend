import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";

// ✅ Use your publishable key here
const stripePromise = loadStripe("pk_test_51RpnjAPQIBrs4TkGaVf3BZvJpJ4Dz5zbo6mMlzTszjRZtva3Oqb1WXTX1yQ6LKKTDWkGny6z20ntPcahZuJcpwsK00oxt9ZA0M");

const PaymentPage = ({ jobId, amount, milestone }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
      
      {/* ✅ Wrap your PaymentForm with Elements */}
      <Elements stripe={stripePromise}>
        <PaymentForm jobId={jobId} amount={amount} milestone={milestone} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
