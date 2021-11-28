const { Contact } = require('../../models')

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const { favorite } = req.body
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    )
    if (!result) {
      const error = new Error('Contact not found')
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

module.exports = updateStatusContact
