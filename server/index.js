const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./db/db.js'); //данные пользователей из "базы данных"
 
const PORT = 3010;
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
  console.log(`Сервер запущен на ${PORT}`);
  console.log('Существующие пользователи: ', users);
});

//проверяет существует ли пользователь с такими данными
const checkUserIsRegistered = ({ login, password }) => {
  let isRegistered = null;
  const user = users.find((user) => user.login === login && user.password === password);
  user ? isRegistered = true : isRegistered = false;

  return isRegistered;
}

//регистрация нового пользователя 
const registerNewUser = ({ login, password }) => {
  users.push({ login, password });
  console.log('users: ', users);

  return true;
}

//маршрут аутентификации
app.post('/is_user', (req, res) => {
  let data = req.body;
  res.send({ status: "200", data: checkUserIsRegistered(data) });
});

//маршрут регистрации нового пользователя
app.post('/registration', (req, res) => {
  let data = req.body;
  res.send({ status: "200", data: registerNewUser(data) });
});
