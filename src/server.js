require('dotenv').config();

const Hapi = require('@hapi/hapi');
const AlbumServices = require('./services/AlbumServices');
//const AlbumValidator = require('./validator/album');
 
const init = async () => {
  const albumService = new AlbumServices();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
 
  await server.register({
    plugin: album,
    options: {
      service: AlbumServices,
      //validator: AlbumValidator,
    },
  });
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();