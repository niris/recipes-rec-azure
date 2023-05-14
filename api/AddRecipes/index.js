const db = require("../lib/azure-cosmosdb-mongodb");

module.exports = async function (context, req) {
    try {
      const database = await db.init();
      const result = await db.addItem(req.body);
      context.res = {
        status: 201,
        body: result
      };
    } catch (error) {
      context.res = {
        status: 500,
        body: { error: 'An error occurred while adding the recipe.' }
      };
      context.log.error(error);
    }
  };

  
  
  
  
  
  