import React from "react";
import PropTypes from "prop-types";
import { Navbar } from "react-bootstrap";

const PROP_TYPES = {
  title: PropTypes.string
};

const DEFAULT_PROPS = {
  title: ""
};

export default function Header({ title }) {
  return (
    <Navbar bg="primary" variant="dark" fixed="top">
      <Navbar.Brand href="#home">{title}</Navbar.Brand>
    </Navbar>
  );
}

Header.propTypes = PROP_TYPES;
Header.defaultProps = DEFAULT_PROPS;
