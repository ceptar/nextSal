import * as React from 'react';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ErrorBoundary } from "react-error-boundary";
import { EmptyCartPage } from "@/checkout/views/EmptyCartPage";
import { PageNotFound } from "@/checkout/views/PageNotFound";
import { useUser } from "@/checkout/views/../hooks/useUser";
// import { Summary, SummarySkeleton } from "@/checkout/sections/Summary";
// import { CheckoutFormSkeleton } from "@/checkout/sections/CheckoutForm";
import CheckoutForm from "@/ui/components/CheckoutForm";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { CheckoutSkeleton } from "@/checkout/views/Checkout/CheckoutSkeleton";

const stripePromise = loadStripe('pk_live_51PHY56IqbXyMSGmjfiHNgFGqrsy8kOM5RkNvKY62adXSjIVv5zSlP7QHE0xWVdacGRZ32bnvCnmaKqPo17ojDHdN00drHeJ6Ac');

export const stripePayment = () => {
	const [clientSecret, setClientSecret] = useState('');
	const { checkout, fetching: fetchingCheckout } = useCheckout();
	const { loading: isAuthenticating } = useUser();
	console.log('checkout', checkout);
	const isCheckoutInvalid = !fetchingCheckout && !checkout && !isAuthenticating;

	const isInitiallyAuthenticating = isAuthenticating && !checkout;

	const isEmptyCart = checkout && !checkout.lines.length;

 useEffect(() => {
    if (!checkout) return;

    // Fetch the client secret from your server
    fetch('/api/payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: checkout.totalPrice.gross.amount * 100 }), // Use the total amount from checkout
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json() as Promise<{ client_secret: string }>;
      })
      .then((data) => {
        console.log('Fetched client secret:', data.client_secret); // Log the client secret
        if (data.client_secret) {
          setClientSecret(data.client_secret);
        } else {
          console.error('Failed to fetch client secret');
        }
      })
      .catch((error) => console.error('Error fetching client secret:', error));
  }, [checkout]);

  const options = {
    clientSecret: clientSecret,
  };

  return isCheckoutInvalid ? (
    <PageNotFound />
  ) : isInitiallyAuthenticating ? (
    <CheckoutSkeleton />
  ) : (
    <ErrorBoundary FallbackComponent={PageNotFound}>
      <div className="page">
        {isEmptyCart ? (
          <EmptyCartPage />
        ) : (
          <div className="grid min-h-screen grid-cols-1 gap-x-16 ">
            {clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
              </Elements>
            )}
            {/* <Suspense fallback={<SummarySkeleton />}>
              <Summary {...checkout} />
            </Suspense> */}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};