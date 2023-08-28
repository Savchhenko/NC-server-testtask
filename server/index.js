const express = require('express');
 
const PORT = 3010; //process.env.PORT
const app = express();
 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});