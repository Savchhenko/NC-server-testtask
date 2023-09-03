const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./db/db.js');
 
const PORT = 3010; // TODO создать process.env.PORT
const app = express();
 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log('users: ', users);
});

const checkUserIsRegistered = ({ login, password }) => {
  let isRegistered = null;
  const user = users.find((user) => user.login === login && user.password === password);
  user ? isRegistered = true : isRegistered = false;

  return isRegistered;
}

app.post('/is_user', (req, res) => {
  let data = req.body;
  
  console.log(checkUserIsRegistered(data));
  res.send({ status: "200", data: checkUserIsRegistered(data) });
});

