const mongoose = require("mongoose")
import AlbumSchema from "./album"

const ArtistSchema = mongoose.Schema({
  name: String,
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retired: Boolean,
  albums: [AlbumSchema],
})

module.exports = mongoose.model("artist", ArtistSchema)
