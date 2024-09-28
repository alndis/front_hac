import React, { useState, useEffect, useCallback } from "react";
import cl from './modal.module.css'
import axios from 'axios';

const Modal = ({ children, visible, setVisible, isAuthorized, setIsAuthorized }) => {
  const rootClasses = [cl.newTaskModal]
  if (visible){
    rootClasses.push(cl.active);
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
    } else {
      setError(null); // сбрасываем ошибку, если пароли совпадают
      setSuccess(false); // сбрасываем сообщение об успешной авторизации
  
      // Send registration data to the server
      axios.post('/api/register', {
        username: username,
        password: password,
      })
      .then(response => {
        const token = response.data.token;
        // Store the token in local storage or cookies
        localStorage.setItem('token', token);
        console.log('Registration successful!');
        setSuccess(true); // выводим сообщение об успешной авторизации
        setIsAuthorized(true); // устанавливаем статус авторизации
        handleClose();
      })
      .catch(error => {
        setError('Ошибка регистрации. Сервер не отвечает.'); // выводим сообщение об ошибке
        console.error(error);
        setTimeout(() => {
          handleClose(); // закрываем модальное окно после успешной регистрации
        }, 2000);
      });
    }
  };

  useEffect(() => {
    if (visible) {
      setError(null); // сбрасываем ошибку при открытии модального окна
      setSuccess(false); // сбрасываем сообщение об успешной авторизации
    }
  }, [visible]);

  return (
    <div className={rootClasses.join(" ")} onClick={handleClose}>
      <div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Логин:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Пароль:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Повторите пароль:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {success && <div style={{ color: 'green' }}>Вы успешно авторизовались!</div>}
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;