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