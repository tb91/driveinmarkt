import React, { useEffect } from "react";

import { useRouter } from "next/router";

import Layout from "../utilities/layout";

import styles from "./styles/create-shop.module.scss";

const CreateShop = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/create-account");
  });

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to DriveInMarkt</h1>

        <form className={styles.createForm}>
          <div className="form-group">
            <label htmlFor="shopName">Shop name</label>
            <input
              type="text"
              className="form-control"
              id="shopName"
              placeholder="Enter shop name"
            />
          </div>
          <div className="address">
            <label htmlFor="shopName">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter address"
            />
            <small id="emailHelp" className="form-text text-muted d-none">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className={`d-none type ${styles.badges}`}>
            <label htmlFor="shopName" className={styles.badgeLabel}>
              Type
            </label>
            <span
              className={`badge badge-pill badge-secondary ${styles._badge}`}
            >
              Books
            </span>
            <span
              className={`badge badge-pill badge-secondary ${styles._badge}`}
            >
              Coffee
            </span>
            <span
              className={`badge badge-pill badge-secondary ${styles._badge}`}
            >
              Food
            </span>
            <span
              className={`badge badge-pill badge-secondary ${styles._badge}`}
            >
              Toys
            </span>
            <span
              className={`badge badge-pill badge-secondary ${styles._badge}`}
            >
              Clothes
            </span>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="textarea-create">Description</label>
            <textarea
              className="form-control"
              id="textarea-create"
              rows="4"
            ></textarea>
          </div>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="picture" />
            <label className="custom-file-label" htmlFor="customFile">
              Choose picture
            </label>
          </div>
          <div className={styles.submit}>
            <button
              type="button"
              className="btn btn-lg btn-primary btn-block"
              disabled
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateShop;
