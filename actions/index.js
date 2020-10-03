// const MOVIE_DATA = [
//   {
//     id: '1',
//     name: 'The Shawshank Redemption',
//     releaseYear: 1994,
//     description:
//       'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
//     longDesc:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
//     rating: 4.8,
//     genre: 'drama',
//     image:
//       'https://m.media-amazon.com/images/M/MV5BNjQ2NDA3MDcxMF5BMl5BanBnXkFtZTgwMjE5NTU0NzE@._V1_CR0,60,640,360_AL_UX477_CR0,0,477,268_AL_.jpg',
//     cover: 'img/super.jpg',
//   },
//   {
//     id: '2',
//     name: 'The Dark Knight',
//     releaseYear: 2008,
//     description:
//       'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
//     longDesc:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
//     rating: 4.7,
//     genre: 'action, crime, drama',
//     image:
//       'https://img.cinemablend.com/filter:scale/quill/c/3/8/0/f/4/c380f4f12cfeec19f0c40c6f57db188f2f98cca8.jpg?mw=600',
//     cover: 'img/batman.jpg',
//   },
// ];

import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const MOVIE_DATA = [];

const CATEGORY_DATA = [
  { id: 'c-0', name: 'all' },
  { id: 'c-1', name: 'drama' },
  { id: 'c-2', name: 'action' },
  { id: 'c-3', name: 'adventure' },
  { id: 'c-4', name: 'historical' },
  { id: 'c-5', name: 'music' },
];

// 1.getCategories function
// 2. get categories in index page
// 3. provide categories to sidemenu
// 4. in sidemenu iterate categories and display then

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(CATEGORY_DATA);
      //reject('Cannot fetch data!')
    }, 50);
  });
};

export const getMovies = () => {
  //from the built server
  return axios.get(`${BASE_URL}/api/v1/movies`).then((res) => {
    return res.data; //returning the data to pages/index.jsx function Home.getInitialProps
  });

  //from the local create data store
  // //create async functionality
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(MOVIE_DATA);
  //     //reject('cannot fetch data!')
  //   }, 200);
  // });
};

// getting data from the form (i.e defined in sideMenu.jsx component) and pushing data in data store
export const createMovie = (movie) => {
  movie.id = Math.random().toString(36).substr(2, 5);
  return axios.post(`${BASE_URL}/api/v1/movies`, movie).then((res) => {
    return res.data;
  });

  // return new Promise((resolve, reject) => {
  //   //create ID for movie
  //   movie.id = Math.random().toString(36).substr(2, 7);
  //   MOVIE_DATA.push(movie);
  //   setTimeout(() => {
  //     resolve(MOVIE_DATA);
  //   }, 50);
  // });
};

export const getMovieById = (id) => {
  return axios.get(`${BASE_URL}/api/v1/movies/${id}`).then((res) => {
    return res.data;
  });
};

export const updateMovie = (movie) => {
  return axios
    .patch(`${BASE_URL}/api/v1/movies/${movie.id}`, movie)
    .then((res) => res.data);
};

export const deleteMovie = (id) => {
  return axios.delete(`${BASE_URL}/api/v1/movies/${id}`).then((res) => {
    return res.data;
  });
};

export const getPosts = () => {
  return axios.get(`${BASE_URL}/api/v1/posts`).then((res) => {
    return res.data;
  });
};
