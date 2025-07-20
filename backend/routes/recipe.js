
const express = require("express");
const { getRecipes,addRecipe ,editRecipe, getRecipe, deleteRecipe,upload} = require("../controller/recipe");
const router = express.Router();

router.get("/", getRecipes);//Get all recipes
router.get("/:id", getRecipe); // Get a specific recipe by ID
router.post("/", upload.single('file'),addRecipe); // Create a new recipe
router.put("/:id", editRecipe); // Update a recipe by ID
router.delete("/:id", deleteRecipe); // Delete a recipe by ID

module.exports = router;