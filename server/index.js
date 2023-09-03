const express = require('express');
const bodyParser = require('body-parser');
 
const PORT = 3010; //process.env.PORT
const app = express();
 
const urlencodedParser = express.urlencoded({extended: false});
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   console.log(`${req.method} ${req.url}`);
//   next();
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post('/is_user', (req, res) => {
  let data = req.body;
  console.log('data: ', JSON.stringify(data));
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT', status: "200", data: `Data Received: ${JSON.stringify(data)}` });
});

