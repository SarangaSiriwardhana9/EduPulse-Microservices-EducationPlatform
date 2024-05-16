import React, { useState } from "react";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button, FormControl, FormLabel } from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const publishableKey = 'pk_test_51PEpR3P8dDb7QY7tKrBzy4J2YxgLPMx8sa4GPNpGeuuI3ESshjyW1qXZAx3VHioialpcMMZuTE1kHTL4f5gAuYuf00MRP8Okqi';
const stripePromise = loadStripe(publishableKey);


const UpdatePaymentDataForm = ({ userId, authToken, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      try {
        const response = await fetch(
          `http://localhost:7072/api/paymentMangement/update-card`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              userId,
              updatedCardDetails: {
                token: token.id,
              },
            }),
          }
        );

        const responseData = await response.json(); // Parse response JSON
        if (responseData.message === 'Card details updated successfully') {
          
          toast.success('Card details updated successfully');
          onClose();
        } else {
          setError('Failed to save card');
          toast.error('Failed to save card');
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to save card');
        toast.error('Failed to save card');
        setLoading(false);
      }

    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Card Details</FormLabel>
        <CardElement />
      </FormControl>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Button
        mt={4}
        colorScheme="blue"
        isLoading={loading}
        type="submit"
        disabled={!stripe}
      >
        update card
      </Button>
    </form>
  );
}

const UpdatePaymentData = ({ userId, authToken, onClose }) => {

  // const stripe = useStripe();
  // const elements = useElements();
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const cardElement = elements.getElement(CardElement);
  //   const { token, error } = await stripe.createToken(cardElement);

  //   if (error) {
  //     setError(error.message);
  //     setLoading(false);
  //   } else {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:7072/api/paymentMangement/update-card`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //           body: JSON.stringify({
  //             userId,
  //             updatedCardDetails: {
  //               token: token.id,
  //             },
  //           }),
  //         }
  //       );

  //       const data = await response.json();
  //       console.log(data);

  //       setLoading(false);
  //       onClose(); // Close the modal on successful update
  //     } catch (error) {
  //       console.error(error);
  //       setError("Failed to update card details");
  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <Elements stripe={stripePromise}>
      <UpdatePaymentDataForm userId={userId} authToken={authToken} onClose={onClose} />
    </Elements>
  );
};

export default UpdatePaymentData;
