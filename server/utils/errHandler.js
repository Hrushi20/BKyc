const errHandler = (err,next) => {
    if(err)
        return next(err);

    err  = new Error("Internal sever error");
    next(err);
}

module.exports = { errHandler };