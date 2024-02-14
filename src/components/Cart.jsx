import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.price * item.quantity,
        0,
    );

    const handleCloseCart = () => {
        userProgressCtx.hideCart();
    };

    return (
        <Modal className="cart" open={userProgressCtx.progress == "cart"}>
            <h2>Your cart</h2>
            <ul>
                {cartCtx.items.map((item) => {
                    return (
                        <li key={item.id}>
                            {item.name}-{item.quantity}
                        </li>
                    );
                })}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>
                    Close
                </Button>
                <Button>Go to checkout</Button>
            </p>
        </Modal>
    );
};

export default Cart;
