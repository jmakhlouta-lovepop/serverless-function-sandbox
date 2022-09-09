import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);

    // console.debug({ msg: "value is:", value: event.target.value });
  };

  const submitFormCallback = async (event) => {
    console.group("submit form callback");
    console.info({ msg: "on submit called...", event, message });
    const response = await fetch("api/receive", 
    {
      method: "POST",
      body: JSON.stringify({
        message
      })
    });
    const responseData = await response.json();
    const body = JSON.parse(responseData.body);
    console.info({ msg: "receive result", body, raw: {response, responseData } });
    console.groupEnd();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Send data form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Send data</h1>
        <div>
          <label>
            Message &nbsp;
            <input
              type="text"
              id="message"
              name="message"
              onChange={handleChange}
              value={message}
            />
          </label>
        </div>
        <button onClick={submitFormCallback}>Submit</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
