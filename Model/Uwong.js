const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uwongSchema = new Schema({
  nama: {
    type: String,
    unique: false
  },
  umur: {
    type: Number,
    unique: false
  },
  sekolah: {
    type: String,
    unique: false
  },
  alamat: {
    type: String,
    unique: false
  },
  jurusan: {
    type: String,
    unique: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Uwong = mongoose.model("mars", uwongSchema);
