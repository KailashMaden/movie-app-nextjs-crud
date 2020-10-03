import React from 'react';
import Modal from './modal';
import MovieCreateForm from './movieCreateForm';
import { createMovie } from '../actions';
import { useRouter } from 'next/router';

function sideMenu(props) {
  const { categories, appName } = props;
  const router = useRouter();
  let modal = null;

  // getting form data from movieCreateForm.jsx component and -
  // sending received data to createMovie function in index.js
  const handleCreateMovie = (movie) => {
    createMovie(movie).then((movies) => {
      //Close modal after create
      modal.closeModal();
      // refreshing the page for rendering fresh values from server
      router.push('/');
    });
  };
  return (
    <div>
      {/* Containment */}
      <Modal ref={(element) => (modal = element)} hasSubmit={false}>
        <MovieCreateForm handleFormSubmit={handleCreateMovie} />
      </Modal>
      <h1 className="my-4">{appName}</h1>
      <div className="list-group">
        {categories.map((c) => (
          <a
            onClick={() => props.changeCategory(c.name)}
            href="#"
            className={`list-group-item ${
              props.activeCategory === c.name ? 'active' : ''
            }`}
            key={c.id}
          >
            {c.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default sideMenu;
