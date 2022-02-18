const { verify } = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validateJWT = async (req, res, next) => {

    const token = req.headers['access-token'];

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token in the request'
        })
    }

    try {
        const { uid } = verify(token, process.env.SECRETJWT);
        
        const existUser = await Usuario.findById(uid);
        if (!existUser) {
            return res.status(401).json({   //Capa extra de seguridad...
                ok: false,
                msg: 'No existe ningun usuario con esta ID en nuestra BD'
            })
        }

        req.user = existUser;
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();

}

module.exports = validateJWT;