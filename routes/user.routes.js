import express from "express";
import { isAuth } from "../config/jwt.js";

import {getUsers,getUserByAccountNumber
        ,getUserByIdentityNumber,createUser
        ,updateUser,deleteUser,login} from "../controller/user.controller.js"


const router = express.Router();

router.get('/',isAuth,getUsers);
router.get('/:accountNumber', isAuth, getUserByAccountNumber);
router.get('/identitysearch/:identityNumber', isAuth, getUserByIdentityNumber);
router.post('/login',login);
router.post('/',createUser);
router.patch('/:id',isAuth,updateUser);
router.delete('/:id',isAuth,deleteUser);


export default router;