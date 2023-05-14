import React, { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    Name: "",
    Description: "",
    Ingredients: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientsChange = (e, index) => {
    const newIngredients = [...recipe.Ingredients];
    newIngredients[index] = e.target.value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      Ingredients: newIngredients,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/AddRecipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        console.log("Recipe added successfully!");
        setRecipe({
          Name: "",
          Description: "",
          Ingredients: [],
        });
      } else {
        console.error("Error adding recipe:", response.status);
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleAddIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      Ingredients: [...prevRecipe.Ingredients, ""],
    }));
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...recipe.Ingredients];
    newIngredients.splice(index, 1);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      Ingredients: newIngredients,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="Name"
          value={recipe.Name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="Description"
          value={recipe.Description}
          onChange={handleChange}
          required
        />
      </div>
      <label>Ingredients:</label>
      <div>
        {recipe.Ingredients.map((ingredient, index) => (
          <div key={index} className="row">
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientsChange(e, index)}
              required
              className="col"
            />
            <button
              type="button"
              className="col-1 button clear text-error icon-only"
              onClick={() => handleRemoveIngredient(index)}
            >
              <i className="material-icons">delete</i>
            </button>
          </div>
        ))}
      </div>
      <div className="is-center">
        <button
          type="button"
          className="button clear primary"
          onClick={handleAddIngredient}
        >
          + more ingredient ...
        </button>
      </div>
      <div className="is-right">
        <button type="submit" className="button">
          Add Recipe
        </button>
      </div>
    </form>
  );
};

export default AddRecipe;
