const express = require('express');

const app = express();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`server started on port : ${PORT}`))

app.get("/test", (req, res) => {
    res.send("it works")
});