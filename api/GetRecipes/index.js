const db = require("../lib/azure-cosmosdb-mongodb");

db.init()
  .then(() => {
    console.log("Database connection initialized!");
  })
  .catch((error) => {
    console.error("Error initializing database connection:", error);
  });

module.exports = async function (context, req) {
  try {
    const recipe = await db.findItems({});
    context.res = {
        body: recipe,
        headers: {
          "Content-Type": "application/json",
        },
      };
  } catch (error) {
    context.error(`Error generating recipe: ${error.message}`);
    throw error;
  }
};