import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, InputGroup, FormControl, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { BiCategory, BiSearch } from 'react-icons/bi';
import { RiDeleteBin6Line, RiExpandUpDownFill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { GoAlertFill } from 'react-icons/go';
import '../assets/css/Category.css';
import axiosInstance from '../utils/axiosInstance';


const Category = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const token = localStorage.getItem('token');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/api/category', {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log('Categories fetched:', res.data);
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data : 'Unknown error');
      }
    };
    fetchCategories();
  }, [token]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/category/${deleteId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setCategories(categories.filter(category => category.id !== deleteId));
      setShowDeleteModal(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting category:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : 'Unknown error');
      setShowDeleteModal(false); // Close the modal even if there's an error
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span style={{ fontSize: '25px' }}>
          <BiCategory size={35} /> Category
        </span>
        <InputGroup className="" style={{ width: '600px' }}>
          <FormControl
            placeholder="Search categories..."
            aria-label="Search categories"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroup.Text>
            <BiSearch size={20} />
          </InputGroup.Text>
        </InputGroup>
        <Link to="/add-category">
          <Button variant="primary" style={{ backgroundColor: '#662671', border: 'none' }}>Add Category</Button>
        </Link>
      </div>
      <Table >
        <thead >
          <tr>
            <th>ID <RiExpandUpDownFill /></th>
            <th>Category Name <RiExpandUpDownFill /></th>
            <th>Image <RiExpandUpDownFill /></th>
            <th>Status <RiExpandUpDownFill /></th>
            <th>Sequence <RiExpandUpDownFill /></th>
            <th>Action <RiExpandUpDownFill /></th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${category.image}`}
                  alt={category.name}
                  width="50"
                />
              </td>
              <td style={{ textTransform: 'capitalize' ,color: category.status === 'active' ? 'green' : 'red'}}>{category.status}</td>
              <td>{category.sequence}</td>
              <td>
                <Link to={`/edit-category/${category.id}`}>
                  <Button style={{ backgroundColor: '#f2f2f2', border: 'none', color: '#000000' }} className="m-0">
                    <FiEdit size={25} />
                  </Button>
                </Link>
                <Button
                  style={{ backgroundColor: '#f2f2f2', border: 'none', color: '#000000' }}
                  onClick={() => {
                    setDeleteId(category.id);
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

export default Category;
