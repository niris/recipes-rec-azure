import { useState } from "react";
import "./App.css";

function IngredientList({ ingredients }) {
  return (
    <>
      {ingredients.length > 0 ? (
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function App() {
  const [ingredientValue, setIngredientValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [result, setResult] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    // Send the request to the API
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

    // Clear the input and reset the ingredient list
    setIngredientValue("");
    setIngredients([]);
  }

  function handleAddIngredient() {
    if (ingredientValue.trim() === "") {
      return;
    }
    setIngredients([...ingredients, ingredientValue.trim()]);
    setIngredientValue("");
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="ingredients"
            value={ingredientValue}
            onChange={(e) => setIngredientValue(e.target.value)}
            placeholder="add ingredient"
          />
          <button type="button" onClick={handleAddIngredient}>
            <i className="material-icons">add</i>
          </button>
        </div>
        <IngredientList ingredients={ingredients} />
        <button type="submit">Submit</button>
      </form>
      {result ? (
        <div className="result">
          <h1>Recommended recipe:</h1>
          <p>{result.title}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
