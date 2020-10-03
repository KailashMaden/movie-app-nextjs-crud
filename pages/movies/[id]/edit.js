import React from 'react';
import Router from 'next/router';
import { getMovieById, updateMovie } from '../../../actions';
import MovieCreateForm from '../../../components/movieCreateForm';

class EditMovie extends React.Component {
  static async getInitialProps({ query }) {
    const movie = await getMovieById(query.id);
    return { movie };
  }

  handleUpdateMovie = (movie) => {
    updateMovie(movie).then((updatedMoive) => {
      // refreshing the page for rendering fresh values from server
      Router.push('/movies/[id]', `/movies/${movie.id}`);
    });
  };

  render() {
    const { movie } = this.props;
    return (
      <div className="container">
        <h1>Edit the Movie</h1>
        <MovieCreateForm
          submitButton="Update"
          initialData={movie}
          handleFormSubmit={this.handleUpdateMovie}
        />
      </div>
    );
  }
}

export default EditMovie;
