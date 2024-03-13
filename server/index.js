const express = require('express');
const app = express();
const port = 8024;

app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
