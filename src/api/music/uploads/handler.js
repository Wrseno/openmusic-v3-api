const autoBind = require('auto-bind');

class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postUploadAlbumCoverUrlHandler(request, h) {
    const { id: albumId } = request.params;
    const { cover } = request.payload;
    this._validator.validateAlbumCoverUrl(cover.hapi.headers);

    const filename = await this._service.writeFile(cover, cover.hapi);
    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`;
    await this._service.updateAlbumCoverUrl(coverUrl, albumId);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });

    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
