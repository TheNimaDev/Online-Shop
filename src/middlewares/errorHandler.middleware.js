module.exports = async (err, req, res, next) => {
    if (err.message.title == "validationError") {
        res.status(err.status).send(err.message)
    } else {
        let status = err?.status
        if (!status || isNaN(+status) || status > 511 || status < 200) status = 500
        res.status(status).json({
            message: err?.message ?? "InternalServerError"
        })
    }
    console.log(err);
    
}