import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Keyboard,
  Switch,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  //Added task and it's actions

  const ListItem = ({ task }) => {
    return (
      <View style={styles.ListItem}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: task?.completed ? "green" : "black",
            }}
          >
            {task?.task}
          </Text>
        </View>
        {!task?.completed && (
          <TouchableOpacity
            style={styles.actions}
            onPress={() => completed(task?.id)}
          >
            <MaterialIcons name="done" size={22} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => deleteTask(task?.id)}
          style={[styles.actions, { backgroundColor: "red" }]}
        >
          <MaterialIcons name="delete" size={22} />
        </TouchableOpacity>
      </View>
    );
  };

  //Add new task

  const addTask = () => {
    if (input == "") {
      Alert.alert("Hello", "Please Enter what you wanna do!");
    } else {
      const newTask = {
        id: Math.random(),
        task: input,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      Keyboard.dismiss();
      setInput("");
    }
  };

  //Mark task as completed

  const completed = (taskId) => {
    const newTasks = tasks.map((item) => {
      if (item.id == taskId) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTasks(newTasks);
  };

  //Delete a specific task

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((item) => item.id != taskId);
    setTasks(newTasks);
  };

  //Delete all tasks

  const deleteAllTasks = () => {
    setTasks([]);
  };
  return (
    <View style={{ flex: 1 }} backgroundColor={isEnabled ? "orange" : "white"}>
      <StatusBar backgroundColor="black" style="light" />

      <View style={styles.header}>
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 25 }}>
          TODO APP
        </Text>
        <Switch
          style={styles.switch}
          trackColor={{
            false: "white",
            true: "orange",
          }}
          thumbColor={isEnabled ? "black" : "white"}
          onValueChange={() => {
            setIsEnabled((stateNow) => !stateNow);
          }}
          value={isEnabled}
        />
      </View>
      <View style={styles.inputArea}>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Enter what you wanna do "
            value={input}
            onChangeText={(text) => setInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTask}>
          <View style={styles.btn}>
            <MaterialIcons name="add" color="white" size={25} />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={tasks}
        renderItem={({ item }) => <ListItem task={item} />}
      />
      <View style={styles.clearAll}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Clear All Tasks
        </Text>
        <MaterialIcons
          name="delete"
          size={35}
          onPress={deleteAllTasks}
          color="red"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputArea: {
    position: "absolute",
    top: 80,
    color: "white",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textInput: {
    backgroundColor: "white",
    flex: 1,
    height: 50,
    borderRadius: 10,
    marginVertical: 20,
    marginRight: 20,
    paddingHorizontal: 20,
    elevation: 40,
    justifyContent: 'center',
    fontSize:30
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: 50,
    borderRadius: 20,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  ListItem: {
    padding: 15,
    backgroundColor: "white",
    flexDirection: "row",
    elevation: 10,
    borderRadius: 5,
    marginTop: 25,
    alignItems: "center",
  },
  actions: {
    height: 40,
    width: 30,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    borderRadius: 8,
  },
  clearAll: {
    margin: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
