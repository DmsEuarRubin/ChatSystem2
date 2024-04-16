const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const passwordHasher = require("../lib/passwordHasher");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
    try {
        if(req.body.password){
        await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: await passwordHasher(req, res)
        }).then(data => {
            const accessToken = jwt.sign({ email: data.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
            res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 86400000 });
            return res.status(201).json({message: "User successfully created!", user: data})
        })
    }else return res.status(500).json({message: `Enter the password: KEY=password`})
    
    } catch (error) {
        if(error.message === "notNull Violation: Users.name cannot be null") 
        return res.status(500).json({message: `Enter the username: KEY=name`})
        else if(error.message === "notNull Violation: Users.email cannot be null") 
        return res.status(500).json({message: `Enter the email: KEY=email`})
        else if(error.message === 'повторяющееся значение ключа нарушает ограничение уникальности "Users_email_key"')
        return res.status(500).json({message: `Enter the other email becouse this email already used`})
        else if(error.message === `notNull Violation: Users.name cannot be null,\nnotNull Violation: Users.email cannot be null`)
        return res.status(500).json({message: `Enter the email and username: KEYS=name,email`})
        else {
            console.log(error.message);
            return res.status(500).json({message: `Server error: ${error.name}`})
        }
        
    }
}
const loginUser = async (req, res) => {
    try {
    if(!req.cookies.accessToken){
    if(req.body.email && req.body.password){
        if(await Users.findOne({where: {email: req.body.email}})){
            const info = await Users.findOne({where: {email: req.body.email}});
            bcrypt.compare(req.body.password, info.password, (err, result) => {
                if(err) return res.status(400).json({message: `The password is incorrect!`}) 
                else {
                        if(result){
                            const accessToken = jwt.sign({ email: info.email }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
                            res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 86400000 });
                            return res.status(200).json({message: `You are successfully logging in!`});
                        } else return res.status(400).json({message: `The password is incorrect!`});
                    
            }
            })
            
        } else return res.status(404).json({message: `User not found!`});
    } else return res.status(400).json({message: `Enter the email and password!`});
 } else return res.status(400).json({message: `You can't log in to your account because you're already using another one. Please log out first!`})
    
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: `Server error: ${error.name}`})
        
    }
}
const logoutUser = async (req, res) => {
    try {
            res.clearCookie('accessToken');
            return res.status(200).json({message: `You are logged out!`})
    } catch (error) {
            console.log(error.message);
            return res.status(500).json({message: `Server error: ${error.name}`})
    }
}
module.exports = {
    createUser,
    loginUser,
    logoutUser
}