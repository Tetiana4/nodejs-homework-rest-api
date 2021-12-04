const express = require('express')

const { auth, validation, ctrlWrapper } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user')

const router = express.Router()

router.post(
  '/signup',
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
)

router.post('/signin', validation(joiLoginSchema), ctrlWrapper(ctrl.login))
router.get('/signout', auth, ctrlWrapper(ctrl.logout))
module.exports = router
