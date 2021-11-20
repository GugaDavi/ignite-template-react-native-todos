import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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

  function handleRemoveTask(id: number) {
    let _tasks = [...tasks];

    _tasks = _tasks.filter((item) => item.id !== id);

    setTasks([..._tasks]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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
