import React from 'react';
import PropTypes from 'prop-types';
import {Badge} from 'react-bootstrap';
import {v4 as uuid} from 'uuid';

import styles from './styles.module.css';

const PROP_TYPES = {
  image: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

const DEFAULT_PROPS = {
  image: '',
  name: '',
  address: '',
  tags: [],
};

export default function StoreResultCard({image, name, address, tags}) {
  return (
    <button className={styles.container}>
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.content}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.address}>{address}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Badge key={uuid()} variant="primary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </button>
  );
}

StoreResultCard.propTypes = PROP_TYPES;
StoreResultCard.defaultProps = DEFAULT_PROPS;
