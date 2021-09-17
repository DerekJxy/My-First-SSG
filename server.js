#!/usr/bin/env node
const path = require("path");
let fs = require('fs');

let argv = require('yargs/yargs')(process.argv.slice(2))
.usage('This is my awesome program\n\nUsage: $0 [options]')
.help('help').alias('help', 'h')
.version('version', '1.0.1').alias('version', 'v')
.alias('i', 'input')
.command("--input", "Convert a text file to HTML file.")
.options({
  input: {
    alias: 'i',
    demand: true,
    default: '.',
    type: 'string'
  },
  output: {
    alias: 'o',
    demand: true,
    default: './dist',
    type: 'string'
  }
})
.argv;

console.log("argv Input:", argv.input);
console.log("argv Onput:", argv.output);

// Check ./dist folder
if(fs.existsSync("./dist")){
    fs.rmdirSync("./dist",{recursive: true} , err=>{
      if(err) throw err;
    });
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
let stats = fs.statSync(argv.input);
let tempHtml;
let footer = '<p class="center">© 2021 OSD600 Seneca</p>';
let fileType ='';

if(stats.isDirectory()){
  fs.readdirSync(argv.input).forEach(file =>{

    //Display all the files in the directory
    console.log("File name: ", file);
    fileType = file.split('.').pop(); 

    //Only convert the .txt file into a HTML file
    if(fileType == 'txt'){
    fs.readFile(argv.input + "/"+ file.toString(), 'utf-8', function(err, fullText){
      if(err) return console.log(err);
      let fname = path.parse(file).name;
      //name the file without space
      let validFname = fname.split(' ').join('');

      let t = fullText.split(/\r?\n\r?\n/);
      //console.log("Title is :", t[0]);
      let content = t.slice(1,t.length);
      let html = content
          .map(para =>
            `<p>${para.replace(/\r?\n/, ' ')}</p> </br>`
          ).join(' ');

      //HTML
      tempHtml = `<!doctype html>\n` + `<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>${t[0]}</title>\n` +
       `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
       `<body>\n` + `<div class = "container">\n`+`<h1>${t[0]} </h1>\n` + `${html}` + `</div>\n</body>\n` +
       `<footer> \n ${footer}\n</footer>\n</html>`;
    
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

  //Only convert the .txt file into a HTML file
  if(fileType == 'txt'){
  fs.readFile(argv.input, 'utf8', function(err, fullText){
      if(err) return console.log(err);

      let fname = argv.input.split(".");
      //console.log(fname) //[ 'Silver Blaze', 'txt' ]
      let validFname = fname[0].split(' ').join('');

      let t = fullText.split(/\r?\n\r?\n/);
      //console.log("Title is :", t[0]);
      let content = t.slice(1,t.length);
      let html = content
          .map(para =>
            `<p>${para.replace(/\r?\n/, ' ')}</p> </br>`
          ).join(' ');
          
      //HTML   
      tempHtml = `<!doctype html>\n` + `<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>${t[0]}</title>\n` +
      `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
      `<body>\n` + `<div class = "container">\n`+`<h1>${t[0]} </h1>\n` + `${html}` + `</div>\n</body>\n` +
      `<footer> \n ${footer}\n</footer>\n</html>`;

       //Write file

      //console.log(validFname);
      fs.writeFile(`./dist/${validFname}.html`, tempHtml, err=>{
        if(err) throw err;
        console.log('The HTML file has been saved to ./dist!');  
      });
    });
  }

  else{
    fileType = 'Sorry, only .txt file allowed! Please try again!'
    console.log(fileType);
  }
}
