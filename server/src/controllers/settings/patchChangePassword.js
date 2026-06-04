import bcrypt from "bcryptjs"
import User from "../../models/users.js"

export const patchChangePassword = async (req, res) => {
    try {
        const { userID } = req.user;

        const { password, newPassword } = req.body;

        const userData = await User.findById(userID, {password : 1});

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if (!isPasswordCorrect){
            return res.status(400).send("Invalid password. Please try again");
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        await User.updateOne({ _id: userID }, { password : encryptedPassword });

        return res.status(200).send("Password changed succesfully");
    } catch (err) {
        return res.status(500).send("Something went wrong. Please try again");
    }
}