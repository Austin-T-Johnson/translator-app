const express = require("express");
const cors = require('cors');
const app = express();
// const path = require('path');
const bodyParser = require("body-parser");
const path = require('path');
const { default: axios } = require("axios");
const config = require('./config.json');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs-extra');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient();

let API_KEY = config.API_KEY;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/static', express.static(path.join(__dirname + '/static')));

app.post("/api/test", async (req,res) => {
	let text = req.body.text;
	let language = req.body.language || 'en';
	console.log(text);
	let post = {
	"input": {
		"text": text
	},
	"voice": {
		"languageCode": language,
		"name": "string",
		"ssmlGender": "MALE"
	  },
	  "audioConfig":{
		"audioEncoding":"MP3" ,
		"speakingRate": 1,
		"pitch": 1,
		"volumeGainDb": 1,
	//	"sampleRateHertz": 48000
	  }
		
	  }
		let {data} =  await axios.post("https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyDXaZPPu4oVgU8qUztd52dswQ804wjcPLY", post)
		let audioContent = data.audioContent;
		const writeFile = util.promisify(fs.writeFile);
		var buf = Buffer.from(audioContent, 'base64');
		await writeFile('output.mp3', buf, {overwrite:true} );

		fs.move('output.mp3', './static/output.mp3', {overwrite:true})
		
	
		function randomIntFromInterval(min, max) { // min and max included 
			return Math.floor(Math.random() * (max - min + 1) + min)
		}
	  res.status(200).send({message:'Success', audio_file:`http://localhost:3001/api/static/output.mp3?key=${randomIntFromInterval(0,1000)}`})
	  
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