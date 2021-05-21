// //https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client/48926919
// const multer = require("multer");
// const express = require("express");
// const { isAuth } = require("../utils");

// const uploadRouter = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

// const upload = multer({ storage });

// uploadRouter.post("/", upload.single("image"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

// module.exports = uploadRouter;
