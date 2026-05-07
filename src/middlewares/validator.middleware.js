const { validationResult } = require("express-validator")

module.exports = new (class {
  validationBody(req, res, next, helperFunction) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      const errors = result.array()
      const messages = []
      errors.forEach((err) =>
        messages.push({ field: err.path, error: err.msg })
      )

      if (helperFunction) helperFunction(req, res)

      return res.status(401).send(messages)
    } else {
      return next()
    }
  }

  validate(helperFunction = null) {
    return function (req, res, next) {
      this.validationBody(req, res, next, helperFunction)
    }
  }
})()