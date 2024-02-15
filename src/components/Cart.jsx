import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

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
                        <CartItem
                            key={item.id}
                            name={item.name}
                            quantity={item.quantity}
                            price={item.price}
                            onAdd={() => cartCtx.addItem(item)}
                            onRemove={() => cartCtx.removeItem(item.id)}
                        />
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
