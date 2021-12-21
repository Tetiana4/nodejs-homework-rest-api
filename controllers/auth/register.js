const gravatar = require('gravatar')
const { User } = require('../../models')
const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')
const bcrypt = require('bcryptjs')
const { sendEmail } = require('../../helpers')

const register = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with ${email} already exist`)
  }
  const avatarURL = gravatar.url(email)
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const verifyToken = nanoid()

  const mail = {
    to: email,
    subject: 'Confirm email',
    html: `<a target = "_blank" href="http://localhost:3000/api/users/verify/${verifyToken}>Confirm your email</a>`,
  }

  await sendEmail(mail)

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verifyToken,
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
