const path = require('path'); // built in, no need to install
const express = require('express');

const publicFolderPath =  path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicFolderPath));

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
