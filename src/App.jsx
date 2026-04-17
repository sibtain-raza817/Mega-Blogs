

import { useState, useEffect } from 'react';
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth"

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);
  
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch()
  return (
    <>
      <h1>A blog with appwrite</h1>
    </>
  )
}

export default App
