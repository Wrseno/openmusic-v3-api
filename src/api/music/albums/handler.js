const autoBind = require('auto-bind');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum(name, year);

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });

    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const result = await this._service.getAlbumById(id);
    const datas = result.rows;
    let album;

    const dataResponse = {
      id: datas[0].album_id,
      name: datas[0].name,
      year: datas[0].year,
      coverUrl: datas[0].cover_url,
      songs: [],
    };

    if (datas[0].id === null) {
      album = {
        ...dataResponse,
      };
    } else {
      datas.map((data) => {
        if (data.song_id) {
          dataResponse.songs.push({
            id: data.song_id,
            title: data.title,
            performer: data.performer,
          });
        }
      });

      album = {
        ...dataResponse,
      };
    }

    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    await this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;
