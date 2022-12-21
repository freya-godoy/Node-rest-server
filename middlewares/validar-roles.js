import { response } from "express";


const esAdminRole = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quire varificar el role sin validar el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }


    next();
}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quire varificar el role sin validar el token'
            })
        }

        if (!roles.includes(req.usuario.rol).json) {
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${roles}`
            });
        }

        next();
    }
}

const validarRoles = { esAdminRole, tieneRole }

export default validarRoles;