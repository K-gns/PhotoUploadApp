import express from "express";
import ViteExpress from "vite-express";
import multer from 'multer'
import * as fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors())

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React + Дима!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);

const upload = multer({ dest: './images/' })

// app.use('/images', express.static('images'))
app.get('/images/:imageName', (req, res) => {

  const imageName = req.params.imageName
  const readStream = fs.createReadStream(`images/${imageName}`)
  readStream.pipe(res)
})

app.post('/api/images', upload.single('image'), (req, res) => {
  const imageName = req.file.filename
  const description = req.body.description

  // Save this data to a database probably

  let imgUrl = "/images/" + imageName;
  res.status(200).json({redirectUrl: imgUrl })
})

app.listen(8080, () => console.log("listening on port 8080"))
