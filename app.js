const express = require("express");
const morgan = require("morgan");

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/error')

const myAnimeListRouter = require("./routes/myAnimeList");

const app = express();

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware!!!");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use("/api/myanimelist", myAnimeListRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
});

app.use(globalErrorHandler);

module.exports = app;
