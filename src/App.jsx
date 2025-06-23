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

  function findItemAmount(id) {
    return cart.find((item) => item?.id === id)?.amount;
  }

  function increaseItemAmount(id) {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        } else return item;
      })
    );
  }

  function decreaseItemAmount(id) {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.amount !== 1) {
          return { ...item, amount: item.amount - 1 };
        } else return item;
      })
    );

    if (findItemAmount(id) === 1) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    }
  }

  function deleteItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function sumAllItems() {
    return cart.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);
  }

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
                <CoctailItem key={index} name={item.strDrink} image={item.strDrinkThumb} id={item.idDrink} setCart={setCart} checkIsItemInCart={checkIsItemInCart} findItemAmount={findItemAmount} increaseItemAmount={increaseItemAmount} decreaseItemAmount={decreaseItemAmount} />
              );
            })}
        </div>
      )}

      <div className="cart-window">
        <h3> {`Items in cart: ${sumAllItems()}`} </h3>
        {cart.map((cartItem, index) => (
          // <div className="cart-item" key={index}>
          //   {" "}
          //   <span>{cartItem.name}</span> <span>{cartItem.amount}</span>{" "}
          // </div>
          <article className="cart-item" key={index}>
            <img className="cartItem-img" src={cartItem.picture} />
            <div className="cart-item-details">
              <h5 className="cartName">{cartItem.name}</h5>
              <span className="amnt">{cartItem.amount} X</span>
            </div>
            <button
              className="delete-btn"
              onClick={() => deleteItem(cartItem.id)}
            >
              X
            </button>
          </article>
        ))}
      </div>

      {error && (
        <h1 className="err-msg">There's no coctails with this name...</h1>
      )}
    </>
  );
}

export default App;
