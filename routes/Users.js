const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../Model/User");
const Form = require("../Model/Uwong");
users.use(cors());

process.env.SCRET_KEY = "secret";

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  };
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + " registered!" });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User alredy exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (users) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          };
          let token = jwt.sign(payload, process.env.SCRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        } else {
          res.json({ error: "User does not exist" });
        }
      } else {
        res.json({ error: "User does not exist" });
      }
    })
    .catch(err => {
      res.send("err" + err);
    });
});
users.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  const Uwongdata = {
    nama: req.body.nama,
    umur: req.body.umur,
    sekolah: req.body.sekolah,
    alamat: req.body.alamat,
    jurusan: req.body.jurusan
  };
  Form.findByIdAndUpdate(id, Uwongdata)
    .then(user => {
      res.json({ status: " sampun lur" });
    })
    .catch(err => {
      res.send("error" + err);
    });
});
users.delete("/hapus/:id", (req, res) => {
  const id = req.params.id;
  const Uwongdata = {
    nama: req.body.nama,
    umur: req.body.umur,
    sekolah: req.body.sekolah,
    alamat: req.body.alamat,
    jurusan: req.body.jurusan
  };
  Form.delete(id, Uwongdata)
    .then(user => {
      res.json({ status: " sampun lur" });
    })
    .catch(err => {
      res.send("error" + err);
    });
});
users.get("/input", (req, res) => {
  Form.find()
    .then(user => {
      res.json({ data: user });
    })
    .catch(err => {
      res.send("error" + err);
    });
});
users.get("/profile", (req, res) => {
  var decoded = jwt.verify(req.headers["authorization"], process.env.SCRET_KEY);
  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send("user does not exist");
      }
    })
    .catch(err => {
      res.send("error" + err);
    });
});

users.post("/form", function(req, res) {
  const Uwongdata = {
    nama: req.body.nama,
    umur: req.body.umur,
    sekolah: req.body.sekolah,
    alamat: req.body.alamat,
    jurusan: req.body.jurusan
  };
  Form.create(Uwongdata)
    .then(user => {
      res.json({ status: " sampun lur" });
    })
    .catch(err => {
      res.send("error" + err);
    });
});
module.exports = users;
