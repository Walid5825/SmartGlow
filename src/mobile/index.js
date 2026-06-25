import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const API = "http://192.168.1.33:7000";

export default function Index() {

  const router = useRouter();

  const [verte, setVerte] = useState(0);
  const [rouge, setRouge] = useState(0);
  const [token, setToken] = useState(null);

  async function checkAuth() {

    const t = await AsyncStorage.getItem("token");

    if (!t) {
      router.replace("/login");
      return;
    }

    setToken(t);
    refresh(t);
  }

  async function refresh(t) {

    const res = await fetch(`${API}/status`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });

    const data = await res.json();

    setVerte(data.verte);
    setRouge(data.rouge);
  }

  async function led(color, action) {

    const savedToken = token || await AsyncStorage.getItem("token");

    await fetch(`${API}/led/${color}/${action}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${savedToken}`,
      },
    });

    refresh(savedToken);
  }

  async function logout() {

    await AsyncStorage.removeItem("token");
    router.replace("/login");
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>SmartGlow Mobile</Text>
       <View style={styles.ligne}>

      <View style={styles.carte}>
        <View style={[styles.led,{ backgroundColor: verte ? "green" : "gray" }]}/>
        <Text>LED Verte</Text>
        <Button title="ON" onPress={() => led("verte", "on")} />
        <Button title="OFF" onPress={() => led("verte", "off")} />
      </View>

      <View style={styles.carte}>
        <View style={[styles.led,{ backgroundColor: rouge ? "red" : "gray" }]}/>
        <Text>LED Rouge</Text>
        <Button title="ON" onPress={() => led("rouge", "on")} />
      <Button title="OFF" onPress={() => led("rouge", "off")} />
        </View>
      </View>
      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Déconnexion</Text>
      </Pressable>
    </View>
  );
}



      

      


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "grey",
  },

  titre: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 100,
    marginBottom: 150,
  },

  ligne: {
    flexDirection: "row",
    width: "100%",
  },

  carte: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    width: 140,
    backgroundColor: "white",
    marginLeft:35,
  },

  led: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },

  button: {
  padding: 12,
  marginTop:50,
  borderRadius: 8,
  backgroundColor:"white",
  borderWidth: 1,
  },

});