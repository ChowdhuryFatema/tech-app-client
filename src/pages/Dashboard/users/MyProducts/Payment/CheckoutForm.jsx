import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
// import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../../Hooks/useAuth";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    // const [cart] = useCart();
    // const navigate = useNavigate()

    // const totalPrice = cart.reduce((prev, current) => prev + current.price, 0);

    // useEffect(() => {

    //     if (totalPrice > 0) {
    //         axiosSecure.post('/create-payment-intent', { price: totalPrice })
    //         .then(res => {
    //             console.log(res.data.clientSecret);
    //             setClientSecret(res.data.clientSecret);
    //         })
    //     }
    // }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error);
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            setError('');
        }

        // confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        });

        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)


                // now save the payment in the database
                const payment = {
                    email: user.email,
                    // price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date().toLocaleDateString(),
                    // cartIds: cart.map(item => item._id),
                    // menuItemIds: cart.map(item => item.menuId),
                    status: 'pending',
                }

                const res = await axiosSecure.post('/payments', payment);
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        icon: "success",
                        title: "Thanks for the payment",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    //   navigate('/dashboard/paymentHistory')
                }
            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {transactionId && <p className="text-green-500"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;