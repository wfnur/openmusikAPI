const mapAlbumDBToModel = ({ 
    id,
    name,
    year,
    created_at,
    updated_at,
  }) => ({
    id,
    name,
    year,
    createdAt: created_at,
    updatedAt: updated_at,
  });


const mapSongListDBToModel = ({ 
    id,
    title,
    performer,
    
  }) => ({
    id,
    title,
    performer,
  });

const mapSongDBToModel = ({ 
    id,
    title,
    year,
    performer,
    genre,
    duration,
    albumid
    
  }) => ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    albumid

  });

module.exports = { mapAlbumDBToModel,mapSongListDBToModel,mapSongDBToModel };