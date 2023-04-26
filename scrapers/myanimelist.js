const axios = require("axios");
const cheerio = require("cheerio");

const baseUrl = "https://myanimelist.net/news";
const AppError = require('./../utils/appError')

exports.scrapeNews = async (page) => {
  let url = `${baseUrl}?p=${page}` ;

  const articles = [];
  await axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      $(".news-unit", html).each(function () {
        // $(this).text()
        let title = $(this).find(".title").text();
        title = title.trim().replace(/\n/g, "");
        const url = $(this).find(".image-link").attr("href");
        const imgSrc = $(this).find(".image").attr("src");

        articles.push({
          title,
          url,
          imgSrc,
        });
      });
    })
    .catch((err) => {
      throw new AppError(`Oops! Something went wrong.`, 404)
    });
    return articles;
};
