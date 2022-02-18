const Usuario = require("../models/Usuario");
const bcrypt = require('bcrypt');
const createJWT = require("../helpers/createJWT");
const Note = require("../models/Note");

const createUser = async (req, res) => {

    const { rName, rPassword, rEmail } = req.body;
    const userExist = await Usuario.findOne({ 'email': rEmail });

    if (userExist) {
        return res.status(400).json({
            ok: false,
            msg: `Email ${rEmail} alredy exist`
        })

    } else {
        const hashPassword = bcrypt.hashSync(rPassword, 10);
        const user = Usuario({ name: rName, password: hashPassword, email: rEmail, avatarImage: 'https://res.cloudinary.com/journalappgetest/image/upload/v1645058892/no-avatar_qasru0.png' })
        const jwt = await createJWT(user._id)
        await user.save();
        res.status(201).json({
            ok: true,
            msg: 'User created',
            userData: {
                'name': user.name,
                'email': user.email,
                'avatar': user.avatarImage,
                'token': jwt,
                'todos': []
            }
        })
    }
}

const loginUser = async (req, res) => {

    const { lEmail, lPassword } = req.body;
    const userExist = await Usuario.findOne({ email: lEmail });

    if (userExist) {
        const verifyPassword = bcrypt.compareSync(lPassword, userExist.password);
        if (verifyPassword) {
            const jwt = await createJWT(userExist._id);
            const haveTodos = await Note.find({ userId: userExist._id, state: true })

            const todos = haveTodos.map(field => {
                return {
                    contentNote: field.contentNote,
                    id: field._id,
                    complete: field.completed
                }
            })

            return res.status(200).json({
                ok: true,
                userData: {
                    name: userExist.name,
                    todos,
                    avatar: userExist.avatarImage,
                    token: jwt,

                }
            })
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrect'
            })
        }
    } else {
        return res.status(400).json({
            ok: false,
            msg: `User with email:${lEmail}, dont exist`
        })
    }
}

const verifyToken = async ({ user }, res) => {

    const haveTodos = await Note.find({ userId: user._id, state: true });
    const jwt = await createJWT(user._id);

    const todos = haveTodos.map(field => {
        return {
            contentNote: field.contentNote,
            id: field._id,
            complete: field.completed
        }
    })
    res.status(200).json({
        ok: true,
        userData: {
            name: user.name,
            avatar: user.avatarImage,
            token: jwt,
            todos
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    verifyToken
}


