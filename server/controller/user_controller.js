const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { sendOTP } = require('./otp_controller');
secretKey = process.env.secretKey


const userLogIn = async (request, response) => {
    try {
        const user = await User.findOne({ username: request.body.username });

        if (user) {
            if (user.isEmailverified) {
            
                const isPasswordValid = await bcrypt.compare(request.body.password, user.password);

                if (isPasswordValid) {
                    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
                    console.log('login sucess')
                    return response.status(200).json({
                        message: `${user.username} login successful`,
                        token: token,
                        uId: user._id,
                        Data: {

                            isadmin: user.isadmin,
                            name: user.firstname,
                            email: user.email
                        }
                    })


                } else {
                    return response.status(401).json('Invalid Login');
                }
            }
            else {
                return response.status(401).json("Email is not verified"
                )
            }


        } else {
            return response.status(401).json('Invalid Login');
        }
    } catch (error) {
        response.status(500).json({ message: 'Error logging in' });
    }
}


const userSignUp = async (request, response) => {
    try {
        console.log("inside the signUp page")
        console.log(request.body);
        const exist = await User.findOne({
            $or: [
                { username: request.body.username },
                { email: request.body.email }
            ]
        });

        if (exist) {
            if (exist.username === request.body.username) {
                return response.status(401).json({ message: 'Username already exists' });
            } else if (exist.email === request.body.email) {
                return response.status(401).json({ message: 'Email already exists' });
            }

        }

        else {
            request.body.password = await bcrypt.hash(request.body.password, 10);

            const user = request.body;
            otp = await sendOTP(user.email)
            user.otp = otp
            const newUser = new User(user);
            await newUser.save();
            console.log(newUser)
            response.status(200).json({
                message: 'User registered successfully',
                date: {
                    data: user
                }
            });
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: error });
    }
}


const userLogOut = (request, response) => {
    const userToken = request.body.userToken;
    if (!userToken) {
        return response.status(400).json({ message: 'User token not provided' });
    }

    // Clear the specified cookie
    response.clearCookie('userToken');

    // Redirect the user to the login page
    response.redirect('/login');
};


const displayUser = async (request, response) => {

    try {
        console.log("inside display user api")
        const display = await User.find();
        response.status(201).json({
            message: "users data",
            data: {
                data: display
            }
        });

    } catch (error) {
        console.log(error);
        console.log(error);
        response.status(500).json({ message: 'Error while display' });
    }


}
const getUser = async (request, response) => {
    try {
        const display = await User.findOne({ _id: request.params._id });
        console.log(request.params._id)

        if (display) {
            response.status(200).json({
                data:
                    { data: display }
            });
        } else {
            response.status(404).json({ message: 'User not found' });
        }
    } catch (error) {

        console.error(error);
        response.status(500).json({ message: 'Error while fetching user' });
    }
}
const updateUser = async (req, res) => {
    try {
        const userId = req.params._id;
        console.log(userId)
        const data = req.body
        //console.log("request", req.body)
        const updateFields = {};


        // Populate updateFields based on req.body
        if (req.body.firstName) {
            updateFields.firstname = req.body.firstName;
        }
        if (data.lastName) {
            //console.log(data.lastName)
            updateFields.lastname = data.lastName;
            console.log(updateFields.lastname)
        }
        if (req.body.username) {
            updateFields.username = req.body.username;
        }
        if (req.body.phoneNumber) {
            updateFields.phone = req.body.phoneNumber;
        }
        console.log(updateFields)
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                code: 400,
                status: "error",
                message: 'No fields to update',
            });
        }


        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: updateFields },
            { new: true, upsert: false }
        );


        if (!updatedUser) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: 'User not found',
            });
        }

        return res.status(201).json({
            code: 200,
            status: "success",
            message: 'User details updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        console.error('Error while updating user:', error);
        return res.status(500).json({
            code: 500,
            status: "error",
            message: 'Error while updating user details',
        });
    }
};
const deleteUsers = async (req, res) => {

    const userId = req.params._id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}


const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password and update the user's password
        req.body.newPassword = await bcrypt.hash(newPassword, 10);
        user.password = req.body.newPassword;

        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while resetting password' });
    }
};







const changePassword = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({ email: req.body.email });
        //console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }


        const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
        user.password = newPasswordHash;
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while changing password' });
    }
};



module.exports.userSignUp = userSignUp;
module.exports.userLogIn = userLogIn;
module.exports.displayUser = displayUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUsers = deleteUsers;
module.exports.changePassword = changePassword;
module.exports.resetPassword = resetPassword;
module.exports.userLogOut = userLogOut;



