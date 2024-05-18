import React, { useState } from 'react';
import './Form.css';
import SingupButton from './SingupButton';
import LoginButton from './LoginButton';

function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Функция для отправки данных на сервер
  const saveUserData = async (userData) => {
    try {
      const response = await fetch('http://68.183.74.14:4005/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('User registered:', data);
        // Если необходимо, можно добавить логику для перехода на другую страницу или обновления состояния
      } else {
        setErrorMessage(`Ошибка: ${data.message || 'Не удалось зарегистрировать пользователя'}`);
      }
    } catch (error) {
      setErrorMessage(`Ошибка: ${error.message || 'Не удалось зарегистрировать пользователя'}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Введите имя пользователя и пароль!');
      return; // Остановка отправки формы
    }
    // Ваша логика аутентификации здесь
    const userData = { username, password };
    saveUserData(userData);
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className='login-form'>
      <div className='number'></div>
      <div className='registration'>
        <h3> Login Form </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='username-holder'>
          <label htmlFor="Username">User:</label><br />
          <input
            className='input-field'
            placeholder='User'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='password-holder'>
          <label htmlFor="password">Password:</label><br />
          <input
            className='input-field'
            placeholder='Enter your password...'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='btn-container'>
          <div className='btn-log'> <LoginButton/></div>
          <div className='btn-sing'><SingupButton /></div>
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      </form>
    </div>
  );
}

export default Form;
