import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BiSolidRightArrow, BiCategory } from "react-icons/bi";
import logo from '../assets/logo.png';
import '../assets/css/AdminLayout.css'; 
import { VscHome } from "react-icons/vsc";
import { CiCircleList } from "react-icons/ci";
import { GoAlertFill } from "react-icons/go";

const AdminLayout = ({ children }) => {
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Navbar expand="lg" className="justify-content-between" style={{ backgroundColor: '#662671' }}>
        <Navbar.Brand style={{ marginLeft: '20px', color: 'white' }}>
          <img
            src={logo} 
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />{' '}
          TableSprint
        </Navbar.Brand>
        <Nav>
          <Nav.Link onClick={handleShowModal} style={{ marginRight: '20px', color: 'white', margin: '-10px 20px -10px 0px' }}>
            <HiOutlineUserCircle size={40} style={{ color: 'white' }} />
          </Nav.Link>
        </Nav>
      </Navbar>
      
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            <Nav className="flex-column" style={{ marginTop: '20px' }}>
              <Nav.Item className={location.pathname === '/dashboard' ? 'active-link' : ''}>
                <Link to="/dashboard" className="nav-link d-flex justify-content-between align-items-center">
                  <span><VscHome size={25}/> Dashboard</span>
                  <BiSolidRightArrow size={15} />
                </Link>
              </Nav.Item>
              <Nav.Item className={location.pathname === '/category' || location.pathname === '/add-category' || location.pathname.startsWith('/edit-category') ? 'active-link' : ''}>
                <Link to="/category" className="nav-link d-flex justify-content-between align-items-center">
                  <span><BiCategory size={25}/> Category</span>
                  <BiSolidRightArrow size={15} />
                </Link>
              </Nav.Item>
              <Nav.Item className={location.pathname === '/subcategory' || location.pathname === '/add-subcategory' || location.pathname.startsWith('/edit-subcategory') ? 'active-link' : ''}>
                <Link to="/subcategory" className="nav-link d-flex justify-content-between align-items-center">
                  <span><CiCircleList size={25} /> Subcategory</span>
                  <BiSolidRightArrow size={15} />
                </Link>
              </Nav.Item>
              <Nav.Item className={location.pathname === '/product' || location.pathname === '/add-product' || location.pathname.startsWith('/edit-product') || location.pathname.startsWith('/view-product') ? 'active-link' : ''}>
                <Link to="/product" className="nav-link d-flex justify-content-between align-items-center">
                  <span>
                    <img src="https://cdn-icons-png.freepik.com/512/65/65721.png" width={25} height={25} /> &nbsp;&nbsp;Products
                  </span>
                  <BiSolidRightArrow size={15} />
                </Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={10} className="mt-4">
            {children}
          </Col>
        </Row>
      </Container>

      {/* Logout Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered >
      <Modal.Header className="justify-content-center" style={{ border: 'none' }}>
        <Modal.Title><GoAlertFill style={{color: 'red', marginRight: '10px'}}/> Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center" style={{ border: 'none' }}>
        <div className="d-flex flex-column align-items-center">
          <span>Are you sure you want to log out?</span>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center" style={{ border: 'none' }}>
        <Button
          variant="secondary"
          style={{
            backgroundColor: 'white',
            color: '#662671',
            border: '1px solid #662671',
            borderRadius: '24px',
            padding: '10px 40px',
          }}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          style={{
            backgroundColor: '#662671',
            border: 'none',
            borderRadius: '24px',
            padding: '10px 40px',
            marginLeft: '10px',
          }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default AdminLayout;
