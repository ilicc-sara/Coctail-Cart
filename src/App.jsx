import { useState, useEffect } from "react";
import "./App.css";
import CoctailItem from "./CoctailItem";

function App() {
  const [coctails, setCoctails] = useState(null);

  const [query, setQuery] = useState("");

  const [error, showError] = useState(false);

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

    debounceFunc(); // will not be invoked

    debounceFunc.cancel({ upcomingOnly: true });

    debounceFunc(); // will be invoked
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
      <input type="text" className="input-name" value={query} onChange={(e) => handleInputChange(e)} />

      {!error && (
        <div className="coctails-list">
          {coctails &&
            coctails.map((item, index) => {
              return (
                // prettier-ignore
                <CoctailItem key={index} name={item.strDrink} image={item.strDrinkThumb} id={item.idDrink} />
              );
            })}
        </div>
      )}

      {error && (
        <h1 className="err-msg">There's no coctails with this name...</h1>
      )}
    </>
  );
}

export default App;
