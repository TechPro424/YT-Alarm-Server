import express, { response } from 'express'
import ytdl from 'ytdl-core'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'

const app = express()
app.use(express.json())
const port = 3000

const temppath = path.resolve(__dirname, 'temp')
if(!(fs.existsSync(temppath))) fs.mkdirSync(temppath);
const songpath = path.resolve(temppath, 'song.mp3')


app.get('/', async (req, res) => {
    console.log(req.body)

    const stream = ytdl(req.body.url, { quality: 'highestaudio' })
    const process = ffmpeg({source:stream})
    process.saveToFile(songpath)
    

    
    res.status(200).contentType('audio/mp3')

    res.sendFile(songpath)

    //issue: file not being deleted
    fs.rm(songpath, () => {})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})