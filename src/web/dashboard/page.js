"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { getStatus, ledOn, ledOff } from "./logic";

export default function Dashboard() {

  const router = useRouter();

  const [verte, setVerte] = useState(0);
  const [rouge, setRouge] = useState(0);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    refresh();

    const interval = setInterval(refresh, 1000);

    return () => clearInterval(interval);

  }, []);

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

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div className={styles.container}>
      <button className={styles.logout} onClick={logout}>Déconnexion</button>

      {/* HEADER */}
      <div className={styles.container}> {/* Conteneur principal */}

      <h1 className={styles.titre}>SmartGlow</h1>

      {/* Bloc contenant les 2 LEDs */}
      <div className={styles.cards}>

        {/*LED VERTE*/}
        <div className={styles.card}>

          {/* Cercle de la LED */}
          {/* Si la LED est allumée -> vert */}
          {/* Sinon -> gris */}
          <div className={verte ? styles.verte : styles.off}></div>

          <h2 className={styles.nom}>LED Verte</h2>

          {/* Bouton ON */}
          <button className={styles.bouton} onClick={() => ledOn("verte").then(refresh)}>ON</button>

          {/* Bouton OFF */}
          <button className={styles.bouton} onClick={() => ledOff("verte").then(refresh)}>OFF</button>
        </div>

        {/* LED ROUGE */}
        <div className={styles.card}>

          {/* Cercle rouge si allumée sinon gris */}
          <div className={rouge ? styles.rouge : styles.off}></div>

          <h2 className={styles.nom}>LED Rouge</h2>

          {/* Bouton ON */}
          <button className={styles.bouton} onClick={() => ledOn("rouge").then(refresh)}>ON</button>

          {/* Bouton OFF */}
          <button className={styles.bouton} onClick={() => ledOff("rouge").then(refresh)}>OFF</button>

        </div>
      </div>
    </div>
    </div>

  );
}