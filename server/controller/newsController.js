const News = require('../models/newsModel');
const fs = require('fs');
const path = require('path');

const registerNews = async (req, res) => {
  const {
    newsTitle,
    newsPhoto,
    newsDescription,
    newsTag,
    newsMetaTitle,
    newsMetaDescription,
  } = req.body;

  try {
    let news_number = 1;
    const newsOnDb = await News.findOne()
      .sort({ createdAt: -1 })
      .select('news_number');
    if (newsOnDb) {
      news_number = parseInt(newsOnDb.news_number) + 1;
    }

    const newNews = new News({
      newsTitle,
      newsPhoto: req.file.filename,
      newsDescription,
      newsTag,
      newsMetaTitle,
      newsMetaDescription,
      news_number,
    });

    await newNews.save();

    await res.status(201).json({
      news: newNews._id,
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getNews = async (req, res) => {
  try {
    const news = await News.find({});
    res.send({ data: news, status: 'success' });
  } catch (error) {
    res.send({ data: [], status: 'fail' });
  }
};

const updateNews = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Data to be updated cannot be empty.' });
  }

  const id = req.body.id;
  News.findByIdAndUpdate(id, req.body, { new: true })
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update news with the id of ${id}. Maybe order not found.`,
          status: 'fail',
        });
      } else {
        if (req.file) {
          const pathFile = path.join(__dirname, '../uploads', data.newsPhoto);
          fs.unlinkSync(pathFile);
          data.newsPhoto = req.file.filename;
          await data.save();
        }
        res.send({ data, status: 'success' });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: 'Error updating news information',
        status: 'fail',
      });
    });
};

const deleteNews = async (req, res) => {
  const id = req.body.id;

  News.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete with id: ${id}. Maybe the ID is wrong`,
          status: 'fail',
        });
      } else {
        res.status(200).send({
          message: 'Subject was deleted successfully!',
          status: 'success',
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Could not delete subject with id: ${id}`,
        status: 'fail',
      });
    });
};

module.exports = { registerNews, getNews, updateNews, deleteNews };
