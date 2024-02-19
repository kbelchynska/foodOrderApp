import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.price * item.quantity,
        0,
    );

    const handleClose = () => {
        userProgressCtx.hideCheckout();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const fd = FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
    };

    return (
        <Modal open={userProgressCtx.progress == "checkout"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="full-name" />
                <Input label="E-Mail Address" type="text" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                <p className="modal-actions">
                    <Button onCick={handleClose} type="button" textOnly>
                        Close
                    </Button>
                    <Button>Submit the Order</Button>
                </p>
            </form>
        </Modal>
    );
};

export default Checkout;
