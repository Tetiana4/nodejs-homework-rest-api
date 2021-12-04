const express = require('express')
const router = express.Router()
const { auth, validation, ctrlWrapper } = require('../../middlewares')
const { joiSchema, favoriteSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

router.get('/', auth, ctrlWrapper(ctrl.getAll))

router.get('/:id', ctrlWrapper(ctrl.getById))

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.add))

router.put('/:id', validation(joiSchema), ctrlWrapper(ctrl.updateById))

router.patch(
  '/:id/favorite',
  validation(favoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
)

router.delete('/:id', ctrlWrapper(ctrl.deleteById))

module.exports = router
