module.exports = async function (context, req) {
  const ingredients = req.body.ingredients;
  console.log("ingredients ", ingredients)
  const recipe = generateRecipe(ingredients);
  context.res = {
    body: recipe,
    headers: {
      "Content-Type": "application/json",
    },
  };
};

// Function to generate a recipe based on a list of ingredients
function generateRecipe(ingredients) {
  // TODO: Implement recipe generation logic based on the list of ingredients
  const recipe = {
    title: "Example Recipe",
    ingredients,
    instructions: "Example instructions",
  };
  return recipe;
}
