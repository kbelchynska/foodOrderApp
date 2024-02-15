import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { useContext } from "react";

const CartItem = ({ quantity, name, price, onAdd, onRemove }) => {
    const cartCtx = useContext(CartContext);

    return (
        <li className="cart-item">
            <p>
                {name} - {quantity} x {currencyFormatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onRemove}>-</button>
                <span>{quantity}</span>
                <button onClick={onAdd}>+</button>
            </p>
        </li>
    );
};

export default CartItem;
