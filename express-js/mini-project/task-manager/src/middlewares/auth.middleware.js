export const authMiddleware = (req,res, next) => {
    if(req.session && req.session.user) {
        return next();
    }

    res.status(401).send({message: "Unauthorized: Please login to access this resource"});
}