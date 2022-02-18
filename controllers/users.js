const { getFileExtension } = require('../helpers/getFileExtension');
const { getIdFromImage } = require('../helpers/getIdFromImage');
const User = require('../models/Usuario');

//Cloudinary config
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'journalappgetest',
    api_key: process.env.APIKEYCLODINARY,
    api_secret: process.env.APIKEYSECRET
});

const uploadImageAvatar = async (req, res) => {

    //Verificamos que vengan archivos en la request
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            msg: 'No files in the request'
        })
    }

    //Validamos que sea una extension correcta
    const validExtensions = ['jpeg', 'jpg', 'png'];
    const fileIsValid = getFileExtension(validExtensions, req.files.avatar.name);
    if (!fileIsValid) {
        return res.status(400).json({
            ok: false,
            msg: `Valid extensions: ${validExtensions.toString()}`,
        })
    }

    /*
        Borramos la imagen anterior solo si el usuario NO tiene la imagen por defecto...
        ya que la utilzamos para todos los users sin avatar.
    */
    const idImageToDelete = getIdFromImage(req.user.avatarImage);
    if (idImageToDelete) { //Si entra en la condicion seignifica que NO tiene la imagen por def
        const imageDestroyedResult = await cloudinary.uploader.destroy(idImageToDelete);
        if (imageDestroyedResult.result === 'not found') {
            return res.status(500).json({
                ok: false,
                msg: 'Error with cloudinary'
            })
        }
    }

    //Actualizamos el avatar del usuario
    const newImageAvatar = req.files.avatar.tempFilePath;
    const response = await cloudinary.uploader.upload(newImageAvatar);
    await User.findByIdAndUpdate(req.user._id, { avatarImage: response.secure_url })

    res.status(291).json({
        ok: true,
        msg: 'Image updated',
        newUrl: response.secure_url
    })

}

module.exports = {
    uploadImageAvatar
}