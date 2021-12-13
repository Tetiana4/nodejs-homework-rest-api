const gravatar = require('gravatar')
const { User } = require('../../models')
const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with ${email} already exist`)
  }
  const avatarURL = gravatar.url(email)
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  })

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        result,
      },
    },
  })
}

module.exports = register
