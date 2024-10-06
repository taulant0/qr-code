import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    { message: "Type in your URL: ", name: "URL" }
  ])
  .then((answers) => {
    const url = answers.URL;
    
  
    const qr_svg = qr.imageSync(url, { type: 'png' });
    const base64QR = `data:image/png;base64,${qr_svg.toString('base64')}`;

   
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QR Code</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
          }
          img {
            width: 200px;
            height: 200px;
            border: 5px solid #008cba;
          }
        </style>
      </head>
      <body>
        <img src="${base64QR}" alt="QR Code" />
      </body>
      </html>
    `;

  
    fs.writeFile('index.html', htmlTemplate, (err) => {
      if (err) throw err;
      console.log('The QR code has been embedded into index.html!');
    });

   
    fs.writeFile('URL.txt', url, (err) => {
      if (err) throw err;
      console.log('The URL has been saved in URL.txt');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('Prompt could not be rendered in the current environment.');
    } else {
      console.error('Something went wrong.', error);
    }
  });
