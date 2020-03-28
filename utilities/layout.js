import React, { Children } from "react";

import Head from "next/head";

import styles from "./layout.module.css";

const Layout = ({ children }) => (
  <div className={styles.container}>
    <Head>
      <title>DriveInMarket</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />
    </Head>

    <main className="container-fluid w-100" style={{ maxHeight: "90%" }}>
      <div className="w-100">
        {children && Children.count(children) > 0 && children}
      </div>
      <footer>
        Powered von einem Freiwilligenteam um die Ausbreitung von Covid19 zu
        beschränken.
      </footer>
    </main>
  </div>
);

export default Layout;
