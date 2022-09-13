import React, { useState, useEffect} from "react";
import './App.css'
import "./MovieCard";
import MovieCard from "./MovieCard";

//c728dd20
const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=c728dd20`;


const App = () => {
    const [movies,setMovies]= useState([]);
    const [searchterm, setsearch]= useState()

    let handlersearch = (e) => {
      setMovies(e.target.value);
    }



    useEffect(()=>{
     const searchMovies = async(title)=> {
       const response = await fetch(`${API_URL}&s=${title}`);
       const data = await response.json();
       setMovies(data.Search);
       console.log(data);
     }
     searchMovies()
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
               //onClick={()=> searchMovies()}
                onClick={handlersearch}
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


import React, { useState } from "react";
import { useEffect } from "react";
import { Card } from 'semantic-ui-react'
//import axios from 'react';
import './App.css'
//import "./MovieCard";
//import MovieCard from "./MovieCard";

//c728dd20
const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=c728dd20`;


const App = () => {
    const [movies,setMovies]= useState([]);
    const [searchterm, setsearch]= useState('')
    const [filteredResults, setFilteredResults] = useState([]);

   // let handlersearch = (e) => {
     // setMovies(e.target.value);
   // }
   const searchItems = (searchValue) => {
    setsearch(searchValue)
    if (searchterm !== '') {
        const filteredData = movies.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchterm.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(movies)
    }
}

    useEffect( () =>{
     const searchMovies = async(title)=> {
       const response = await fetch(`${API_URL} &s=${title}`);
       const data = await response.json();
       setMovies(data.Search);
       console.log(data);
     }
     searchMovies()
    },[]);
   
    
    return(
        <div className="app">
            <h1>Movie</h1>
            <div className="search">
                <input
                placeholder="searchmovies"
                value={searchterm}
                onChange={(e)=> searchItems(e.target.value)}
                >
                </input>
            </div>
           
            <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
                {searchterm.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>{item.title}</Card.Header>
                                    <Card.Description>
                                        {item.year}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                ) : (
                    movies.map((item) => {
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>{item.title}</Card.Header>
                                    <Card.Description>
                                        {item.year}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                )}
            </Card.Group>
        </div>
      

    );
}
export default App;
