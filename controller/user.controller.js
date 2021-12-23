import User from '../model/user.model.js'
import { redis } from '../config/db.js';
import { hashPwd, comparePwd } from '../config/encrypt.js';
import { getJwt } from '../config/jwt.js';
import {promisify} from 'util';

export const login = async (req,res)=>{
    try {
        let key = `login-${req.param.username}`;
        let get = await promisify(redis().get).bind(redis());
        let data = await get(key);
        if (data) {
            res.json({getFrom:"redis",data});
        } else {
            let user = await User.findOne({userName:req.body.username});
            if(!user) return res.status(404).json({message: "User not found"}); 
            if (user) {
                let check = await comparePwd(req.body.password, user.password);
                if (check) {
                    let jwt = getJwt(req.body.username);
                    redis().setex(key, 600, jwt);
                    res.json({getFrom:"mongodb",token:jwt});
                }
            }
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserByAccountNumber = async (req,res) => {
    try {
        let key = `getUserByAccountNumber-${req.params.accountNumber}`;
        let get = await promisify(redis().get).bind(redis());
        let data = await get(key);
        if (data) {
            let obj = JSON.parse(data);
            res.json({getFrom:"redis",obj});
        } else {
            let user = await User.findOne({accountNumber:req.params.accountNumber});
            if(!user) return res.status(404).json({message: "User not found"}); 
            redis().setex(key, 600, JSON.stringify(user));
            res.json({getFrom:"mongodb",user});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserByIdentityNumber = async (req,res) => {
    try {
        let key = `getUserByIdentityNumber-${req.params.identityNumber}`;
        let get = await promisify(redis().get).bind(redis());
        let data = await get(key);
        if (data) {
            let obj = JSON.parse(data);
            res.json({getFrom:"redis",obj});
        } else {
            let user = await User.findOne({identityNumber:req.params.identityNumber});
            if(!user) return res.status(404).json({message: "User not found"}); 
            redis().setex(key, 600, JSON.stringify(user));
            res.json({getFrom:"mongodb",user});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUsers = async (req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const createUser = async (req,res) => {
    const user = new User(req.body);
    try {
        user.password = await hashPwd(user.password);
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const updateUser = async (req,res) => {
    const cekId = await User.findById(req.params.id);
    if(!cekId) return res.status(404).json({message: "Data not found"}); 
    try {
        req.body.password = await hashPwd(req.body.password);
        const updatedUser = await User.updateOne({_id: req.params.id}, {$set: req.body});
        res.status(200).json({message:"Success"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({message: "Data not found"});
    try {
        let key = `login-${user.username}`;
        const deletedUser = await User.deleteOne({_id: req.params.id});
        redis().del(key);
        res.status(200).json({message:"Success"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}