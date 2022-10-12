const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require("../controllers/userController");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verify-token");
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id",verifyToken, verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id",verifyToken, verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

// first it will verify the token then verify the user 

router.put("/:id", verifyToken, verifyUser, updateUser);

router.delete("/:id", verifyToken, verifyUser,deleteUser);

router.get("/:id", verifyToken, verifyUser,getUser);

router.get("/", verifyToken, verifyAdmin, getAllUsers);

module.exports = router;
