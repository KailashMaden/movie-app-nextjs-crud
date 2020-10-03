const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// for creating json file to add in api
const filePath = './data.json';
const fs = require('fs');
const path = require('path');
const moviesData = require(filePath);

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  // api endpoints
  server.get('/api/v1/movies', (req, res) => {
    return res.json(moviesData);
  });

  // get movies by id
  server.get('/api/v1/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = moviesData.find((m) => m.id === id);

    return res.json(movie);
  });
  

  //for adding movies in the server
  server.post('/api/v1/movies', (req, res) => {
    // todo: add id
    const movie = req.body;
    moviesData.push(movie);

    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(moviesData, null, 2);

    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json('Movie has been successfully added!');
    });

    // return res.json({ ...movie, createdTime: 'today', author: 'kailash' });
  });


  // for updating movies in the server
  server.patch('/api/v1/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = req.body;
    const movieIndex = moviesData.findIndex((m) => m.id === id);

    moviesData[movieIndex] = movie;

    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(moviesData, null, 2);

    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(movie);
    });
  });


  // for delete
  server.delete('/api/v1/movies/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = moviesData.findIndex((m) => m.id === id);

    moviesData.splice(movieIndex, 1);

    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(moviesData, null, 2);

    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json('Movie has been deleted');
    });
  });

  // sending as respond html file to client
  // server.get('/faq', (req, res) => {
  //   return res.send(`<html><head></head><body>Hello World</body></html>`);
  // });

  // we are handling all of the request coming to our server
  server.get('*', (req, res) => {
    // next.js is handling requests and providing pages where
    // we are navigating to
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  // server middleware
  server.use(handle).listen(PORT, (err) => {
    if (err) throw err;
    console.log('> Ready on port ' + PORT);
  });
});
