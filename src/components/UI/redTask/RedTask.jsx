import React, { useState, useEffect } from "react";
import MyButton from "../button/MyButton.jsx";
import styles from './RedTask.module.css';

const RedTask = (props) => {
    const rootClasses = [styles.redTask]
    if (props.visible){
      rootClasses.push(styles.active);
    }

    const [title, setTitle] = useState(props.task && props.task.title);
    const [body, setBody] = useState(props.task && props.task.body);

    useEffect(() => {
        if (props.task) {
          setTitle(props.task.title);
          setBody(props.task.body);
        } else {
          setTitle('');
          setBody('');
        }
      }, [props.task]);
    
      if (!props.task) {
        return null;
      }
    const handleSave = () => {
        props.onSaveTask({ id: props.task.id, title, body });
        props.setVisible(false);
    };
    
    const handleDelete = () => {
        props.onDeleteTask(props.task.id);
        props.setVisible(false);
    };

    return (
        <div className={rootClasses.join(" ")} onClick={() => props.setVisible(false)}>
          <div className={styles.redTaskContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.redTask__header}>
              <h2>Редактировать задачу</h2>
            </div>
            <div className={styles.redTask__body}>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название задачи" />
              <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Описание задачи" />
            </div>
            <div className={styles.redTask__footer}>
              <MyButton onClick={handleSave}>Сохранить</MyButton>
              <MyButton onClick={handleDelete}>Удалить</MyButton>
            </div>
          </div>
        </div>
      );
};

export default RedTask;