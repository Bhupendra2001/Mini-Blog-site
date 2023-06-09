
const authorModel = require("../Models/AuthorModel")
const jwt  = require("jsonwebtoken")
const validation = require("../validation/validations")
require('dotenv').config()
const keys = process.env.Auth_key

let {   validName ,  isValidEmail ,  isValidTitle , isValidPassword  } = validation


const createdAuthor = async function(req, res){
     try{
        const data = req.body;
       
        let { fname , lname , title , email, password } = data
        if(!fname || !lname || !title || !email || !password){
        return res.status(400).send({ status : "false" , message : " fname , lname , title , email & password All field are mandatory"})
        }
        if(!validName(fname)){
        return res.status(400).send({status : "false", message : "first name must be in alphabet"})
        }
        if(!validName(lname)){
        return res.status(400).send({status : "false", message : "last name must be in alphabet"})
        }
        if(!isValidTitle(title)){
        return res.status(400).send({status : "false", message : "valid title given"})
        }
        if(!isValidEmail(email)){
        return res.status(400).send({status : "false", message : "provide a valid email"})
        }
        if(!isValidPassword(password)){
          return res.status(400).send({status : "false", message : "provide a valid password"})
        }
        
        let uniqueEmail = await authorModel.findOne({email})
        if(uniqueEmail) return res.status(400).send( {status : false ,message : "email should be unique"})

        const result = await authorModel.create(data)
        return res.status(201).send({ status : true , msg : "data created successfully",data : result})
        }
        catch(err) {
        return res.status(500).send({ status : false , msg : err.message})
        }
}

const login=async function(req,res)
{
  try{
        const email=req.body.email
        const password=req.body.password
        let author=await authorModel.findOne({email:email, password:password})
        if(!author){
        return   res.status(404).send({status : false , message: "invalid email or password"})
        }
        let authorId=author._id
        let token =jwt.sign({
        authorId : authorId   
        },keys)
        return  res.status(201).send({status: true ,Token: token})
      }catch(err)
      {
        return res.status(500).send({ status : false , msg : err.message})
      }
}

module.exports = { login , createdAuthor }
