const express = require('express')
const router = express.Router()
const { validation } = require('../../middlewares')
const { joiSchema, favoriteSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

router.get('/', ctrl.getAll)

router.get('/:id', ctrl.getById)

router.post('/', validation(joiSchema), ctrl.add)

router.put('/:id', validation(joiSchema), ctrl.updateById)

router.patch(
  '/:id/favorite',
  validation(favoriteSchema),
  ctrl.updateStatusContact
)

router.delete('/:id', ctrl.deleteById)

module.exports = router
