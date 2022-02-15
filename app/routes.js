const userRoutes = require('../src/routes/userRoutes');
const authRoutes = require('../src/routes/authRoutes');
const songRoutes = require('../src/routes/songRoutes');
const savedPlaylistRoutes = require('../src/routes/savedPlaylistRoutes');
const customisePlaylistRoutes = require('../src/routes/customisePlaylistRoutes');
const othersPlaylistRoutes = require('../src/routes/othersPlaylistRoutes');

const {errorMessage} = require('../src/utils/catchError');

module.exports = (app) => {

    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/songs', songRoutes);
    app.use('/api/others/playlist', othersPlaylistRoutes);
    app.use('/api/saved/playlist', savedPlaylistRoutes);
    app.use('/api/customise/playlist', customisePlaylistRoutes);

    app.use(errorMessage);
  
};