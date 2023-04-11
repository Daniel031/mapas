const express = require('express');
const app = express();

const PORT = 3000;


app.set('port',PORT); 

app.use(express.static(__dirname.replace('src','public/')));



app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  });