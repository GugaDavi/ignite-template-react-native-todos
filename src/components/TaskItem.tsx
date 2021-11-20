import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import { Task } from "./TasksList";

interface TasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, value: string) => void;
}

export const TaskItem: React.FC<TasksItemProps> = ({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setNewTaskTitle(task.title);
  }

  function handleSubmitEditing() {
    editTask(task.id, newTaskTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      {isEditing ? (
        <View style={styles.containerButtons}>
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingRight: 24 }}
          >
            <Image source={trashIcon} style={{ opacity: 0.2 }} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.containerButtons}>
          <TouchableOpacity onPress={handleStartEditing}>
            <Icon name="edit-3" style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingRight: 24 }}
            onPress={() => removeTask(task.id)}
          >
            <Image source={trashIcon} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerButtons: {
    flexDirection: "row",
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 18,
  },
  icon: {
    fontSize: 20,
    color: "#B2B2B2",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
