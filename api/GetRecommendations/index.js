const sql = require('mssql');

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

// Function to generate a recipe based on a list of ingredients
  async function generateRecipe(ingredients) {
    // TODO: Implement recipe generation logic based on the list of ingredients
    console.log("try to connect to DB")
    try {
      await sql.connect(process.env.AZURESQLCONNECTION);
      const result = await sql.query('SELECT * FROM recipes.Recipes');
      const res = result.recordset; 
      await sql.close();
      return res;
    } catch (err) {
      console.log(err);
      throw new Error('Error connecting to database');
    }
  }