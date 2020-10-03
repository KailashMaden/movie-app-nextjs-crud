import React, { Component } from 'react';
import Link from 'next/link';

class MovieList extends Component {
  shorten = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substr(0, maxLength) + '...';
    }
    return text;
  };
  render() {
    const { movies } = this.props;
    return (
      <>
        {movies.map((movie) => (
          <div key={movie.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <Link href="/movies/[id]" as={`/movies/${movie.id}`}>
                <a>
                  <img className="card-img-top" src={movie.image} alt="" />
                </a>
              </Link>
              <div className="card-body">
                <h4 className="card-title">
                  <Link href="/movies/[id]" as={`/movies/${movie.id}`}>
                    <a>{movie.name}</a>
                  </Link>
                </h4>
                <div className="movie-genre font-italic font-weight-bold text-capitalize">
                  {movie.genre}
                </div>
                <p className="card-text">
                  {this.shorten(movie.description, 200)}
                </p>
              </div>
              <div className="card-footer">
                <small className="text-muted">{movie.rating}</small>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default MovieList;