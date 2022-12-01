const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const readline = require('readline');
const ffmpeg = require('fluent-ffmpeg');
app.use('/static', express.static('./static'));


app.get('/', (req, res) => { 
    res.sendFile('index.html', { root: './' });
});

app.get('/download', (req, res) => {
    var url = req.query.url;    

    const stream = ytdl(url, {
        quality: 'highestaudio',
    });
    
    let start = Date.now();

    ffmpeg(stream)
    .audioBitrate(128)
    .save(`static/audio1.mp3`)
    .on('progress', p => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${p.targetSize}kb downloaded`);
    })
    .on('end', () => {
        console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
        res.redirect('/');
    });
});

app.listen(80, () => { 
    console.log("sdjskdjsjdslkd");
});
