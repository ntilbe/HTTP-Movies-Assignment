import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const MovieCard = props => {
  const history = useHistory()

  const { movie, saveMovie } = props

  const navigateToMovie = (e) => {
    
    history.push(`/movies/${movie.id}`)}

  const clickEdit = (e) => {
    e.stopPropagation()
    history.push(`/update-movie/${movie.id}`) 
    
  }

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((res) => {
        props.setMovieList(res.data);
        history.push("/");
        // afternoon project
        // server returns the id of the deleted item
        // you will have to filter out that item from the item list
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="movie-card" onClick={navigateToMovie}>
      <h2>{movie.title}</h2>
      <div className="movie-director">
        Director: <em>{movie.director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{movie.metascore}</strong>
      </div>
      <h3>Actors</h3>

      {movie.stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <div className='card-buttons'>
      <button 
      className='edit-button'
      onClick={clickEdit}
      >
      Edit
      </button>
          <button onClick={saveMovie}>
          Save
        </button>
        <button onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;