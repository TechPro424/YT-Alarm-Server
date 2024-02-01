"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const fs_1 = __importDefault(require("fs"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
const temppath = path_1.default.resolve(__dirname, 'temp');
if (!(fs_1.default.existsSync(temppath)))
    fs_1.default.mkdirSync(temppath);
const songpath = path_1.default.resolve(temppath, 'song.mp3');
app.get('/', async (req, res) => {
    console.log(req.body);
    const stream = (0, ytdl_core_1.default)(req.body.url, { quality: 'highestaudio' });
    const process = (0, fluent_ffmpeg_1.default)({ source: stream });
    process.saveToFile(songpath);
    res.status(200).contentType('audio/mp3');
    res.sendFile(songpath);
    fs_1.default.rm(songpath, (i) => {
        console.log(i);
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
