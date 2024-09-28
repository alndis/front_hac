import React from "react";
import MyButton from "./UI/button/MyButton.jsx";
import styles from './UI/TaskItem.module.css';

const TaskItem = (props) =>{
    if (!props.task.id) {
        return (
            <div className={styles.task__content} onClick={props.onClick}>
                <div className={styles.new__task}>
                    <strong>Создать новую задачу</strong>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.task__content}>
            <div className={styles.task}>
                <strong>{props.number}. {props.task.title}</strong>
                <div>
                    {props.task.body}
                </div>
            </div>
            <div className={styles.task__btn}>
            <MyButton onClick={() => {
                 props.remove(props.task.id)
                }} className={styles.btn}>Удалить</MyButton>
            </div>
        </div>
    )
}

export default TaskItem;