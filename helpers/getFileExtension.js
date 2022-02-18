const getFileExtension = (validExtensions, fileName) => {

    const nameSplitted = fileName.split('.');
    const extensionFile = nameSplitted[nameSplitted.length - 1];
    if (validExtensions.includes(extensionFile)) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    getFileExtension
}