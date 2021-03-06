import React, { Children } from "react";
import Head from "next/head";

import Header from "../components/Header";
import styles from "./layout.module.scss";

const Layout = ({ children }) => (
  <div className={styles.container}>
    <Head>
      <title>DriveInMarkt</title>
      <link rel="icon" href="/logo.png" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />
    </Head>
    <Header title="DriveInMarkt" />
    <main className="container-fluid">
      <div className="">
        {children && Children.count(children) > 0 && children}
      </div>
    </main>
    <footer>
      Powered von einem Freiwilligenteam um die Ausbreitung von Covid19 zu
      beschränken.
    </footer>
  </div>
);

export default Layout;
