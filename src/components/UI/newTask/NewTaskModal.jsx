import React, { useState } from "react";
import cl from './newTaskModal.module.css'

const NewTaskModal = ({ visible, setVisible, onCreateTask }) => {
  const rootClasses = [cl.newTaskModal]
  if (visible){
    rootClasses.push(cl.active);
  }
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: title,
      body: body,
    };
    onCreateTask(newTask);
    setTitle('');
    setBody('');
  };

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div className={cl.newTaskModalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Создать новую задачу</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Название задачи:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Описание задачи:
            <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </label>
          <button type="submit">Создать задачу</button>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;