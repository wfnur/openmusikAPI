const ClientError = require('../../exceptions/ClientError');

class SongHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async postSongHandler(request, h) {
        try {
          this._validator.validateSongPayload(request.payload);
          const { title, year, genre, performer, duration, albumId } = request.payload;
     
          const SongId = await this._service.addSong({ 
            title, 
            year, 
            genre, 
            performer, 
            duration, 
            albumid: albumId 
          });
     
          const response = h.response({
            status: 'success',
            message: 'Song berhasil ditambahkan',
            data: {
              songId: SongId,
            },
          });
          response.code(201);
          return response;
        } catch (error) {
          if (error instanceof ClientError) {
            const response = h.response({
              status: 'fail',
              message: error.message,
            });
            response.code(error.statusCode);
            return response;
          }
     
          // Server ERROR!
          const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
          });
          response.code(500);
          console.error(error);
          return response;
        }
    }

    async getSongsHandler(request, h) {
        const songs = await this._service.getSongs();
        return {
          status: 'success',
          data: {
            songs,
          },
        };
    }

    async getSongByIdHandler(request, h) {
        try {
          const { id } = request.params;
          const song = await this._service.getSongById(id);
          return {
            status: 'success',
            data: {
              song,
            },
          };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                  status: 'fail',
                  message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
        
            // Server ERROR!
            const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }        
    }

    async putSongByIdHandler(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);
            const { id } = request.params;
            const { title, year, genre, performer, duration, albumId } = request.payload;
     
            await this._service.editSongById(id, {
                title,
                year,
                genre,
                performer,
                duration,
                albumid: albumId,
            });
     
            return {
                status: 'success',
                message: 'Song berhasil diperbarui',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                  status: 'fail',
                  message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
        
            // Server ERROR!
            const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async deleteSongByIdHandler(request, h) {
        try {
          const { id } = request.params;
          const Song = await this._service.getSongById(id);
          await this._service.deleteSongById(id);
          return {
            status: 'success',
            message: 'Catatan berhasil dihapus',
          };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                  status: 'fail',
                  message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
        
            // Server ERROR!
            const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = SongHandler;