import React from "react";

function CoctailItem(props) {
  // prettier-ignore
  const { image, name, id, setCart, checkIsItemInCart, findItemAmount, increaseItemAmount, decreaseItemAmount } = props;

  const isItemInCart = checkIsItemInCart(id);

  const itemAmount = findItemAmount(id);

  function showIngredients(name) {
    const fetchPost = async () => {
      const response = await fetch(
        // `https://thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`
        // `https://thecocktaildb.com/api/json/v1/1/lookup.php?s=${name}`
        `https://thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
      );
      const posts = await response.json();
      console.log(
        posts.drinks.find((coctail) => coctail.strDrink === name).idDrink
      );
      const coctailName = posts.drinks.find(
        (coctail) => coctail.strDrink === name
      ).strDrink;
      const coctailId = posts.drinks.find(
        (coctail) => coctail.strDrink === name
      ).idDrink;

      const coctailPicture = posts.drinks.find(
        (coctail) => coctail.strDrink === name
      ).strDrinkThumb;

      setCart((prev) => [
        ...prev,
        {
          name: coctailName,
          id: coctailId,
          amount: 1,
          picture: coctailPicture,
        },
      ]);
      console.log(isItemInCart);
    };

    fetchPost();
  }
  return (
    <article className="coctail-item">
      <span className="image-cont">
        {" "}
        <img src={image} className="coctail-img" />{" "}
      </span>

      {!isItemInCart && (
        <div
          className="cart-button-empty"
          onClick={() => showIngredients(name)}
        >
          <i className="bx bx-cart-add btn-icon">
            {" "}
            <span className="add-to-chart-text">Add to Cart</span>
          </i>
        </div>
      )}
      {isItemInCart && (
        <div className="cart-button-full">
          <button className="btn" onClick={() => decreaseItemAmount(id)}>
            -
          </button>
          <span className="amount-text">{itemAmount}</span>
          <button className="btn" onClick={() => increaseItemAmount(id)}>
            +
          </button>
        </div>
      )}
      <h5 className="coctail-name"> {name} </h5>
    </article>
  );
}

export default CoctailItem;
