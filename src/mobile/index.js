import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const API = "http://192.168.1.33:7000";

export default function Index() {
  const [verte, setVerte] = useState(0);
  const [rouge, setRouge] = useState(0);

  async function refresh() {
    try {
      const res = await fetch(`${API}/status`);
      const data = await res.json();

      setVerte(data.verte);
      setRouge(data.rouge);
    } catch (error) {
      console.log(error);
    }
  }

  async function ledOn(couleur) {
    await fetch(`${API}/led/${couleur}/on`, {
      method: "POST",
    });

    refresh();
  }

  async function ledOff(couleur) {
    await fetch(`${API}/led/${couleur}/off`, {
      method: "POST",
    });

    refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>SmartGlow Mobile</Text>
       <View style={styles.ligne}>

      <View style={styles.carte}>
        <View style={[styles.led,{ backgroundColor: verte ? "green" : "gray" }]}/>
        <Text>LED Verte</Text>
        <Button title="ON" onPress={() => ledOn("verte")} />
        <Button title="OFF" onPress={() => ledOff("verte")} />
      </View>

      <View style={styles.carte}>
        <View style={[styles.led,{ backgroundColor: rouge ? "red" : "gray" }]}/>
        <Text>LED Rouge</Text>
        <Button title="ON" onPress={() => ledOn("rouge")} />
        <Button title="OFF" onPress={() => ledOff("rouge")} />
        </View>
      </View>
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
    justifyContent: "space-evenly",
    width: "100%",
  },

  carte: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    width: 140,
    backgroundColor: "white",
  },

  led: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
});