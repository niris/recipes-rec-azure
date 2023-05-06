const sql = require("mssql");

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
  console.log("try to connect to DB");
  try {
    await sql.connect(process.env.AZURESQLCONNECTION);
    const script = `SELECT r.Id, r.Name, r.Description
    FROM Recipes.Recipes r
    WHERE EXISTS (
        SELECT 1
        FROM OPENJSON(r.Ingredients, '$.ingredientList') WITH (ingredient NVARCHAR(50) '$') i
        WHERE i.ingredient in (${ingredients.map((i) => `'${i}'`).join(",")})
    );`;
    const result = await sql.query(script);
    const res = result.recordset;
    await sql.close();
    return res;
  } catch (err) {
    console.log(err);
    throw new Error("Error connecting to database");
  }
}
