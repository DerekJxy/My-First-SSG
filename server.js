const path = require("path");
const { version } = require('./package.json');
let fs = require('fs');

let argv = require('yargs/yargs')(process.argv.slice(2))
.usage('This is my awesome program\n\nUsage: $0 [options]')
.help('help').alias('help', 'h')
.version('version', version).alias('version', 'v')
.alias('i', 'input')
.command("--input", "filename")
.options({
  input: {
    alias: 'input',
    demandOption: true,
    default: '.',
    describe: 'convert .txt file to html file',
    type: 'string'
  },
  output: {
    alias: 'o',
    demand: true,
    default: './dist',
    type: 'string'
  },
  lang: {
    alias: 'l',
    demandOption: true,
    default: '.',
    describe: 'generate the lang attribute',
    type: 'string'
  },
  config: {
    alias: 'c',
    describe: 'json file to specify options'
  }
})
.argv;

//Parse and use config file if present:
if(argv.config){
  if(fs.existsSync(argv.config)){
    if(path.extname(argv.config).toLocaleLowerCase() == '.json'){
      let fileContents = fs.readFileSync(argv.config);

      try{
        configData = JSON.parse(fileContents);
      }
      catch(err){
        console.log('Error while parsing JSON: ', err);
        process.exit(-1);
      }

      //Assigning options from config to argv (which is being used directly to generate HTML)
      argv.input = configData.input;
      argv.output = configData.output ? configData.output : './dist'; //Does not work due to Issue #12
      argv.lang = configData.lang ? configData.lang : 'en-CA';

    }
    else {
      console.log("Config file must be JSON!", path.extname(argv.config));
      process.exit(-1);
    }
  }
  else {
    console.log("Config file missing!");
    process.exit(-1);
  }
}

// Check ./dist folder
if(fs.existsSync("./dist")){
    fs.rmdirSync("./dist",{recursive: true});
    fs.mkdir("./dist", err=>{
      if(err) throw err;
    });
  } 
else{
  fs.mkdir("./dist", err=>{
    if(err) throw err;
  });
}

//Define variables

let stats = fs.statSync(argv.input, argv.lang);
let tempHtml;
let footer = '<p class="center">© 2021 OSD600 Seneca</p>';
let fileType ='';

if(argv.lang == '.'){
  lang = "en-CA";
}else{
  lang = argv.lang;
}

if(stats.isDirectory()){
  fs.readdirSync(argv.input).forEach(file =>{

    //Display all the files in the directory
    console.log("File name: ", file);
    fileType = file.split('.').pop(); 

    //Convert the .txt or .md file into a HTML file
    if(fileType == 'txt' || fileType == 'md'){
    fs.readFile(argv.input + "/"+ file.toString(), 'utf-8', function(err, fullText){
      if(err) return console.log(err);
      let fname = path.parse(file).name;
      //name the file without space
      let validFname = fname.split(' ').join('');
     // let validFname = fname[0].split(' ').join('');

      let t = fullText.split(/\r?\n\r?\n/);
      //console.log("Title is :", t[0]);

      if(fileType == 'txt'){

        let t = fullText.split(/\r?\n\r?\n/);
        console.log("Title is :", t[0]);
        let content = t.slice(1,t.length);
        let html = content
            .map(para =>
              `<p>${para.replace(/\r?\n/, ' ')}</p> </br>`
            ).join(' ');

        tempHtml =
        `<!doctype html>\n` +
        `<html lang="${lang}">\n<head>\n<meta charset="UTF-8">\n<title>${t[0]}</title>\n` +
        `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
        `<body>\n` +
        `<div class = "container">\n` +
        `<h1>${t[0]} </h1>\n` +
        `${html}` +
        `</div>\n</body>\n` +
        `<footer> \n ${footer}\n</footer>\n</html>`;
      } else if(fileType == 'md'){

        let contents = fullText.split(/\r?\n\r?\n/);
     //   console.log(contents);
        const html = [];
        contents.forEach(e => {
          if(e.includes('### ')) {
            html.push(`<h3>${e.replace('###', '').replace('---','<hr>')}</h3> <br />`);
          } else if(e.includes('## ')) {
            html.push(`<h2>${e.replace('##', '').replace('---','<hr>')}</h2> <br />`);
          } else if(e.includes('# ')) {
            html.push(`<h1>${e.replace('#', '').replace('---','<hr>')}</h1> <br /><hr /><br />`);
          } else {
            html.push(`<p>${e.replace(/\r?\n/, ' ').replace('---','<hr>')}</p> <br />`);
          }
        });
        
        tempHtml =
        `<!doctype html>\n` +
        `<html lang="${lang}">\n<head>\n<meta charset="UTF-8">\n<title>${fname[0]}</title>\n` +
        `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
        `<body>\n` +
        `<div class = "container">\n` +
        `${html.join(' ')}` +
        `</div>\n</body>\n` +
        `<footer> \n ${footer}\n</footer>\n</html>`;
      }

      
      //Write file
      fs.writeFile(`./dist/${validFname}.html`, tempHtml, err=>{
        if(err) throw err;
      });
     })
  }

  })
  console.log('The HTML files have been saved to ./dist!');  
}

else{
  fileType = argv.input.split('.').pop(); 
  //console.log(fileType);

  //convert the .txt or .md file into a HTML file
  if(fileType == 'txt' || fileType == 'md'){
  fs.readFile(argv.input, 'utf8', function(err, fullText){
      if(err) return console.log(err);

      let fname = argv.input.split(".");
      //console.log(fname) //[ 'Silver Blaze', 'txt' ]
      let validFname = fname[0].split(' ').join('');
      if(fileType == 'txt'){

        let t = fullText.split(/\r?\n\r?\n/);
        console.log("Title is :", t[0]);
        let content = t.slice(1,t.length);
        let html = content
            .map(para =>
              `<p>${para.replace(/\r?\n/, ' ')}</p> </br>`
            ).join(' ');

        tempHtml =
        `<!doctype html>\n` +
        `<html lang="${lang}">\n<head>\n<meta charset="UTF-8">\n<title>${t[0]}</title>\n` +
        `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
        `<body>\n` +
        `<div class = "container">\n` +
        `<h1>${t[0]} </h1>\n` +
        `${html}` +
        `</div>\n</body>\n` +
        `<footer> \n ${footer}\n</footer>\n</html>`;
      } else if(fileType == 'md'){

        let contents = fullText.split(/\r?\n\r?\n/);
        //console.log(contents);
        const html = [];
        contents.forEach(e => {
          if(e.includes('### ')) {
            html.push(`<h3>${e.replace('###', '').replace('---','<hr>')}</h3> <br />`);
          } else if(e.includes('## ')) {
            html.push(`<h2>${e.replace('##', '').replace('---','<hr>')}</h2> <br />`);
          } else if(e.includes('# ')) {
            html.push(`<h1>${e.replace('#', '').replace('---','<hr>')}</h1> <br /><hr /><br />`);
          } else {
            html.push(`<p>${e.replace(/\r?\n/, ' ').replace('---','<hr>')}</p> <br />`);
          }
        });
        
        tempHtml =
        `<!doctype html>\n` +
        `<html lang="${lang}">\n<head>\n<meta charset="UTF-8">\n<title>${fname[0]}</title>\n` +
        `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
        `<body>\n` +
        `<div class = "container">\n` +
        `${html.join(' ')}` +
        `</div>\n</body>\n` +
        `<footer> \n ${footer}\n</footer>\n</html>`;
      }

      //Write file
      //console.log(validFname);
      fs.writeFile(`./dist/${validFname}.html`, tempHtml, err=>{
        if(err) throw err;
        console.log('The HTML file has been saved to ./dist!');  
      });
    });
  }

  else{
    fileType = 'Sorry, only .txt and .md files are allowed! Please try again!' //md
    console.log(fileType);
  }
}


