# Тестовое задание
## Приложение, состоящее из формы аутентификации/регистрации

Фронтенд: **React.js** (вёрстка и стили - MUI React)
Бэкенд: **Express.js**

Дополнительные модули: 
- react-router-dom
- body-parser
- cors

### Для запуска приложения необходимо
- ***находясь в каталоге server запустить команды:***
### `npm i`
### `npm start`
Запустится сервер на http://localhost:3010

- ***находясь в каталоге client запустить команды:***
### `npm i`
### `npm start`
Запустится в браузере приложение на http://localhost:3000

### Функционал:
- Аутентификация пользователя при клике на кнопку "Войти",
если вернётся true с сервера, произойдет переход на страницу /welcome, иначе отбивка о неверных данных
- Регистрация пользователя при клике на кнопку "Зарегистрироваться"
(после этого можно проверить и нажать кнопку "Войти")
- Хранение зарегистрированных пользователей в ОЗУ
