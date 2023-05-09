const db = require("../lib/azure-cosmosdb-mongodb");

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
  await db.init();
  res = await db.findItems();
  return res;
}
