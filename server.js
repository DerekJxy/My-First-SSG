const path = require('path');
const { version } = require('./package.json');
const { htmlGenerator } = require('./htmlGenerator');
const { mdFileNewFeature } = require('./mdFileNewFeature');
let fs = require('fs');

let argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('This is my awesome program\n\nUsage: $0 [options]')
  .help('help')
  .alias('help', 'h')
  .version('version', version)
  .alias('version', 'v')
  .alias('i', 'input')
  .command('--input', 'filename')
  .options({
    input: {
      alias: 'input',
      demandOption: true,
      default: '.',
      describe: 'convert .txt file to html file',
      type: 'string',
    },
    output: {
      alias: 'o',
      demand: true,
      default: './dist',
      type: 'string',
    },
    lang: {
      alias: 'l',
      demandOption: true,
      default: '.',
      describe: 'generate the lang attribute',
      type: 'string',
    },
    config: {
      alias: 'c',
      //default: 'default.json',
      describe: 'accept a file path to a JSON config file',
      type: 'string',
    },
  }).argv;

// Check ./dist folder
if (fs.existsSync('./dist')) {
  fs.rmdirSync('./dist', { recursive: true });
  fs.mkdir('./dist', (err) => {
    if (err) throw err;
  });
} else {
  fs.mkdir('./dist', (err) => {
    if (err) throw err;
  });
}

if (argv.lang == '.') {
  var lang = 'en-CA';
} else {
  lang = argv.lang;
}

//check for config argument
if (argv.config != null) {
  // When it has a config argument, then do this:
  let notValid = false;
  console.log(`argv.config argument -- '${argv.config}' is not null!`);
  if (fs.existsSync(argv.config)) {
    // contains the json file
    console.log('argv.config is exist!');

    fs.readFile(`${argv.config}`, 'utf8', (err, jsonString) => {
      if (err) {
        console.log('File read failed:', err);
        return;
      }

      let obj = JSON.parse(jsonString);
      obj.input == undefined ? (notValid = true) : (argv.input = obj.input);
      obj.lang == undefined ? (lang = 'en-CA') : (lang = obj.lang);
      obj.output == undefined
        ? (argv.output = './dist')
        : (argv.output = obj.output); // static output path
      if (!notValid) {
        let filePath = fs.statSync(obj.input, obj.lang);
        convert(filePath);
      } else {
        console.log(
          `Input filename is empty in the ${argv.config}! Nothing to convert this time!`
        );
      }
    });
  } else {
    //not such a json file exist
    let errMsg = `Sorry, we can't find your config json file, please try again!!`;
    console.log(errMsg);
    notValid = true;
  }
} else {
  // When it doesn't have a config argument, then do this:
  console.log(`No config argument detected this time! `);
  let filePath = fs.statSync(argv.input, argv.lang);
  convert(filePath);
}

// put the convert code into a function
function convert(filePath) {
  if (filePath.isDirectory()) {
    console.log('argv.input is a folder!');
    fs.readdirSync(argv.input).forEach((file) => {
      //Display all the files in the directory
      //console.log("File name: ", file);
      let fileType = file.split('.').pop();

      //Convert the .txt or .md file into a HTML file
      if (fileType == 'txt' || fileType == 'md') {
        fs.readFile(
          argv.input + '/' + file.toString(),
          'utf-8',
          function (err, fullText) {
            if (err) return console.log(err);
            let fileName = path.parse(file).name;
            //name the file without space
            let validFileName = fileName.split(' ').join('');
            // let validFname = fname[0].split(' ').join('');
            htmlConversion(fileName, validFileName, fileType, fullText);
          }
        );
      }
    });
    console.log('The HTML files have been saved to ./dist!');
  } else {
    console.log('argv.input is not a FOLDER!');
    let fileType = argv.input.split('.').pop();
    //console.log(fileType);

    //convert the .txt or .md file into a HTML file
    if (fileType == 'txt' || fileType == 'md') {
      fs.readFile(argv.input, 'utf8', function (err, fullText) {
        if (err) return console.log(err);

        let fileName = argv.input.split('.');
        //console.log(fname) //[ 'Silver Blaze', 'txt' ]
        let validFileName = fileName[0].split(' ').join('');
        htmlConversion(fileName, validFileName, fileType, fullText);
      });
    } else {
      fileType =
        'Sorry, only .txt and .md files are allowed! Please try again!'; //md
      console.log(fileType);
    }
  }
}

// function mdFileNewFeature(content) {
//   const html = [];
//   content.forEach((e) => {
//     if (e.includes('### ')) {
//       html.push(
//         `<h3>${e.replace('###', '').replace('---', '<hr>')}</h3> <br />`
//       );
//     } else if (e.includes('## ')) {
//       html.push(
//         `<h2>${e.replace('##', '').replace('---', '<hr>')}</h2> <br />`
//       );
//     } else if (e.includes('# ')) {
//       html.push(
//         `<h1>${e
//           .replace('#', '')
//           .replace('---', '<hr>')}</h1> <br /><hr /><br />`
//       );
//     } else {
//       html.push(
//         `<p>${e.replace(/\r?\n/, ' ').replace('---', '<hr>')}</p> <br />`
//       );
//     }
//   });

//   return html;
// }

// function htmlGenerator(lang, title, html, footer) {
//   return typeof html == 'object'
//     ? `<!doctype html>\n` +
//         `<html lang="${lang}">\n<head>\n<meta charset="UTF-8">\n<title>${title}</title>\n` +
//         `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
//         `<body>\n` +
//         `<div class = "container">\n` +
//         `${html.join(' ')}` +
//         `</div>\n</body>\n` +
//         `<footer> \n ${footer}\n</footer>\n</html>`
//     : `<!doctype html>\n` +
//         `<html lang="${lang}">\n<head>\n<meta charset="UTF-8">\n<title>${title}</title>\n` +
//         `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
//         `<body>\n` +
//         `<div class = "container">\n` +
//         `<h1>${title} </h1>\n` +
//         `${html}` +
//         `</div>\n</body>\n` +
//         `<footer> \n ${footer}\n</footer>\n</html>`;
// }

function htmlConversion(fileName, validFileName, fileType, fullText) {
  let footer = '<p class="center">© 2021 OSD600 Seneca</p>';
  if (fileType == 'txt') {
    let t = fullText.split(/\r?\n\r?\n/);
    console.log('Title is :', t[0]);
    let content = t.slice(1, t.length);
    let html = content
      .map((para) => `<p>${para.replace(/\r?\n/, ' ')}</p> </br>`)
      .join(' ');
    let tempHtml = htmlGenerator(lang, t[0], html, footer);
    //Write file
    fs.writeFile(`./dist/${validFileName}.html`, tempHtml, (err) => {
      if (err) throw err;
    });
  } else if (fileType == 'md') {
    let contents = fullText.split(/\r?\n\r?\n/);
    console.log('Title is :', validFileName);
    let html = mdFileNewFeature(contents);
    let tempHtml = htmlGenerator(lang, fileName[0], html, footer);
    //Write file
    fs.writeFile(`./dist/${validFileName}.html`, tempHtml, (err) => {
      if (err) throw err;
    });
  }
}
