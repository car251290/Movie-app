import React, { useState } from "react";
import { useEffect } from "react";
import './App.css'
import "./MovieCard";
import MovieCard from "./MovieCard";

//c728dd20
const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=c728dd20`;


const App = () => {
    const [movies,setMovies]= useState([]);
    const [searchterm, setsearch]= useState()

    useEffect(()=>{
     const searchMovies = async(title)=> {
       const response = await fetch(`${API_URL}&s=${title}`);
       const data = await response.json();
       setMovies(data.Search);
       console.log(data);
     }
     searchMovies('Batman')
    },[]);
   
    
    return(
        <div className="app">
            <h1>Movie</h1>
            <div className="search">
                <input
                placeholder="searchmovies"
                value={searchterm}
                onChange={(e)=> setsearch(e.target.value)}
                >
                </input>
                <img 
                alt='search'
               // onClick={()=> searchMovies(searchterm)}
                
                />
            </div>
           
            {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
      
        </div>
      

    );
}

export default App;
