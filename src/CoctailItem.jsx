import React from "react";

function CoctailItem(props) {
  const { image, name, id } = props;
  // console.log(id);

  function showIngredients(name) {
    const fetchPost = async () => {
      const response = await fetch(
        // `https://thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`
        // `https://thecocktaildb.com/api/json/v1/1/lookup.php?s=${name}`
        `https://thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
      );
      const posts = await response.json();
      console.log(posts);
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

      <div className="cart-button-empty">
        <i className="bx bx-cart-add">
          {" "}
          <span className="add-to-chart-text">Add to Cart</span>
        </i>
      </div>
    </article>
  );
}

export default CoctailItem;
