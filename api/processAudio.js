// /api/test.js
// export default function handler(req, res) {
//   res.status(200).json({ message: 'Serverless function is working!' });
// }

import formidable from 'formidable';

const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

const transcribeAudio = async (file) => {
  console.log("DEBUG: start transcribing audio");
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

  const transcript= response.data.text;

  console.log(`Transcript finished: ${transcript}`);

  return transcript;
};

const generateHTMLNote = async (transcript) => {
  console.log("DEBUG: start generating html note");

  var prompt_lecture_to_html_notes = `I will give you a lecture transcript. I want you to convert this transcript into a student's class note in the form of html with aesthetically appealing CSS. The goal of the note is that it is structurally easier to read and understand. Additional requirement is that it preserves the complete information by drawing reference to specific section of the transcript, logically and chronologically progressive, well organized and structured. Here goes the lecture transcript: `
  
  console.log(`content: ${prompt_lecture_to_html_notes + transcript}`)
  
  const data = {
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: prompt_lecture_to_html_notes + transcript,
      },
    ],
    temperature: 0.7,
  };

  const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
  
    const htmlNote = response.data.choices[0].message.content;

    console.log(`HTML Note generated: ${htmlNote}`);

    return htmlNote;
}

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

            const transcript = await transcribeAudio(file);

            console.log(`Transcript obtained: ${transcript}`);

            const rawHTMLNote = await generateHTMLNote(transcript);
            
            console.log(`rawHTMLNote obtained: ${rawHTMLNote}`);

            res.status(200).json({ message: 'Audio file processed successfully.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the audio file.' });
    }
};

export default processAudio;
