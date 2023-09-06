import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function SignIn() {
  const [fieldError, setFieldError] = useState(false);

  //отправка данных на сервер для аутентификации пользователя
  const sendUserData = async (data) => {
    const response = await fetch('http://localhost:3010/is_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const res = await response.json();

    if (response.status !== 200) {
      throw Error(res.message)
    }
    return res;
  };

  //отправка данных на сервер для регистрации пользователя
  const registerUser = async (data) => {
    const response = await fetch('http://localhost:3010/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const res = await response.json();

    if (response.status !== 200) {
      throw Error(res.message)
    }
    return res;
  }

  //получение данных из формы
  const getFormData = (event) => {
    const formElement = event.currentTarget.closest('form');
    let data = new FormData(formElement);
    data = {
      login: data.get('login'),
      password: data.get('password'),
    };
    console.log('formData: ', data);

    return data;
  }

  //обработка клика по кнопке Войти
  const logInClickHandler = (event) => {
    event.preventDefault();
    const data = getFormData(event);

    sendUserData(data)
    .then(res => {
      console.log('res.isRegistered: ', res.data);
      if (res.data) {
        setFieldError(false);
        window.location.href = 'http://localhost:3000/welcome';
      } else {
        setFieldError(true);
      }
    })
    .catch(err => console.log(err));
  };

  //обработка клика по кнопке Зарегистрироваться
  const registerClickHandler = (event) => {
    event.preventDefault();
    const data = getFormData(event);

    registerUser(data)
    .then(res => {
      setFieldError(false);
      console.log('res.isSuccessfullyRegistered: ', res.data);
    })
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              error={fieldError}
              {...(fieldError && { helperText: 'Неверные данные' })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              error={fieldError}
              {...(fieldError && { helperText: 'Неверные данные' })}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '3vh'
              }}>
              <Button 
                onClick={ logInClickHandler }
                type="submit" 
                variant="contained"
              >
                Войти
              </Button>
              <Button 
                onClick={ registerClickHandler }
                type="submit" 
                variant="contained"
              >
                Зарегистрироваться
              </Button>
            </Box>

          </Box>
        </Box>
      </Container>
  );
}