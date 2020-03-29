import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const PROP_TYPES = {
  values: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.string,
    grams: PropTypes.string
  }),
  onChange: PropTypes.func
};

const DEFAULT_PROPS = {
  values: {},
  onChange: () => {}
};

export default function ProductForm({ values, onChange }) {
  return (
    <div className={styles.container}>
      <div>
        {values.photo ? (
          <div className={styles.photoPreviewContainer}>
            <img className={styles.photoPreview} src={values.photo} />
          </div>
        ) : (
          <div className={styles.photo}>
            <span className={styles.add}>Add Photo</span>
          </div>
        )}
      </div>
      <div className={styles.form}>
        <div className="form-group">
          <label htmlFor="productName">Product name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Enter product name"
            value={values.name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDesc">Product description</label>
          <textarea
            className="form-control"
            id="productDesc"
            rows="4"
            onChange={onChange}
          >
            {values.description}
          </textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            placeholder="Enter price"
            onChange={onChange}
            value={values.price}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <div className={styles.grams}>
            <input
              type="number"
              className="form-control"
              id="price"
              onChange={onChange}
              value={values.quantity}
            />
            <select
              className="form-control"
              id="grams"
              name="grams"
              onChange={onChange}
              value={values.grams}
            >
              <option>select grams</option>
              <option>0 - 10</option>
              <option>10 - 50</option>
              <option>50 - 100</option>
              <option>100 - 200</option>
              <option>200 - 1000</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductForm.propTypes = PROP_TYPES;
ProductForm.defaultProps = DEFAULT_PROPS;
