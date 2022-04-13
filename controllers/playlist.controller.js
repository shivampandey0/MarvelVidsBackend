const Playlist = require("../models/playlist.model");
const { concat } = require("lodash");

const findUserPlaylist = async (req, res, next) => {
  try {
    const { user } = req;
    let playlist = await Playlist.findOne({ userId: user._id });

    if (!playlist) {
      playlist = new Playlist({
        userId: user._id,
        playlists: [{ name: "Watch Later", videos: [], active: true }],
      });
      playlist = await playlist.save();
    }
    req.playlist = playlist;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive user's playlists",
      errorMessage: error.message,
    });
  }
};

const getActivePlaylistItems = async (playlist) => {
  playlist.playlists = playlist.playlists = playlist.playlists.filter(
    (list) => list.active
  );
  for (let list of playlist.playlists) {
    if (list.videos.length > 0) {
      list.videos = list.videos.filter((video) => video.active);
    }
  }
  return playlist.playlists;
};

const getUserPlaylist = async (req, res) => {
  try {
    let { playlist } = req;
    const playlistItems = await getActivePlaylistItems(playlist);
    res.json({ success: true, playlist: playlistItems });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive the playlist",
      errMessage: err.message,
    });
  }
};

const createPlaylist = async (req, res) => {
  const { name, _id } = req.body;
  let { playlist } = req;
  let newList = {
    name,
    videos: [{ _id, active: true }],
    active: true,
  };
  playlist.playlists = concat(playlist.playlists, newList);
  let updatedPlaylist = await playlist.save();
  newList = updatedPlaylist.playlists[updatedPlaylist.playlists.length - 1];
  res.status(201).json({ success: true, playlist: newList });
};

const findPlaylistById = (req, res, next, listId) => {
  const { playlist } = req;
  let list = playlist.playlists.find((list) => list._id == listId);
  if (!list) {
    return res.status(500).json({
      success: false,
      message: "Unable to retrive specific playlist",
    });
  }
  req.list = list;
  next();
};


const getActiveVideos = (videoList) => {
  videoList = videoList.filter((item) => item.active);
  return videoList.map((item) => item._id);
};

const getPlaylistVideos = (req, res) => {
  const {list} = req;
  playlistVideos = getActiveVideos(list.videos);
  res.json({ success: true, playlist: playlistVideos });
};

const getVideosInPlaylist =  (playlist, listId) => {
  let playlistItem = playlist.playlists.find((item) => item._id == listId && item.active);
  if (!playlistItem) {
    throw Error("Playlist item not found. It may either be deleted or not created");
  }
  return playlistItem.videos;
}

const updatePlaylistVideo = async (req, res) => {
  const {list, playlist} = req;
  const { _id } = req.body;
  let playlistVideos = list.videos.map(item => item._id);
  const videoExists = playlistVideos.some((item) => item == _id);

  for (let listItem of playlist.playlists) {
    if (listItem._id == list._id) {
      if (videoExists) {
        for (let video of list.videos) {
          if (video._id == _id) {
            video.active = !video.active;
            break;
          }
        }
      } else {
        listItem.videos.push({ _id, active: true });
        break;
      }
    }
  }

  let updatedPlaylist = await playlist.save();
  playlistVideos = getVideosInPlaylist(updatedPlaylist, list._id);
  playlistVideos = getActiveVideos(playlistVideos);
  res.json({ success: true, playlist: playlistVideos });
};


const updatePlaylistName = async (req, res) => {
  const { name } = req.body;
  let { playlist, list } = req;
  for (let listItem of playlist.playlists) {
    if (listItem._id == list._id) {
      listItem.name = name;
      break;
    }
  }
  let updatedPlaylist = await playlist.save();
  updatedPlaylist = await getActivePlaylistItems(updatedPlaylist);
  res.json({ success: true, playlist: updatedPlaylist });
};


const deletePlaylist = async (req, res) => {
  let { playlist, list } = req;
  
  for (let listItem of playlist.playlists) {
    if (listItem._id == list._id) {
      listItem.active = false;
      break;
    }
  }
  playlist.playlists[0].active = true; // Watch later is always true
  let updatedPlaylist = await playlist.save();
  updatedPlaylist = await getActivePlaylistItems(updatedPlaylist);
  res.json({ success: true, playlist: updatedPlaylist });
};

module.exports = {
  findUserPlaylist,
  findPlaylistById,
  getUserPlaylist,
  createPlaylist,
  updatePlaylistName,
  deletePlaylist,
  getPlaylistVideos,
  updatePlaylistVideo,
};
