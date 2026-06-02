// "use client" permet d'utiliser des choses interactives dans la page comme les boutons, useState et useEffect
"use client";



import { useEffect, useState } from "react"; // Import de useState et useEffect depuis React
import styles from "./page.module.css"; // Import du fichier CSS
import { getStatus, ledOn, ledOff } from "./logic"; // Import des fonctions qui communiquent avec l'API Flask


// Fonction principale de la page
export default function Page() {

  // Variables qui stockent l'état des LEDs
  // 0 = éteinte
  // 1 = allumée
  const [verte, setVerte] = useState(0);
  const [rouge, setRouge] = useState(0);


  // Fonction qui récupère l'état des LEDs depuis l'API
  async function refresh() {

    // On demande le status à Flask
    const data = await getStatus();

    // On met à jour les LEDs dans la page
    setVerte(data.verte);
    setRouge(data.rouge);
  }


  // useEffect lance du code automatiquement
  // ici : quand la page démarre
  useEffect(() => {

    // récupère le status des LEDs
    refresh();

    // relance refresh toutes les secondes
    const interval = setInterval(refresh, 1000);

    // supprime l'intervalle quand on quitte la page
    return () => clearInterval(interval);

  }, []);


  // Ce qui est affiché dans la page
  return (
    
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
);
}