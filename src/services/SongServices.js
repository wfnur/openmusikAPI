const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');
const { mapSongListDBToModel,mapSongDBToModel } = require('../utils');
const NotFoundError = require('../exceptions/NotFoundError');

 
class SongServices {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({ title,year,genre,performer,duration,albumid }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO SONGS VALUES($1, $2, $3, $4, $5,$6,$7,$8,$9) RETURNING id',
            values: [id, title,year,genre,performer,duration,albumid , createdAt, updatedAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Song gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getSongs() {
        const result = await this._pool.query('SELECT * FROM Songs');
        return result.rows.map(mapSongListDBToModel);
    }

    async getSongById(id) {
        const query = {
          text: 'SELECT * FROM Songs WHERE id = $1',
          values: [id],
        };
        const result = await this._pool.query(query);
     
        if (!result.rows.length) {
          throw new NotFoundError('Song tidak ditemukan');
        }
     
        return result.rows.map(mapSongDBToModel)[0];
    }

    async editSongById(id, { title, year, genre, performer, duration }) {
        const updatedAt = new Date().toISOString();
        const query = {
          text: 'UPDATE Songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, updated_at = $6 WHERE id = $7 RETURNING id',
          values: [title, year, genre, performer, duration, updatedAt, id],
        };
     
        const result = await this._pool.query(query);
     
        if (!result.rows.length) {
          throw new NotFoundError('Gagal memperbarui Song. Id tidak ditemukan');
        }
    }

    async deleteSongById(id) {
        const query = {
          text: 'DELETE FROM Songs WHERE id = $1',
          values: [id],
        };
     
        const result = await this._pool.query(query);
    }
}

module.exports = SongServices;