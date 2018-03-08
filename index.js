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
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", upload, async (req, res) => {
  await gm(req.file.path)
    .resize(240, 240)
    .noProfile()
    .write(`uploads/resized-${req.file.filename}`, err => {
      if (!err) console.log("done");

      res.json({ url: `uploads/resized-${req.file.filename}` });
    });

  /* Note: I previously rendered another pug file ('result') to output the modified img file, but took the above approach with using fetch and returning json to dynamically fill an empty img element */

  // await res.render("result", {
  //   resultImg: `uploads/resized-${req.file.filename}`
  // });
});

app.listen(3000, () => console.log("Listening on 3000"));
