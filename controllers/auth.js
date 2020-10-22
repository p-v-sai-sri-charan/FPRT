import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req, res) => {
  try {
    const {email, password, userName} = req.body
    const candidate = await User.findOne({email})
    if(candidate) {
      return res.status(400).json({message: 'User exists'})
    }
    const hashPassword = await bcrypt.hash(password, 8)
    const user = new User({
      email,
      userName,
      password: hashPassword
    })
    await user.save()
    const token = jwt.sign({
      userId: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: '10h'
    })
    res.status(201).json({
      message: 'User created', token,
      userName:user.userName,
      imageUrl:user.imageUrl,
      userId:user._id
    })
  } catch(e) {
    res.status(500).json(e)
  }
}

export const login = async(req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) {
      return res.status(400).json({message: 'User does not exists'})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(400).json({message: 'Invalid password'})
    }
    const token = jwt.sign({
      userId: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: '10h'
    })
    res.status(200).json({
      message: 'User connected', token,
      userName:user.userName,
      imageUrl:user.imageUrl,
      userId:user._id
    })
  } catch(e) {
    res.status(500).json(e)
  }
}

export const updateprofilepic =(req,res)=>{
  console.log(req.body.pic)
  User.findByIdAndUpdate(req.params.id,{$set:{pic:req.body.pic}},{new:true},
    (err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        res.json(result)
})
}

export const updatepassword = async(req,res)=>{
  console.log(req.body.password)
  const hashPassword = await bcrypt.hash(req.body.password, 8)
  User.findByIdAndUpdate(req.params.id,{$set:{password:hashPassword}},{new:true},
    (err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        console.log(result)
        res.json(result)
})
}

export const getdatabyid = (req,res)=>{
  const id = req.params.id
  console.log(id)
  User.findOne({_id:id}).select("_id userName email pic ")
  .then((user) => {
    console.log(user)
    res.json({ user:user });
  })
  .catch((err) => {
    console.log(err);
  });

}