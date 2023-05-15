const db = require("../lib/azure-cosmosdb-mongodb");

module.exports = async function (context, req) {
  const ingredients = req.body.ingredients;

  const recipe = await generateRecipe(ingredients);
  context.res = {
    body: recipe,
    headers: {
      "Content-Type": "application/json",
    },
  };
};

// Generate list of recommended recipes based on a list of ingredients
async function generateRecipe(ingredients) {

  try {
    const regexPatterns = ingredients.map(
      (ingredient) => new RegExp(ingredient, "i")
    );
    const res = await db.findItems({ Ingredients: { $in: regexPatterns } });
    return res;
  } catch (error) {
    context.error(`Error generating recipe: ${error.message}`);
    throw error;
  }
}



