const express = require('express');
const path = require('path');
const app = express();

const PORT = 5000;

app.use(express.static('./public'));

console.log(__dirname);
app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/index.html'));
    console.log('reached');
});

app.get('/game_board',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/game_board.html'));
});

app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}....`);
});