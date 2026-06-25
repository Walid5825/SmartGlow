"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {

    const res = await fetch("http://192.168.1.33:7000/login", {
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

      localStorage.setItem("token", data.token);

      router.push("/dashboard");

    } else {
      alert("Login incorrect");
    }
  }

  return (
  <div className={styles.container}>
    <div className={styles.card}>
      <h1 className={styles.title}>SmartGlow Login</h1>
      <input className={styles.input} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>   {/* admin@test.com */}
      <input className={styles.input} type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}/> {/* admin123 */}
      <button className={styles.button} onClick={login}>Se connecter</button>
    </div>

  </div>
  );
}