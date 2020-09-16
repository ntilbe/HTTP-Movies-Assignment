import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie'
import AddMovie from './Movies/AddMovie'
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

    console.log(movieList)
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>

      <SavedList list={savedList} />
        
        <div className='navigation'> 
      <Link to="/">
      <button>
        Home
      </button></Link>
      <Link to="/add-movie">
      <button>
        Add Movie
      </button></Link>
        </div>

      <Route exact path="/">
        <MovieList movies={movieList} addToSavedList={addToSavedList} setMovieList={setMovieList}/>
      </Route>


      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList={setMovieList} movies={movieList}/>
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateMovie movies = {movieList} setMovieList={setMovieList}/>
      </Route>

      <Route path='/add-movie'>
        <AddMovie/>
      </Route>
    </>
  );
};

export default App;