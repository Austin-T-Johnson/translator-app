const express = require("express");
const app = express();
// const path = require('path');
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/api/test", async (req,res) => {
    res.status(200).send({message:'Hello from API'})
})


app.use((req, res, next) => {
	const error = new Error("Not Found");
	res.status(404);
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});


module.exports = app;