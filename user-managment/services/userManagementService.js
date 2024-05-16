import e from "express";
import User from "../models/Users.js";

//get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return {
      message: "Failed to get all users",
    };
  }
};

//find user details by id
const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    return {
      message: "Failed to get user",
    };
  }
};

//get user count and return by role
const getUserCountByRole = async () => {
  try {
    const userCount = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);
    return userCount;
  } catch (error) {
    return {
      message: "Failed to get user count by role",
    };
  }
};

//update user by id
const updateUser = async (id, updatedUser) => {
  try {
    const { firstName, lastName, email, role } = updatedUser;
    const response = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, role },

      {
        new: true,
      }
    );
    return {
      message: "User updated successfully",
      response: response,
    };
  } catch (error) {
    return {
      message: "Failed to update user",
    };
  }
};

//remove user by id
const removeUser = async (id) => {
  try {
    const response = await User.findByIdAndDelete(id);
    return {
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      message: "Failed to delete user",
      error: error.message,
    };
  }
};

export {
  getAllUsers,
  findUserById,
  updateUser,
  removeUser,
  getUserCountByRole,
};
