const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.ATLAS_DB_URL

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err) => {
    if (err) {
      console.log('>>ERROR<<', err)
    }
  }
)
