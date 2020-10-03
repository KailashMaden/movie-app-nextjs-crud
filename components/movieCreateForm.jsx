import React, { useState, useEffect } from 'react';

const MovieCreateForm = (props) => {
  //fix uncontrolled data!
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

  const defaultData = {
    name: '',
    description: '',
    rating: '',
    image: '',
    cover: '',
    longDesc: '',
  };

  const formData = props.initialData ? { ...props.initialData } : defaultData;

  const [form, setForm] = useState(formData);

  // useEffect(() => {
  //   if (props.initialData) {
  //     setForm(props.initialData);
  //     setIsInitialDataLoaded(true);
  //   }
  // }, [isInitialDataLoaded]);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    setForm({
      ...form,
      [name]: target.value,
    });
  };

  // selecting from selectbox and handling using useState
  const handleGenreChange = (e) => {
    const { options } = e.target;
    const optionsLength = options.length;
    let value = [];

    for (let i = 0; i < optionsLength; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setForm({
      ...form,
      genre: value.toString(),
    });
  };

  // sending form data to the handleCreateMoive fucntion -
  // in sideMenu.jsx component
  const submitForm = () => {
    //call here function to create movie from props
    props.handleFormSubmit({ ...form });
  };
  return (
    <form>
      {/* {JSON.stringify(form)} */}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          onChange={handleChange}
          value={form.name}
          name="name"
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          placeholder="Movie Title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          onChange={handleChange}
          value={form.description}
          name="description"
          type="text"
          className="form-control"
          id="description"
          placeholder="Some Description about Movie"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Rating</label>
        <input
          onChange={handleChange}
          value={form.rating}
          name="rating"
          type="number"
          max="5"
          min="0"
          className="form-control"
          id="rating"
          placeholder="Movie rating"
        />
        <small id="emailHelp" className="form-text text-muted">
          Max: 5, Min: 0{' '}
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          onChange={handleChange}
          value={form.image}
          name="image"
          type="text"
          className="form-control"
          id="image"
          placeholder="http://....."
        />
      </div>
      <div className="form-group">
        <label htmlFor="cover">Cover</label>
        <input
          onChange={handleChange}
          value={form.cover}
          name="cover"
          type="text"
          className="form-control"
          id="cover"
          placeholder="http://......"
        />
      </div>
      <div className="form-group">
        <label htmlFor="longDesc">Long Description</label>
        <textarea
          onChange={handleChange}
          className="form-control"
          id="longDesc"
          rows="3"
          value={form.longDesc}
          name="longDesc"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <select
          onChange={handleGenreChange}
          multiple
          className="form-control"
          id="genre"
        >
          <option>drama</option>
          <option>music</option>
          <option>adventure</option>
          <option>historical</option>
          <option>action</option>
        </select>
      </div>
      <button type="button" className="btn btn-primary" onClick={submitForm}>
        {props.submitButton || 'Create'}
      </button>
    </form>
  );
};

export default MovieCreateForm;
