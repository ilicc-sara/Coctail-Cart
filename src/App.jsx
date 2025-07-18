import { useState, useEffect } from "react";
import "./App.css";
import CoctailItem from "./CoctailItem";
import CartItem from "./CartItem";
import { debounce } from "throttle-debounce";
import { ingredients } from "./data";
import axios from "axios";

function App() {
  const [coctails, setCoctails] = useState(null);

  const [query, setQuery] = useState("");

  const [error, showError] = useState(false);

  const [cart, setCart] = useState([]);

  const [displayCart, setDisplayCart] = useState(false);

  const url = `https://thecocktaildb.com/api/json/v1/1/filter.php?i=Gin`;

  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      setCoctails(response?.data?.drinks);
    })
    .catch((err) => {
      console.log(err);
    });

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://thecocktaildb.com/api/json/v1/1/filter.php?i=Gin`
  //       );
  //       const posts = await response.json();
  //       setCoctails(posts.drinks);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchPost();
  // }, []);

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

  function handleInputChange(e) {
    console.log(e.target.value);
    setQuery(e.target.value);
    console.log(query);
    const newQuery = e.target.value;
    if (!newQuery) return;
    setQuery(newQuery);

    const debounceFunc = debounce(1500, () => {
      const fetchPost = async () => {
        try {
          showError(false);
          const response = await fetch(
            ` https://thecocktaildb.com/api/json/v1/1/search.php?s=${newQuery}`
          );
          const posts = await response.json();
          console.log(posts);
          console.log(response);
          console.log(posts.drinks);

          setCoctails(posts.drinks);
          if (!posts.drinks) showError(true);
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchPost();
    });

    debounceFunc();

    debounceFunc.cancel({ upcomingOnly: true });

    debounceFunc();
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

  return (
    <>
      <h1>Our Coctails</h1>
      <i
        className="bx bx-cart-add display-cart-icon"
        onClick={() => setDisplayCart(true)}
      >
        <p className="cart-sum">{`${sumAllItems()}`}</p>{" "}
      </i>

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
      <input type="text" className="input-name" value={query} onChange={(e) => handleInputChange(e)} />

      {!error && (
        <div className="coctails-list">
          {coctails &&
            coctails.map((item, index) => {
              return (
                <CoctailItem
                  key={index}
                  name={item.strDrink}
                  image={item.strDrinkThumb}
                  id={item.idDrink}
                  setCart={setCart}
                  checkIsItemInCart={checkIsItemInCart}
                  findItemAmount={findItemAmount}
                  increaseItemAmount={increaseItemAmount}
                  decreaseItemAmount={decreaseItemAmount}
                />
              );
            })}
        </div>
      )}

      <div className={`cart-window ${displayCart ? "open-cart" : ""}`}>
        <button className="close-btn" onClick={() => setDisplayCart(false)}>
          X
        </button>
        {cart.length > 0 && <h3> {`Items in cart: ${sumAllItems()}`} </h3>}
        {cart.length === 0 && (
          <h1 className="empty-cart"> {`Cart is empty...`} </h1>
        )}
        {cart.map((cartItem, index) => (
          <CartItem
            key={index}
            picture={cartItem.picture}
            name={cartItem.name}
            amount={cartItem.amount}
            id={cartItem.id}
            handleClick={deleteItem}
          />
        ))}
      </div>

      {error && (
        <h1 className="err-msg">There's no coctails with this name...</h1>
      )}
    </>
  );
}

export default App;
