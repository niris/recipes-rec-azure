const mongoose = require("mongoose")

let db = null;

const RecipesSchema = new mongoose.Schema({
  Name: String,
  Description: String,
  Ingredients: [String],
});

const RecipesModel = mongoose.model("recipes", RecipesSchema,"recipes");

module.exports.init = async () => {
  if (!db) {
    db = await mongoose.connect(process.env["CosmosDbConnectionString"]);
  }
};

module.exports.addItem = async (doc) => {
  const modelToInsert = new RecipesModel();
  modelToInsert["Name"] = doc.name;
  return await modelToInsert.save();
};

module.exports.findItemById = async (id) => {
  return await RecipesModel.findById(id);
};

module.exports.findItems = async (query = {}) => {
  recipes = await RecipesModel.find(query);
  console.log("resresults", recipes)
  return recipes
};

module.exports.deleteItemById = async (id) => {
  return await RecipesModel.findByIdAndDelete(id);
};
