// const router = require('express').Router
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const { unauthorized, notFound } = require('../lib/errorMessage')


async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (err) {
    // console.log('***', err)
    next(err)
  }
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    
    if (!user || !user.validatePassword(req.body.password)){
      throw new Error(unauthorized)
    }
    const token = jwt.sign(
      { sub: user._id },
      secret,
      { expiresIn: '7 days' }
    )
    res.status(202).json({
      message: `Welcome back Glamper ${user.username}`,
      token
    })

  } catch (err) {
    // console.log(err)
    next(err)
  }
}

async function profile(req, res, next) {
  console.log('req.currentUser._id', req)
  try {
    const user = await User.findById(req.currentUser._id)
      .populate('createdLocations')
    console.log('**', user)
    if (!user) throw new Error(notFound)
    res.status(200).json(user)
  } catch (err){
    next(err)
  }
}

async function local(req, res, next) {
  const { email, username, password, passwordConfirmation } = req.body
  try {

    let user = await User.findOne({ email })
    if (user) {
      return res.status(401).json({ msg: 'User not authorised.' })
    }
    
    user = new User({
      username,
      email,
      password,
      passwordConfirmation,
      isLocal: true
    })

    await user.save()


    res.json(user)

  } catch (err) {
    next(err)
  }
}

async function becomeLocal(req, res, next) {
  try {

    const user = await User.findById(req.currentUser._id)

    user.isLocal = true

    await user.save()

    res.json(user)
  } catch (err) {
    next(err)
  }

}

module.exports = {
  register, 
  login,
  profile,
  local,
  becomeLocal
}

