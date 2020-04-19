import React from "react";
import { v4 as uuidv4 } from "uuid";

import MapScreen from "../utilities/map_screen";
import Layout from "../utilities/layout";
import StoreResultCard from "../components/StoreResultCard";

import styles from "./styles/index.module.scss";

const stores = new Array(20).fill(undefined).map((_, index) => ({
  image:
    "https://gd-amsterda.sfo2.cdn.digitaloceanspaces.com/2016/04/coffee-shop-1-e1572034438285.jpg",
  name: `Store ${index}`,
  address: "Selchower Str. 1-6, 12049 Berlin",
  tags: ["Books", "Coffee", "Food"],
}));

const Home = () => (
  <Layout>
    <div className={styles.grid}>
      <div className={styles.storeListContainer}>
        {stores.map((store) => (
          <StoreResultCard key={uuidv4()} {...store} />
        ))}
      </div>
      <div className={styles.mapContainer}>
        <MapScreen
          loadingElement={<div style={{ height: "calc(100vh - 160px)" }} />}
          containerElement={
            <div style={{ width: "100%", height: `calc(100vh - 160px)` }} />
          }
          mapElement={<div style={{ height: "calc(100vh - 160px)" }} />}
        />
      </div>
    </div>
  </Layout>
);

export default Home;
