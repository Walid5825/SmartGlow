import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet,Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const API = "http://192.168.1.33:7000";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {

    try {

      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.token) {

        await AsyncStorage.setItem("token", data.token);

        router.replace("/");

      } else {
        alert("Login incorrect");
      }

    } catch (err) {
      console.log(err);
      alert("Erreur API");
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>SmartGlow Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Mot de passe"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Connexion</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"grey",
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    paddingBottom:40,
  },

  input: {
    width: "80%",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },

  button: {
  padding: 12,
  marginTop:20,
  borderRadius: 8,
  backgroundColor:"white",
  borderWidth: 1,
  },


});