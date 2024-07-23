import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { BiCategory, BiSearch } from 'react-icons/bi';
import { RiExpandUpDownFill } from 'react-icons/ri';
import '../assets/css/Product.css';
import { IoEyeOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GoAlertFill } from 'react-icons/go';
import axiosInstance from '../utils/axiosInstance';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const token = localStorage.getItem('token');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/api/product', {
          headers: {
            Authorization: `${token}`,
          },
        });
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data : 'Unknown error');
      }
    };
    fetchProducts();
  }, [token]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/product/${deleteId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setProducts(products.filter(product => product.id !== deleteId));
      setShowDeleteModal(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : 'Unknown error');
      setShowDeleteModal(false); // Close the modal even if there's an error
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span style={{ fontSize: '25px' }}>
          <BiCategory size={35} /> Products
        </span>
        <InputGroup className="search-input" style={{ width: '600px' }}>
          <FormControl
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroup.Text>
            <BiSearch size={20} />
          </InputGroup.Text>
        </InputGroup>
        <Link to="/add-product">
          <Button variant="primary" style={{ backgroundColor: '#662671', border: 'none' }}>Add Product</Button>
        </Link>
      </div>
      <Table>
        <thead >
          <tr>
            <th>ID <RiExpandUpDownFill /></th>
            <th>Product Name <RiExpandUpDownFill /></th>
            <th>Subcategory <RiExpandUpDownFill /></th>
            <th>Category <RiExpandUpDownFill /></th>
            <th>Status <RiExpandUpDownFill /></th>
            <th>Sequence <RiExpandUpDownFill /></th>
            <th>Action <RiExpandUpDownFill /></th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: '#f8f9fa' }} variant="info">
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.Subcategory.name}</td>
              <td>{product.Category.name}</td>
              <td style={{ textTransform: 'capitalize' ,color: product.status === 'active' ? 'green' : 'red'}}>{product.status}</td>
              <td>{product.sequence}</td>
              <td>
                <Link to={`/view-product/${product.id}`}>
                  <Button style={{ backgroundColor: '#f2f2f2', border: 'none', color: '#000000' }} className="m-0">
                    <IoEyeOutline size={25} />
                  </Button>
                </Link>
                <Link to={`/edit-product/${product.id}`}>
                  <Button style={{ backgroundColor: '#f2f2f2', border: 'none', color: '#000000' }} className="m-0">
                    <FiEdit size={25} />
                  </Button>
                </Link>
                <Button
                  style={{ backgroundColor: '#f2f2f2', border: 'none', color: '#000000' }}
                  onClick={() => {
                    setDeleteId(product.id);
                    setShowDeleteModal(true);
                  }}
                >
                  <RiDeleteBin6Line size={25} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
      <Modal.Header className="justify-content-center" style={{ border: 'none' }}>
        <Modal.Title><GoAlertFill style={{color: 'red', marginRight: '10px'}}/> Delete </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="d-flex flex-column align-items-center">
            <span>Are you sure you want to delete ?</span>
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
            onClick={() => setShowDeleteModal(false)}
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
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default Product;
