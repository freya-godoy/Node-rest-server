import jwt from 'jsonwebtoken';

const generarJWT = ( uid = '') => {

    return new Promise((resolve, reject) => {
        const playload = { uid };

        jwt.sign(playload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'

        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo jenerar el token')
            }else{
                resolve( token );
            }
        })
    })
}

export { generarJWT }