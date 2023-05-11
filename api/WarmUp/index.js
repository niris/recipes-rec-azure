module.exports = async function (context, req) {
  context.log("Warm-up request received.");
  
  // Simulate some processing time for warm-up
  await sleep(1000);

  context.log("Warm-up completed successfully.");
  context.res = {
    status: 200,
    body: "Warm-up completed successfully.",
  };
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
