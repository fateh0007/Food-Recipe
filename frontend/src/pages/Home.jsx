import React from 'react'
import Food from '../assets/Food.png'
import RecipeItems from '../components/recipeItems'
import { useNavigate } from 'react-router-dom';

export async function loader() {
  const response = await fetch('http://localhost:5001/recipe');
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
}

function Home() {
  const navigate = useNavigate();
  return (
    <>
        <section className='home'>
            <div className='left'>
                <h1>Food Recipe</h1>
                <h5>A food recipe app that helps you to make delicious food. It is a simple recipe app that helps you to make delicious food.</h5>
                <button onClick={()=>navigate("/addRecipe")}>Share your recipe</button>
            </div>
            <div className='right'>
                <img src={Food} width="320px" height="320px"></img>
            </div>
        </section>
        <div className='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,32L24,48C48,64,96,96,144,138.7C192,181,240,235,288,229.3C336,224,384,160,432,149.3C480,139,528,181,576,181.3C624,181,672,139,720,117.3C768,96,816,96,864,117.3C912,139,960,181,1008,202.7C1056,224,1104,224,1152,213.3C1200,203,1248,181,1296,181.3C1344,181,1392,203,1416,213.3L1440,224L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
        </div>
        <div className='recipe'>
          <RecipeItems/>
        </div>
    </>
  )
}

export default Home