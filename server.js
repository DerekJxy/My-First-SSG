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
    //default: 'default.json',
    describe: 'accept a file path to a JSON config file',
    type: 'string'
  }
})
.argv;

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
let notValid = false;// new boolean value

if(argv.lang == '.'){
  lang = "en-CA";
}else{
  lang = argv.lang;
}

//check for config argument
if(argv.config != null){ // When it has a config argument, then do this:
  console.log(`argv.config argument -- '${argv.config}' is not null!`);
  if(fs.existsSync(argv.config)){// contains the json file
    console.log('argv.config is exist!');

  fs.readFile(`${argv.config}`, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return;
    }

    let obj = JSON.parse(jsonString);
    obj.input == undefined ? notValid = true : argv.input = obj.input;
    obj.lang == undefined ? lang = "en-CA" : lang = obj.lang;
    obj.output == undefined ? argv.output = './dist' : argv.output = obj.output;// static output path
    if(!notValid){
        stats = fs.statSync(obj.input, obj.lang);
        convert(stats);
    }else{
        console.log(`Input filename is empty in the ${argv.config}! Nothing to convert this time!`);
    }
  });

  }else{//not such a json file exist
    let errMsg = `Sorry, we can't find your config json file, please try again!!`;
    console.log(errMsg);
    notValid = true;
  }
}else{ // When it doesn't have a config argument, then do this:
  console.log(`No config argument detected this time! `)
  convert(stats);
}

// put the convert code into a function
function convert(stats){
  if(stats.isDirectory()){
    console.log('argv.input is a folder!')
    fs.readdirSync(argv.input).forEach(file =>{
  
      //Display all the files in the directory
      //console.log("File name: ", file);
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
          console.log("Title is :", validFname);
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
    console.log('argv.input is not a FOLDER!')
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
          console.log("Title is :", validFname);
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
}
