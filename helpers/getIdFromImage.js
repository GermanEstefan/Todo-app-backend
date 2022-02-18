const getIdFromImage = (url) => {
    if (url.includes('no-avatar')) {
        return false;
    } else {
        const urlImageSplitted = url.split('/');
        const idWithExtension = urlImageSplitted[urlImageSplitted.length - 1];
        return idWithExtension.split('.')[0];
    }

}

module.exports = {
    getIdFromImage
}