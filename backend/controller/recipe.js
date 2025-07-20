const Recipes = require("../models/recipe");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
})
  
const upload = multer({ storage: storage })

const getRecipes= async (req, res) => {
    const recipes = await Recipes.find() // find all recipes and return it
    return res.json(recipes);
}

const getRecipe= async (req, res) => {
    // const id = req.params.id;

    const recipe =await Recipes.findById(req.params.id);

    return res.json(recipe);
}

const addRecipe= async (req, res) => {
    const {title, ingredients,instructions,time} = req.body;
    if(!title || !instructions || !ingredients) {
        return res.status(400).json({error: "All fields are required"});
    }
    
    const newRecipe = await Recipes.create({
        title,
        ingredients,
        instructions,
        time,
        coverImage:req.file.filename
    })

    return res.json(newRecipe)
}

const editRecipe= async(req, res) => {
    const {title, ingredients, instructions, time} = req.body;

    const recipe = await Recipes.findById(req.params.id);
    try {
        if(!recipe) {
            return res.status(404).json({error: "Recipe not found"});
        }
        if(!title || !instructions || !ingredients) {
            return res.status(400).json({error: "All fields are required"});
        }
        await Recipes.findByIdAndUpdate(req.params.id, req.body,{new: true});
        res.json({
            message: "Recipe updated successfully",
            recipe: {
                title,
                ingredients,
                instructions,
                time
            }
        });
    } catch (error) {
        return res.status(404).json({error: "Recipe not found"});
    }
}

const deleteRecipe= (req, res) => {
    const id = req.params.id;

    Recipes.findByIdAndDelete(id)
        .then(() => {
            res.json({message: "Recipe deleted successfully"});
        })
        .catch((error) => {
            res.status(404).json({error: "Recipe not found"});
        });
        
}

module.exports = {
    getRecipes,
    getRecipe,
    addRecipe,
    editRecipe,
    deleteRecipe,
    upload,
}