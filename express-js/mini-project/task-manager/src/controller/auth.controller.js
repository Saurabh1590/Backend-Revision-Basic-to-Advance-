export const Login = (req,res)=> {
    const {username} = req.body;

    if(!username) {
        res.status(400).send({message: "Username is required"});
    }
    req.session.user = {username};
    res.cookie("username", username, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24});
    res.json({message: "Login Successful", username});
}

export const Logout = (req,res)=> {
    res.clearCookie("username");
    req.session.destroy((err)=> {
        if(err) {
            return res.status(500).send({message: "Logout Failed"});
        }   
        res.json({message: "Logout Successful"});
    });
}