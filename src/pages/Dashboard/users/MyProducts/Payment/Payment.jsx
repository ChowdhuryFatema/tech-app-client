import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import PropTypes from 'prop-types';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = ({totalAmount, refetch, setLoading}) => {
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm totalAmount={totalAmount} setLoading={setLoading} refetch={refetch}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

Payment.propTypes = {
    totalAmount: PropTypes.number,
    refetch: PropTypes.func,
    setLoading: PropTypes.func,

}
export default Payment;