import React from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import styles from "./styles.module.css";

const PROP_TYPES = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  pickupTime: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      quantity: PropTypes.string,
      price: PropTypes.string
    })
  ).isRequired,
  total: PropTypes.string.isRequired
};

const STATUS_VARIANTS = {
  ordered: "primary",
  ready: "success",
  pickedUp: "info"
};

const STATUS_TEXTS = {
  ordered: "Ordered",
  ready: "Ready",
  pickedUp: "Picked Up"
};

export default function OrderCard({
  id,
  status,
  pickupTime,
  password,
  products,
  total
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.id}>{id}</p>
        <Badge variant={STATUS_VARIANTS[status]}>{STATUS_TEXTS[status]}</Badge>
      </div>
      <div className={styles.description}>
        <p>Pick up time: {pickupTime}</p>
        <p className={styles.password}>
          Password: <span className={styles.passwordValue}>{password}</span>
        </p>
      </div>
      <div className={styles.products}>
        {products.map(product => (
          <div key={uuidv4()} className={styles.product}>
            <p>{product.title}</p>
            <p>{product.quantity}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <div className={styles.total}>{total}</div>
    </div>
  );
}

OrderCard.propTypes = PROP_TYPES;
