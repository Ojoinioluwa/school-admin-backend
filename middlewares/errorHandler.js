const errorHandler= (err, req, res, next)=> {
    if(err){
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode
        res.status(statusCode).json({
            message: err.message,
            stack:  process.env.NODE_ENV === 'production' ? '🥞 Hidden' : err.stack
        })
    }
}

module.exports = errorHandler