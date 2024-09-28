import React, { useState } from "react";
import './styles/App.css';
import TaskItem from "./components/TaskItem.jsx";
import MyButton from "./components/UI/button/MyButton.jsx";
import Modal from "./components/UI/modal/Modal.jsx";
import Image from "./components/UI/img/Image.jsx";
import NewTaskModal from "./components/UI/newTask/NewTaskModal.jsx";

function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: "Название задачи 1", body:"Описание задачи"},
    {id: 2, title: "Название задачи 2", body:"Описание задачи"},
    {id: 3, title: "Название задачи 3", body:"Описание задачи"},
    {id: 4, title: "Название задачи 4", body:"Описание задачи"},
  ])
  const maxTasks = 4;

  const [showAll, setShowAll] = useState(false);
  const [modal, setModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [newTaskModal, setNewTaskModal] = useState(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const removeTask = (taskId) =>{
    console.log('Удаляем задачу с id:', taskId)
    setTasks([...tasks.filter(t => t.id !== taskId)])
  }

  const onCreateTask = (task) => {
    setTasks([task, ...tasks]);
    setNewTaskModal(false);
  };

  return (
    <div className="App">
      <div className="head">
        <h1>ZOV</h1>
        {isAuthorized ? (
          <MyButton onClick={() => setIsAuthorized(false)}>Выйти</MyButton>
        ) : (
          <MyButton onClick={() => setModal(true)}>Регистрация</MyButton>
        )}
      </div>
      <Modal visible={modal} setVisible={setModal} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />
      <NewTaskModal visible={newTaskModal} setVisible={setNewTaskModal} onCreateTask={onCreateTask} />
      <div>
      {showAll ? (
          <MyButton onClick={handleShowAll}>Скрыть все</MyButton>
        ) : (
          <MyButton onClick={handleShowAll}>Показать все</MyButton>
        )}
      </div>
      {isAuthorized ? (
        <div className="tasks__fiels">
          {showAll ? (
            tasks.map((task) => {
              return <TaskItem remove={removeTask} task={task} key={task.id} />;
            })
          ) : (
            tasks.slice(0, maxTasks).map((task, index) => {
              return <TaskItem remove={removeTask} number={index+1} task={task} key={task.id} />;
            })
          )}
          <TaskItem
          task={{ id: null, title: "Создать новую задачу", body: "" }}
          onClick={() => setNewTaskModal(true)}/>
        </div>
      ) : (
        <Image />
      )}
    </div>
  );
}

export default App;