import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import cl from './EnterModal.module.css'

const EnterModal = ({ visible, setVisible, isAuthorized, setIsAuthorized }) => {
    const rootClasses = [cl.modal]
  if (visible){
    rootClasses.push(cl.active);
  }
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', {
      login: login,
      password: password,
    })
    .then(response => {
      const token = response.data.token;
      const storedToken = localStorage.getItem('token');
      if (token === storedToken) {
        setIsAuthorized(true);
        setVisible(false);
      } else {
        setError('Неправильный логин или пароль');
      }
    })
    .catch(error => {
      setError('Ошибка входа. Сервер не отвечает.');
      setTimeout(() => {
        handleClose(); // закрываем модальное окно после успешной регистрации
      }, 2000);
    });
  };

  if (!visible) return null;

  return (
    <div className={rootClasses.join(" ")} onClick={handleClose}>
      <div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Логин:
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
          </label>
          <label>
            Пароль:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default EnterModal;