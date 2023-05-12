import { useState, useEffect } from "react";
import "./FindRecipes.css";

function FindRecipes() {
  const [ingredientValue, setIngredientValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [result, setResult] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (ingredients.length === 0) {
      setResult(null);
    }
  }, [ingredients]);

  function handleAddIngredient(event) {
    event.preventDefault();
    if (ingredientValue.trim() === "") {
      return;
    }
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      ingredientValue.trim(),
    ]);
    setIngredientValue("");
  }

  function handleRemoveIngredient(index) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  }

  function handleSearchRecipes() {
    if (ingredients.length > 0) {
      fetch(`${apiUrl}GetRecommandations`, {
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
  }

  return (
    <div className="App">
      <form onSubmit={handleAddIngredient}>
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
        {ingredients.length > 0 && (
          <p>
            {ingredients.map((item, index) => (
              <span className="tag" key={index}>
                {item}{" "}
                <button
                  className="button icon-only"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  &times;
                </button>
              </span>
            ))}
          </p>
        )}
        <div className="button-container">
          <button
            type="button"
            onClick={handleSearchRecipes}
            className="button primary"
            disabled={ingredients.length === 0}
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setIngredients([]);
            }}
          >
            Reset
          </button>
        </div>
      </form>
      {result && result.length > 0 && (
        <div className="result">
          <h4>Recommended Recipes:</h4>
          {result.map((item, index) => (
            <div className="card">
              <header>
                <h4>{item.Name}</h4>
              </header>
              {item.Description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FindRecipes;
