import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Food from '../assets/Food.png'
import {BsStopwatchFill} from "react-icons/bs"
import {FaHeart} from "react-icons/fa6"

function RecipeItems() {
  const allRecipes = useLoaderData();
  console.log('Recipes data:', allRecipes);

  if (!allRecipes || allRecipes.length === 0) {
    return <div>No recipes found</div>;
  }

  return (
    <div className='card-container'>
      {allRecipes.map((item,index)=>{
        return(
            <div key={index} className='card'>
                <img src={`http://localhost:5001/images/${item.coverImage}`} width="120px" height="100px"></img>
                <div className='card-body'>
                    <div className='title'>{item.title}</div>
                    <div className='icons'>
                    <div className='timer'><BsStopwatchFill/>30 min</div>
                    <FaHeart/>
                    </div>
                </div>
            </div>
        )
      })}
    </div>
  )
}

export default RecipeItems