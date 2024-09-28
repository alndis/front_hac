import React, { useState, useEffect} from "react";
import cl from './modal.module.css'
const Modal = ({children, visible, setVisible, isAuthorized, setIsAuthorized  }) => {
  const rootClasses = [cl.modal]
  if (visible){
    rootClasses.push(cl.active);
  }

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
    } else {
      setError(null); // сбрасываем ошибку, если пароли совпадают
      setSuccess(true); // выводим сообщение об успешной авторизации
      setIsAuthorized(true); // устанавливаем статус авторизации
      // Здесь можно отправить форму на сервер
      console.log('Форма отправлена');
    }
  };

  useEffect(() => {
    if (visible) {
      setError(null); // сбрасываем ошибку при открытии модального окна
      setSuccess(false); // сбрасываем сообщение об успешной авторизации
    }
  }, [visible]);

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Логин:
            <input type="text" />
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