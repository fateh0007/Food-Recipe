import { useState } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import AddFoodRecipe from './pages/AddFoodRecipe'

const getAllRecipes = async () => {
  try {
    const response = await axios.get('http://localhost:5001/recipe');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

const router = createBrowserRouter([
  {path:'/',element:<MainNavigation/>,children:[
    {path: '/', element: <Home />,loader: getAllRecipes},
    {path: '/myRecipe', element: <Home/>},
    {path: '/favRecipe', element: <Home/>},
    {path: '/addRecipe', element: <AddFoodRecipe/>},
  ]}
  
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
