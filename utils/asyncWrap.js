module.exports = function asyncWrap(fn){
    return (req, res, next)=>{
        fn(req, res, next).catch((err)=>{
            next(err)
        })
    }
};