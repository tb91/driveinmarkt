import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav } from "react-bootstrap";
import { observer } from "mobx-react";
import AuthStore from "../../stores/authentication";

const PROP_TYPES = {
  title: PropTypes.string,
};

const DEFAULT_PROPS = {
  title: "",
};

const Header = observer(({ title }) => {
  AuthStore.getUserStore().checkAuthenticated((err, tokens) => {
    console.log(err);
    console.log(tokens);
  });

  return (
    <Navbar bg="primary" variant="dark" fixed="top">
      <Navbar.Brand className="mr-auto" href="/">
        {title}
      </Navbar.Brand>
      <Nav className="">
        <Nav.Link href="/signup">
          <Navbar.Text className="text-light">Registrieren</Navbar.Text>
        </Nav.Link>
        <Nav.Link href="/login">
          <Navbar.Text className="text-light">Einloggen</Navbar.Text>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
});
export default Header;

Header.propTypes = PROP_TYPES;
Header.defaultProps = DEFAULT_PROPS;
