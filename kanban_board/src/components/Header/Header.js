import React from "react";
import { Navbar } from "react-bootstrap";
function Header() {
    return (
        <Navbar style={{ backgroundColor: ' #C70039' }}>
            <Navbar.Brand href="#home" style={{ marginLeft: '40px', fontSize: '22px', fontWeight: 'bolder', color: 'white' }}>Kanban Board</Navbar.Brand>
        </Navbar>
    );
}

export default Header;
