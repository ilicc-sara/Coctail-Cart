import { useState, useEffect } from "react";
import "./App.css";
import CoctailItem from "./CoctailItem";

function App() {
  const [coctails, setCoctails] = useState(null);

  const [error, showError] = useState(false);

  const [cart, setCart] = useState([]);
  console.log(cart);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://thecocktaildb.com/api/json/v1/1/filter.php?i=Gin`
        );
        const posts = await response.json();
        setCoctails(posts.drinks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  function handleClick(e) {
    let ingredient = e.target.getAttribute("name");
    const fetchPost = async () => {
      const response = await fetch(
        `https://thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const posts = await response.json();

      setCoctails(posts.drinks);
    };

    fetchPost();
  }

  function checkIsItemInCart(id) {
    return cart.includes(cart.find((cartItem) => cartItem.id === id));
  }

  checkIsItemInCart("13940");

  // prettier-ignore
  const ingredients = [{ name: "Gin" }, { name: "Vodka" }, { name: "Rum" }, { name: "Tequila" }, { name: "Wine" }, { name: "Whiskey" }, { name: "Aperol" }, { name: "Campari" }, { name: "Jagermeister" }, { name: "Grenadine" }, { name: "Mint" }, { name: "Lemon" }, { name: "Pineapple" } ];

  return (
    <>
      <h1>Our Coctails</h1>

      <div className="btn-cont">
        {ingredients.map((ingredient, index) => {
          return (
            // prettier-ignore
            <button key={index} name={ingredient.name} onClick={(e) => handleClick(e)}> {ingredient.name} </button>
          );
        })}
      </div>

      <label>Search by name:</label>
      {/* prettier-ignore */}
      <input type="text" className="input-name"  />

      {!error && (
        <div className="coctails-list">
          {coctails &&
            coctails.map((item, index) => {
              return (
                // prettier-ignore
                <CoctailItem key={index} name={item.strDrink} image={item.strDrinkThumb} id={item.idDrink} setCart={setCart} checkIsItemInCart={checkIsItemInCart} />
              );
            })}
        </div>
      )}

      <div className="cart-window">
        {cart.map((cartItem, index) => (
          <p key={index}>
            {" "}
            {cartItem.name} {cartItem.amount}{" "}
          </p>
        ))}
      </div>

      {error && (
        <h1 className="err-msg">There's no coctails with this name...</h1>
      )}
    </>
  );
}

export default App;
