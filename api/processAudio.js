// /api/test.js
// export default function handler(req, res) {
//   res.status(200).json({ message: 'Serverless function is working!' });
// }

import formidable from 'formidable';

const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const transcribeAudio = async (file) => {
  console.log("DEBUG: start processing");
  console.log(`API KEY: ${process.env.OPENAI_API_KEY}`)


  const filePath = file.filepath;
  const fileName = file.originalFilename;


  const form = new FormData();

  form.append('file', fs.createReadStream(filePath), {
    filename: fileName,
    contentType: 'audio/mp3',
  });
  form.append('model', 'whisper-1');
  form.append('transcriptions', JSON.stringify({ format: 'text' }));

  console.log("DEBUG: form data created");

  const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', form, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      ...form.getHeaders(),
    },
  });

  const text= response.data.text;

  console.log(`Transcript: ${text}`);
};


const processAudio = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
              res.status(500).json({ error: 'An error occurred while processing the audio file.' });
              return;
            }

            const file = files.audio;
            if (!file) {
              res.status(400).json({ error: 'No file was uploaded.' });
              return;
            }

            console.log(`DEBUG: file: ${file}`);
            console.log(`DEBUG: file path: ${file.filepath}`);
            console.log(`DEBUG: file name: ${file.originalFilename}`);

            await transcribeAudio(file);

            res.status(200).json({ message: 'Audio file processed successfully.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the audio file.' });
    }
};

export default processAudio;
