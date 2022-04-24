const {appError, catchAsync} = require('../utils/catchError');
const Song = require('../models/songModel');
const SavedPlaylist = require('../models/savedPlaylistModel');

const axios = require('axios');

const nftstorage = (cid) => {

    const token = process.env.NFT_STORAGE_API_KEY;

    const endpoint = `https://api.nft.storage/${cid}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return{
        config,
        endpoint
    }
}

exports.deleteSong = catchAsync(async(req, res) => {

    const musicID = req.params.id;

    const music = await Song.findById(musicID);

    const cid = music.cid;

    const {endpoint, config} = nftstorage(cid);

    // delete from nft.storage
    await axios.delete(endpoint, config).catch(() => console.log("cid already removed, continue next operation"));
    // delete from mongodb
    await Song.findByIdAndDelete(musicID);

    await SavedPlaylist.deleteMany({song: musicID});

    res.status(200).json({
        status: "success",
    });
});

exports.updateSong = catchAsync(async(req, res) => {
    const data = req.body;

    const song = await Song.findByIdAndUpdate(data._id, data, {new: true});

    res.status(200).json({
        status: "success",
        song
    });
});

exports.deleteAllFromStorage = catchAsync(async(req, res) => {
    const songsWithCid = await Song.find({cidRemoved : false});

    for await(const song of songsWithCid) {
        const cid = song.cid;
        const {endpoint, config} = nftstorage(cid);
        await axios.delete(endpoint, config).catch(() => console.log("cid already removed, continue next operation"));
        await Song.findByIdAndUpdate(song._id, {cidRemoved: true}, {new: true});
    };

    res.status(200).json({
        status: "success",
    });
});

exports.updateSongsKeys = catchAsync(async(req, res) => {

    const {key, value} = req.body; 

    const songs = await Song.find();

    for await (const song of songs) {
        await Song.findByIdAndUpdate(song._id, {[key]: value}, {new: true});
    };

    res.status(200).json({
        status: "success",
    });

});