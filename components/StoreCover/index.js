import React from "react";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";

import styles from "./styles.module.css";

const PROP_TYPES = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  onEdit: PropTypes.func
};

const DEFAULT_PROPS = {
  title: "",
  subtitle: "",
  image: "",
  onEdit: () => {}
};

export default function StoreCover({ title, subtitle, image, onEdit }) {
  return (
    <section className={styles.container}>
      <div className={styles.overlay} />
      <img className={styles.image} src={image} alt={title} />
      <div className={`container`}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            {subtitle}{" "}
            <button
              type="button"
              onClick={onEdit}
              className={styles.editButton}
            >
              <FaEdit />
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

StoreCover.propTypes = PROP_TYPES;
StoreCover.defaultProps = DEFAULT_PROPS;
