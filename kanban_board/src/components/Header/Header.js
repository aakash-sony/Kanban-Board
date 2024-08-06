import React from "react";
import { Navbar } from "react-bootstrap";
function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home" style={{ marginLeft: '40px', fontSize: '22px' }}>Kanban Board</Navbar.Brand>
        </Navbar>
    );
}

export default Header;
