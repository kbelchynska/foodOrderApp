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

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            }),
        });
    };

    return (
        <Modal open={userProgressCtx.progress == "checkout"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" type="text" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                <p className="modal-actions">
                    <Button onClick={handleClose} type="button" textOnly>
                        Close
                    </Button>
                    <Button type="submit">Submit the Order</Button>
                </p>
            </form>
        </Modal>
    );
};

export default Checkout;
