const {appError, catchAsync} = require('../utils/CatchError');
const Song = require('../models/songModel');
const Playlist = require('../models/savedPlaylistModel');

const ytdl = require('ytdl-core');
const { NFTStorage, Blob } = require('nft.storage');
const axios = require('axios');

const token = process.env.NFT_STORAGE_API_KEY;
const endpoint = 'https://api.nft.storage'

const fetch = require('node-fetch');

exports.uploadSong = catchAsync(async (req, res, next) => {
    const {url, song: customSong, artist: customArtist} = req.body;

    const getSongInfoFromYtdl = async (url) => {
        const info = await ytdl.getInfo(url);
        const format = info.formats.filter(i => i.mimeType.includes("audio/mp4"));
        return {
            url : format[0].url,
            title: info.videoDetails.title,
            song: info.videoDetails.media.song,
            artist: info.videoDetails.media.artist,
            duration: info.videoDetails.lengthSeconds,
            image: info.videoDetails.thumbnails[0].url
        };
    };

    const songInfo = await getSongInfoFromYtdl(url);

    if(customSong) {
        songInfo.song = customSong;
        songInfo.artist = customArtist;
    }

    if(!songInfo.song) return next(new appError("undefined", 401));

    const isDownloaded = async (song, title) => {
        const music = await Song.find().select(["title", "song"]);
        const songDownloaded = music.some(el => el.song.toLowerCase() === song.toLowerCase() );
        const titleDownloaded = music.some(el => el.title.toLowerCase()  === title.toLowerCase());
        const alreadyDownloaded = songDownloaded && titleDownloaded ? true : false;
        return alreadyDownloaded;
    };

    const downloaded = await isDownloaded(songInfo.song, songInfo.title);

    if(downloaded) return next(new appError("duplicate", 401));

    const downloadSongAsBufferFromUrl = async (url) => {
        const downloadUrl = await fetch(url);
        const bufferAudio = await downloadUrl.buffer();
        return bufferAudio;
    }

    const bufferedAudio = await downloadSongAsBufferFromUrl(songInfo.url)

    const uploadToStorage = async (bufferedAudio) => {
        const storage = new NFTStorage({ endpoint, token })
        const cid = await storage.storeBlob(new Blob([bufferedAudio]));
        return cid;
    }
    
    const cid = await uploadToStorage(bufferedAudio);

    const data = {
        ...songInfo,
        url: `https://${cid}.ipfs.dweb.link`,
    }

    const song = await Song.create(data);
    await Playlist.create({song: song._id, user: req.user.id});

    res.status(201).json({
        status: "success",
        song,
    });
});

exports.searchSongs = catchAsync(async(req, res, next) => {  
    const {title} = req.params;

    const songs = await Song.find({title: {$regex: new RegExp(title, "i") }}).limit(50);

    res.status(200).json({
        status: "success",
        songs,
    });
});

exports.getSongs = catchAsync(async(req, res, next) => {

    const songs = await Song.find().sort({createdAt: -1}).limit(25);

    res.status(200).json({
        status: "success",
        songs,
    });
});

exports.deleteSong = catchAsync(async(req, res, next) => {

    const musicID = req.params.id;

    const music = await Song.findById(musicID);

    const cid = music.url.replace("https://", "").split(".")[0]

    const endpoint = `https://api.nft.storage/${cid}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // delete from nft.storage
    await axios.delete(endpoint, config);
    // delete from mongodb
    await Song.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "success",
    });
});

exports.incrementSongPlayed = catchAsync(async(req, res, next) => {

    const id = req.params.id;

    await Song.findByIdAndUpdate(id, {$inc: {played: 1}}, {new: true})

    res.status(200).json({
        status: "success",
    });
});