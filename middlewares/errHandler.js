function errHandler(err, req, res, next) {
    console.log(err)

    let status = null
    let message = {}

    if (err.code === 404) {
        status = 404
        message.err = 'Data Not Found'
    }

    res.status(status).json(message)
}

module.exports = errHandler