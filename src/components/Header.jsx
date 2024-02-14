import logo from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
import { useContext } from "react";

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const handleShowCart = () => {
    userProgressCtx.showCart();
  };
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo food shop" />
        <h1>Food Order Shop</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
