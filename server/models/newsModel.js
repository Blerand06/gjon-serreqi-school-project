const mongoose = require('mongoose');

const newsSchema = mongoose.Schema(
  {
    newsTitle: {
      type: String,
      required: true,
    },
    newsPhoto: {
      contentType: String,
      data: Buffer,
    },
    newsDescription: {
      type: String,
      required: true,
    },
    newsTag: {
      type: String,
      required: true,
    },
    newsMetaTitle: {
      type: String,
      required: true,
    },
    newsMetaDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const News = mongoose.model('News', newsSchema);

module.exports = News;
