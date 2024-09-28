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
        <div className={styles.task__content} onClick={() => props.onEdit(props.task)}>
            <div className={styles.task}>
                <strong>{props.number}. {props.task.title}</strong>
                <div>
                    {props.task.body}
                </div>
            </div>
        </div>
    )
}

export default TaskItem;