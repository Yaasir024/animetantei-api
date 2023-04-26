const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const animeListScraper = require("./../scrapers/myanimelist");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const url = "https://myanimelist.net/news";

exports.getAllNews = catchAsync(async (req, res, next) => {
  let page = req.query.page || 1;
  const news = await animeListScraper.scrapeNews(page);

  res.status(200).json({
    status: "success",
    data: {
      news,
    },
  });
});
