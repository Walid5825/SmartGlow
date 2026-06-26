"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { getStatus, ledOn, ledOff } from "./logic";
import { socket } from "../../lib/socket";

export default function Dashboard() {

  const router = useRouter();

  const [verte, setVerte] = useState(0);
  const [rouge, setRouge] = useState(0);

  // ================= AUTH =================
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    refresh();

  }, []);

  // ================= INITIAL LOAD =================
  async function refresh() {
    try {
      const data = await getStatus();
      setVerte(data.verte);
      setRouge(data.rouge);
    } catch (err) {
      if (err?.message === "Non authentifié") {
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  }

  // ================= SOCKET.IO (LEVEL 6) =================
  useEffect(() => {

    socket.on("led_update", (data) => {

      console.log("SOCKET UPDATE:", data);

      if (data.color === "verte") {
        setVerte(data.state);
      }

      if (data.color === "rouge") {
        setRouge(data.state);
      }
    });

    return () => {
      socket.off("led_update");
    };

  }, []);

  // ================= LOGOUT =================
  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div className={styles.container}>

      <button className={styles.logout} onClick={logout}>
        Déconnexion
      </button>

      <h1 className={styles.titre}>SmartGlow</h1>

      <div className={styles.cards}>

        {/* LED VERTE */}
        <div className={styles.card}>
          <div className={verte ? styles.verte : styles.off}></div>
          <h2 className={styles.nom}>LED Verte</h2>

          <button className={styles.bouton} onClick={() => ledOn("verte").then(refresh)}>
            ON
          </button>

          <button className={styles.bouton} onClick={() => ledOff("verte").then(refresh)}>
            OFF
          </button>
        </div>

        {/* LED ROUGE */}
        <div className={styles.card}>
          <div className={rouge ? styles.rouge : styles.off}></div>
          <h2 className={styles.nom}>LED Rouge</h2>

          <button className={styles.bouton} onClick={() => ledOn("rouge").then(refresh)}>
            ON
          </button>

          <button className={styles.bouton} onClick={() => ledOff("rouge").then(refresh)}>
            OFF
          </button>
        </div>

      </div>
    </div>
  );
}