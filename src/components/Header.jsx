import logo from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import { useContext } from "react";

const Header = () => {
    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="logo food shop" />
                <h1>Food Order Shop</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
};

export default Header;
