#!/usr/bin/env node
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

let stats = fs.statSync(argv.input);
let tempHtml;
let footer = '<p class="center">© 2021 OSD600 Seneca</p>';

if(stats.isDirectory()){
  fs.readdirSync(argv.input).forEach(file =>{
    console.log("File name: ", file);
    fs.readFile(argv.input + "/"+ file.toString(), 'utf-8', function(err, fullText){
      if(err) return console.log(err);

      let t = fullText.split(/\r?\n\r?\n/);
      //console.log("Title is :", t[0]);
      let content = t.slice(1,t.length);
      let html = content
          .map(para =>
            `<p>${para.replace(/\r?\n/, ' ')}</p> </br>`
          ).join(' ');

      tempHtml = `<!doctype html>\n` + `<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>${t[0]}</title>\n` +
       `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
       `<body>\n` + `<div class = "container">\n`+`<h1>${t[0]} </h1>\n` + `${html}` + `</div>\n</body>\n` +
       `<footer> \n ${footer}\n</footer>\n</html>`;

    fs.writeFile(`./dist/${file.split(".")[0]}.html`, tempHtml, err=>{
      if(err) throw err;
      });
    })
  })
  console.log('The HTML files have been saved to ./dist!');  
}

else{ 
  fs.readFile(argv.input, 'utf8', function(err, fullText){
      if(err) return console.log(err);
     
      let t = fullText.split(/\r?\n\r?\n/);
      //console.log("Title is :", t[0]);
      let content = t.slice(1,t.length);
      let html = content
          .map(para =>
            `<p>${para.replace(/\r?\n/, ' ')}</p> </br>`
          ).join(' ');
          
      tempHtml = `<!doctype html>\n` + `<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>${t[0]}</title>\n` +
      `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
      `<body>\n` + `<div class = "container">\n`+`<h1>${t[0]} </h1>\n` + `${html}` + `</div>\n</body>\n` +
      `<footer> \n ${footer}\n</footer>\n</html>`;

      fs.writeFile(`./dist/${argv.input}.html`, tempHtml, err=>{
        if(err) throw err;
        console.log('The HTML file has been saved to ./dist!');  
      });
  });
}