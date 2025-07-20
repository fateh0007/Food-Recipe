import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddFoodRecipe() {
    const [recipeData,setRecipeData]  = useState({});
    const navigate = useNavigate();
    const onHandleChange = (e) => {
        let val = (e.target.name==="ingredients")? e.target.value.split(",") : (e.target.name==="file")? e.target.files[0] : e.target.value;
        setRecipeData(prev => ({...prev, [e.target.name]: val}));
    }
    const onHandleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5001/recipe', recipeData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            toast.success("Recipe added successfully!"); // Show toast first
            setTimeout(() => navigate("/"), 2000); // Delay navigation to allow toast to display
        })
        
    }
  return (
    <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="file" onChange={onHandleChange}></input>
                    </div>
                    <button type="submit">Add Recipe</button>
                </form>
            </div>
            <ToastContainer />
        </>
  )
}

export default AddFoodRecipe