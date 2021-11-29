const { Contact } = require('../../models')

const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Contact.findById(id)
    if (!result) {
      const error = new Error(`Contact with id=${id} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = getById
