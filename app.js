const { request, response } = require('express');
const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const app = express();

app.use(express.json());

const getAllTours = (request, response) => {
  // throught response we can send message back
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

const postTour = (request, response) => {
  const tourId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: tourId }, request.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (er) => {
      response.status(201).json({
        status: 'Success!',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getTour = (request, response) => {
  const id = +request.params.id;

  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return response.status(404).json({
      status: 'Not found:((((',
    });
  }
  response.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const editTour = (request, response) => {
  const newTours = tours.filter((tour) => tour.id !== +request.params.id);
  newTours.push(request.body);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    (er) => {
      response.status(200).json({
        status: 'success',
        data: {
          newTours,
        },
      });
    }
  );
};
const deleteTour = (request, response) => {
  console.log(request.body);
  const newTours = tours.filter((tour) => tour.id !== +request.params.id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    (er) => {
      response.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', postTour);
// app.get('/api/v1/tours/:id/:x?', getTour);
// app.patch('/api/v1/tours/:id', editTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(postTour);
app.route('/api/v1/tours/:id').get(getTour).patch(editTour).delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// const { request, response } = require('express');
// const express = require('express');
// const fs = require('fs');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );
// const app = express();

// app.use(express.json());

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', postTour);
// app.get('/api/v1/tours/:id/:x?', getTour);
// app.patch('/api/v1/tours/:id', editTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// const port = 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}`);
// });
