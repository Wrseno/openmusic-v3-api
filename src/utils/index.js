const mapSongs = ({
  id, title, year, performer, genre, duration, albumid,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: albumid,
});

const mapPlaylists = ({ id, name, owner }) => ({
  id,
  name,
  username: owner,
});

module.exports = { mapSongs, mapPlaylists };
