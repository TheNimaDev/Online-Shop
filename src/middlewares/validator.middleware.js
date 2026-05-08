const { validationResult } = require("express-validator")
const createHttpError = require("http-errors")

module.exports = new (class {
  validationBody(req, res, next, helperFunction) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      const theErrors = result.array()
      const errors = []
      theErrors.forEach((err) =>
        errors.push({ field: err.path, error: err.msg })
      )

      if (helperFunction) helperFunction(req, res)

      throw new createHttpError.BadRequest({ title: "validationError", errors })
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