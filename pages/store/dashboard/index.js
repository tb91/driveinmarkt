import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import Layout from "../../../utilities/layout";
import StoreCover from "../../../components/StoreCover";
import OrderCard from "../../../components/OrderCard";
import ProductForm from "../../../components/ProductForm";

import styles from "./styles.module.css";

const ordersMock = [
  {
    id: "#0001",
    status: "ordered",
    pickupTime: "21.03.2020 15:30",
    password: "bw621",
    products: [
      {
        title: "Coffee Beans 1",
        quantity: "1",
        price: "10€"
      },
      {
        title: "Coffee Beans 2",
        quantity: "1",
        price: "12€"
      }
    ],
    total: "22€"
  },
  {
    id: "#0002",
    status: "pickedUp",
    pickupTime: "21.03.2020 15:00",
    password: "aj315",
    products: [
      {
        title: "Coffee Beans 1",
        quantity: "2",
        price: "20€"
      }
    ],
    total: "20€"
  }
];

const productsMock = [
  {
    photo:
      "https://www.meinlcoffee.com/wp-content/uploads/2016/07/0014_106501_Crema-Espresso-Classico.png",
    name: "Coffee beans 1",
    description: "",
    price: "10",
    quantity: "250",
    grams: ""
  },
  {
    photo:
      "https://www.meinlcoffee.com/wp-content/uploads/2016/07/0004_01_CafeExpert_BioFairtrade_A4.png",
    name: "Coffee beans 1",
    description: "",
    price: "10",
    quantity: "250",
    grams: ""
  }
];

export default function StoreDashboard() {
  return (
    <Layout>
      <StoreCover
        title="Super Shop"
        subtitle="Selchower Str. 1-6, 12049 Berlin"
        image="/store-cover.jpg"
      />
      <div class={`${styles.padding} container`}>
        <Tabs defaultActiveKey="products" id="uncontrolled-tab-example">
          <Tab eventKey="orders" title="Orders">
            <div className={`${styles.padding} ${styles.ordersGrid}`}>
              {ordersMock.map(order => (
                <OrderCard {...order} />
              ))}
            </div>
          </Tab>
          <Tab eventKey="products" title="Products">
            <div className={`${styles.padding} ${styles.productsGrid}`}>
              {productsMock.map(product => (
                <ProductForm values={product} />
              ))}
            </div>
          </Tab>
          <Tab eventKey="completed_orders" title="Completed Orders">
            Completed Orders
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
}
