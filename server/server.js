const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public'); //current dir/../public
const port = process.env.PORT || 3000; //use the heroku set port if available

app.use(express.static(publicPath));

app.get('*', (request, response) => { // * all unmatched routes
  response.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up');
});
