// const express = require("express");
// const nodemailer = require("nodemailer");
// const ejs = require("ejs");
// const mailRouter = express.Router();

// // transporter.verify((err, success) => {
// //   err
// //     ? console.log(err)
// //     : console.log(`=== Server is ready to take messages: ${success} ===`);
// // });

// mailRouter.post("/send-mail", async (req, res) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: process.env.EMAIL,
//       pass: process.env.WORD,
//       clientId: process.env.OAUTH_CLIENTID,
//       clientSecret: process.env.OAUTH_CLIENT_SECRET,
//       refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//     },
//   });

//   var content = "";
//   content += `
//           <div style="padding: 10px; background-color: #003375">
//               <div style="padding: 10px; background-color: white;">
//                   <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
//                   <span style="color: black">Đây là mail test</span>
//               </div>
//           </div>
//       `;

//   let mailOptions = {
//     from: process.env.EMAIL,
//     to: req.body.email,
//     subject: "test subject",
//     text: "test message",
//     html: content,
//   };

//   transporter.sendMail(mailOptions, function (err, data) {
//     if (err) {
//       res.send(err.message);
//     } else {
//       console.log("== Message Sent ==");
//       res.send({ status: "success" });
//     }
//   });
// });

// module.exports = mailRouter;
