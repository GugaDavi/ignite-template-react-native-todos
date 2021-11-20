import React, { useState } from "react";
import { Alert, AlertButton, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find((i) => i.title === newTaskTitle);

    if (taskAlreadyExists) {
      return showAlert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    const newTask: Task = {
      title: newTaskTitle,
      done: false,
      id: new Date().getTime(),
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    let _tasks = [...tasks];

    _tasks = _tasks.map((item) => {
      if (item.id === id) item.done = !item.done;

      return item;
    });

    setTasks([..._tasks]);
  }

  function handleRequestRemoveTask(id: number) {
    showAlert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          onPress: () => handleRemoveTask(id),
          text: "Sim",
        },
      ]
    );
  }

  function handleRemoveTask(id: number) {
    let _tasks = [...tasks];

    _tasks = _tasks.filter((item) => item.id !== id);

    setTasks([..._tasks]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    let _tasks = [...tasks];

    _tasks = _tasks.map((item) => {
      if (item.id === taskId) item.title = taskNewTitle;

      return item;
    });

    setTasks([..._tasks]);
  }

  function showAlert(title?: string, msg?: string, buttons?: AlertButton[]) {
    Alert.alert(title ?? "", msg ?? "", buttons);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRequestRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
