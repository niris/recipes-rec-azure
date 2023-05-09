const mongoose = require('mongoose');

const RecipesSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Description: {
    type: String,
    required: true,
    trim: true
  },
  Ingredients: {
    type: [String],
    required: true
  }
});

const RecipesModel = mongoose.model('recipes', RecipesSchema, 'recipes');

async function init() {
  try {
    await mongoose.connect(process.env.CosmosDbConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to database successfully');
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
}

function sanitizeInput(input) {
  if (typeof input === 'string') {
    return input.trim();
  } else if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  } else if (typeof input === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  } else {
    return input;
  }
}

async function addItem(doc) {
  try {
    const sanitizedDoc = sanitizeInput(doc);
    const modelToInsert = new RecipesModel({
      Name: sanitizedDoc.name,
      Description: sanitizedDoc.description,
      Ingredients: sanitizedDoc.ingredients
    });
    const result = await modelToInsert.save();
    return result;
  } catch (error) {
    console.error(`Error adding item to database: ${error.message}`);
    throw error;
  }
}

async function findItemById(id) {
  try {
    const result = await RecipesModel.findById(id);
    return result;
  } catch (error) {
    console.error(`Error finding item by id: ${error.message}`);
    throw error;
  }
}

async function findItems(query = {}) {
  try {
    const sanitizedQuery = sanitizeInput(query);
    const recipes = await RecipesModel.find(sanitizedQuery);
    console.log('Results:', recipes);
    return recipes;
  } catch (error) {
    console.error(`Error finding items: ${error.message}`);
    throw error;
  }
}

async function deleteItemById(id) {
  try {
    const result = await RecipesModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.error(`Error deleting item by id: ${error.message}`);
    throw error;
  }
}

module.exports = {
  init,
  addItem,
  findItemById,
  findItems,
  deleteItemById
};
