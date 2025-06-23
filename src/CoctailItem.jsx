import React from "react";

function CoctailItem(props) {
  const { image, name, id, setCart, checkIsItemInCart } = props;
  console.log(id);
  const isItemInCart = checkIsItemInCart(id);

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

      setCart((prev) => [
        ...prev,
        { name: coctailName, id: coctailId, amount: 1 },
      ]);
      console.log(isItemInCart);
    };

    fetchPost();
  }
  return (
    <article className="coctail-item" onClick={() => showIngredients(name)}>
      <span className="image-cont">
        {" "}
        <img src={image} className="coctail-img" />{" "}
      </span>
      <h5> {name} </h5>

      {!isItemInCart && (
        <div className="cart-button-empty">
          <i className="bx bx-cart-add">
            {" "}
            <span className="add-to-chart-text">Add to Cart</span>
          </i>
        </div>
      )}
      {isItemInCart && (
        <div className="cart-button-full">
          <button className="btn">-</button>
          <span className="amount-text">1</span>
          <button className="btn">+</button>
        </div>
      )}
    </article>
  );
}

export default CoctailItem;
