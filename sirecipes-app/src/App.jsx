import { useState } from "react";
import "./App.css";

function App() {
  const [ingredientValue, setIngredientValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [result, setResult] = useState(null);

  function handleAddIngredient(event) {
    event.preventDefault();
    if (ingredientValue.trim() === "") {
      return;
    }
    setIngredients(prevIngredients => [...prevIngredients, ingredientValue.trim()]);
    setIngredientValue("");
  }

  function handleRemoveIngredient(index) {
    setIngredients(prevIngredients => prevIngredients.filter((_, i) => i !== index));
  }

  function handleSearchRecipes() {
    //console.log(FUNCTIONS_KEY)
    if (ingredients.length > 0) {
      fetch("http://localhost:7071/api/GetRecommandations", {
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
        <button
          type="button"
          onClick={handleSearchRecipes}
          className="button primary"
          disabled={ingredients.length === 0}
        >
          Search
        </button>
        <button type="button" onClick={() => setIngredients([])}>
          Reset
        </button>
      </form>
      {result && result.length > 0 && (
        <div className="result">
          <h1>Recommended recipes</h1>
          <ul>
            {result.map((item, index) => (
              <li key={index}>{item.Name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
