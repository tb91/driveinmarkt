import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Layout from "../utilities/layout";

import styles from "./styles/add-products.module.scss";

import withAuth from "../components/Auth/withAuth";

const CreateShop = () => {
  const router = useRouter();

  const initialProductState = {
    photo: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    grams: "",
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const [products, setProducts] = useState([
    {
      0: {
        ...initialProductState,
      },
    },
  ]);

  useEffect(() => {
    router.prefetch("/add-products");
  });

  const readURL = (file) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e.target.result);
      reader.onerror = (e) => rej(e);
      reader.readAsDataURL(file);
    });
  };

  const handleUploadProduct = async (event, key) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const url = await readURL(file);

      setSelectedFile(url);

      const newProduct = Object.assign(products[key], {
        [key]: {
          ...products[key][key],
          photo: url,
        },
      });

      const productSet = products.map((product) =>
        Object.keys(product)[0] === products[key] ? newProduct : product
      );

      setProducts(productSet);
    }
  };

  const handleAddMore = () => {
    // setProducts([...products, {[products.length]: initialProductState}]);
    // TODO: upload to database here and refresh form to be empty
  };
  const handleAddAndLeave = () => {
    handleAddMore();
    // TODO: route to store front
  };

  return (
    <Layout>
      <div className="container-md">
        <h1 className={styles.title}>Now add products</h1>
        <div className={styles.productGroup}>
          {products &&
            products.length > 0 &&
            products.map((product, index) => (
              <div className={styles.container} key={index}>
                <div className="row">
                  <div className="col-sm">
                    <input
                      type="file"
                      className={styles.file}
                      onChange={(event) => handleUploadProduct(event, index)}
                    />
                    <div className={styles.photo} onClick={() => {}}>
                      {selectedFile && product[index].photo && (
                        <img
                          className={styles.image}
                          src={product[index].photo}
                        />
                      )}
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
                        <select
                          className="form-control"
                          id="grams"
                          name="grams"
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
              </div>
            ))}
        </div>
        <div className="d-flex">
          <div className={styles.submit}>
            <button
              type="button"
              className="btn btn-lg btn-primary btn-block"
              onClick={handleAddMore}
            >
              Save and add More
            </button>
          </div>
          <div className={styles.submit}>
            <button
              type="button"
              className="btn btn-lg btn-primary btn-block"
              onClick={handleAddAndLeave}
            >
              Save and leave
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(CreateShop);
