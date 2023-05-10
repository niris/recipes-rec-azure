const db = require("../lib/azure-cosmosdb-mongodb");

db.init()
  .then(() => {
    console.log("Database connection initialized successfully");
  })
  .catch((error) => {
    console.error("Error initializing database connection:", error);
  });

module.exports = async function (context, req) {
  const ingredients = req.body.ingredients;
  console.log("ingredients ", ingredients);

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
    const regexPatterns = ingredients.map((ingredient) => new RegExp(ingredient, 'i'));
    const res = await db.findItems({ "Ingredients": { "$in": regexPatterns } });
    return res;
  } catch (error) {
    console.error(`Error generating recipe: ${error.message}`);
    throw error;
  }
}