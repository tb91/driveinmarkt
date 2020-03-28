import React, {useEffect} from 'react';

import {useRouter} from 'next/router';

import Layout from '../utilities/layout';

import styles from './styles/add-products.module.scss';

const CreateShop = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/create-shop');
  });

  return (
    <Layout>
      <div className="container-md">
        <h1 className={styles.title}>Now add products</h1>
        <div className={styles.container}>
          <div className="row">
            <div className="col-sm">
              <div className={styles.photo}>
                <span className={styles.add}>Add Photo</span>
              </div>
            </div>
            <div className="col-sm">
              <div className="form-group">
                <label htmlFor="productName">Product name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  placeholder="Enter product name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="productDesc">Product description</label>
                <textarea
                  className="form-control"
                  id="productDesc"
                  rows="4"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Enter price"
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <div className={styles.grams}>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                  />
                  <select className="form-control" id="grams" name="grams">
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
        </div>
        <div className={styles.submit}>
          <button
            type="button"
            className="btn btn-lg btn-primary btn-block"
            disabled
          >
              Add More
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateShop;
