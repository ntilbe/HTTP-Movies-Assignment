import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <h3 className="saved-movie">{movie.title}</h3>
          </NavLink>
        );
      })}

    </div>
  );
}

export default SavedList;