const jwt = require('jsonwebtoken');

const createJWT = async (uid) => {

    return new Promise((resolve, rejected) => {

        jwt.sign({uid}, process.env.SECRETJWT, (err, jwt) => {

            try {
                resolve(jwt);
            } catch (error) {
                console.log(error)
                rejected(err);
            }

        })

    })
}

module.exports = createJWT;