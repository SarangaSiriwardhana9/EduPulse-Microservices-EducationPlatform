import express from "express";
import { getAllUsers, updateUser,findUserById ,removeUser, getUserCountByRole } from "../services/userManagementService.js";

const router = express.Router();

//get all users
router.get("/getAll", async (req, res) => {
  try {
    const users = await getAllUsers();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//find user details by id
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get user count by role
router.get("/countByRole", async (req, res) => {
  try {
    const userCount = await getUserCountByRole();
    res.json(userCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update user by id
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, role } = req.body;
    const updatedUser = { firstName, lastName, email, role };
    const response = await updateUser(id, updatedUser);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//remove user by id
router.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await removeUser(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
