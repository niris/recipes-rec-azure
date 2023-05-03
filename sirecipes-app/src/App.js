import { useState } from "react";
import "./App.css";

function App() {
  const [ingredientValue, setIngredientValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [result, setResult] = useState(null);

  function IngredientList({ ingredients }) {
    return (
      <>
        {ingredients.length > 0 ? (
          <p>
            {ingredients.map((item, index) => (
              <span className="tag" key={index}>
                {item}{" "}
                <button
                  className="button icon-only"
                  onClick={() => {
                    ingredients.splice(index, 1);
                    console.log("ingredientList ", ingredients);
                    setIngredients([...ingredients]);
                  }}
                >
                  &times;
                </button>
              </span>
            ))}
          </p>
        ) : null}
      </>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (ingredientValue.trim() === "") {
      return;
    }
    setIngredients([...ingredients, ingredientValue.trim()]);
    setIngredientValue("");
  }

  function handleSearchRecipes() {
    // Send the request to the API
    if (ingredients.length > 0) {
      fetch("/api/recommendations", {
        method: "POST",
        body: JSON.stringify({
          ingredients,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response:", data);
          setResult(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    // Clear the input and reset the ingredient list
    //setIngredientValue("");
    //setIngredients([]);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="search"
            name="ingredients"
            value={ingredientValue}
            onChange={(e) => setIngredientValue(e.target.value)}
            placeholder="add ingredient"
            className="col"
          />
          <button
            type="submit"
            className="col-1 button primary outline icon-only"
          >
            +
          </button>
        </div>
        <IngredientList ingredients={ingredients} />
        <button
          type="button"
          onClick={handleSearchRecipes}
          className="button primary"
        >
          Search
        </button>
        <button type="reset" onClick={() => setIngredients([])}>
          Reset
        </button>
      </form>
      {result && result.length > 0 ? (
        <div className="result">
          <h1>Recommended recipes</h1>
          <ul>
            {result.map((item, index) => (
              <li key={index}>{item.Name}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default App;
