import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null); // State to track which user is being edited
  const [editedUserData, setEditedUserData] = useState({}); // State to store edited user data

  // Get all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:7073/api/userManagement/getAll", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Remove user by ID
  const removeUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:7073/api/userManagement/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      // Update users state after deletion
      setUsers(users.filter(user => user._id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error("Error removing user:", error);
      toast.error('Error deleting user');
    }
  };

  // Set user ID for editing and initialize editedUserData state
  const editUser = (id) => {
    setEditingUserId(id);
    const userToEdit = users.find(user => user._id === id);
    setEditedUserData({ ...userToEdit });
  };

  // Save edited user data
  const saveEditedUser = async () => {
    try {
      const response = await axios.put(`http://localhost:7073/api/userManagement/update/${editingUserId}`, editedUserData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      // Update the users state with the edited user data
      setUsers(users.map(user => user._id === editingUserId ? editedUserData : user));
      setEditingUserId(null); // Reset editing state after saving
      toast.success('User updated successfully');
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error('Error updating user');
    }
  };

  // Handle input change for edited user data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-10 mx-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 bg-gray-50"></th> {/* Empty header for delete button */}
            <th className="px-6 py-3 bg-gray-50"></th> {/* Empty header for edit button */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-no-wrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editedUserData.firstName}
                    onChange={handleInputChange}
                    className="mb-2 px-2 py-2 border border-black rounded-md"
                  />
                ) : (
                  user.firstName
                )}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editedUserData.lastName}
                    onChange={handleInputChange}
                    className="mb-2 px-2 py-2 border border-black rounded-md"
                  />
                ) : (
                  user.lastName
                )}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    name="role"
                    value={editedUserData.role}
                    onChange={handleInputChange}
                    className="mb-2 px-2 py-2 border border-black rounded-md"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {editingUserId === user._id ? (
                  <button
                    onClick={saveEditedUser}
                    className="text-green-500 hover:text-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => removeUser(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {editingUserId !== user._id && (
                  <button
                    onClick={() => editUser(user._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default AllUsers;
