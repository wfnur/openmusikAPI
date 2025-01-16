require('dotenv').config();

const Hapi = require('@hapi/hapi');

const album = require('./api/albums');
const AlbumService = require('./services/AlbumServices');
const AlbumValidator = require('./validator/album');
const songs = require('./api/songs');
const SongServices = require('./services/SongServices');
const SongValidator = require('./validator/song');
 
const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongServices();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
 
  await server.register([
    {
      plugin: album,
      options: {
        service: albumService,
        validator: AlbumValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator: SongValidator,
      },
    },
  ]);
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();