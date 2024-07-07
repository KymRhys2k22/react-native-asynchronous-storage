import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function App() {
  const [textInput, onChangeTextInput] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const customer = await AsyncStorage.getItem("customers");

        setCustomers(customers === null ? [] : JSON.parse(customer));
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("customers", JSON.stringify(customers));
      } catch (e) {}
    })();
  }, [customers]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
          }}>
          <Text style={styles.title}>Input Products:</Text>
        </View>
        <TextInput
          value={textInput}
          onChangeText={(data) => onChangeTextInput(data)}
          style={styles.inputText}
          placeholder="items"
        />
        <TouchableOpacity
          onPress={() => {
            setCustomers([...customers, textInput]);
            onChangeTextInput("");
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Add Items</Text>
        </TouchableOpacity>
        {/* clear all */}
        <TouchableOpacity
          onPress={() => {
            setCustomers([]);
          }}
          style={styles.clearButton}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 20 }}>ITEMS:</Text>
          {customers
            .slice(0)
            .reverse()
            .map((customer, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                  width: "100",
                  paddingLeft: 8,
                }}>
                <Text style={{ fontSize: 18 }}>
                  {index + 1 + "." + customer}
                </Text>
              </View>
            ))}
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
    rowGap: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 5,
  },
  clearButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 5,
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  inputText: {
    backgroundColor: "#f2f3f4",
    width: "100%",
    color: "#252525",
    paddingLeft: 16,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
