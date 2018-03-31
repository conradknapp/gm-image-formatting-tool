const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage }).single("fileImg");

app.set("views", "./views");
app.set("view engine", "pug");

app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "text/html", "text/event-stream");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", upload, async (req, res) => {
  const width = req.body.width || 250;
  const height = req.body.height || 250;

  const readStream = fs.createReadStream(req.file.path);
  await gm(readStream)
    .resizeExact(width, height)
    .stream((err, stdout, stderr) => {
      const writeStream = fs.createWriteStream(
        `uploads/${Date.now()}-${req.file.filename}`
      );
      stdout.pipe(res);
    });
});

app.listen(3000, () => console.log("Listening on 3000"));
