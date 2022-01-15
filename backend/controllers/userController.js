import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const SignUp = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    isAdmin,
    isSeller,
  } = req.body;

  const duplicate_email = await User.findOne({ email: email });
    if (password !== confirm_password) {
        res.status(401).send({ message: 'Password not matching' });
    } else if (duplicate_email) {
        res.status(401).send({ message: 'Email already in use' });
    } else {
        const user = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: bcrypt.hashSync(password, 8),
            isAdmin: isAdmin,
            isSeller: isSeller,
        })
        const createdUser = await user.save();
        res.send({
            _id: createdUser._id,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            isSeller: createdUser.isSeller,
        })

    }
};


const SignIn =  async (req, res) => {
    const {
        email,
        password,  
      } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            res.send({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });

};

export { SignUp, SignIn };
