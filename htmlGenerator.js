function htmlGenerator(lang, title, html, footer) {
  //check the type of lang and check if it's a empty string
  if (typeof lang != 'string') {
    return 'Error! Bad value of lang!';
  } else if (lang == '') {
    return 'Error! Empty value of lang!';
  }
  //check the type of title and check if it's a empty string
  if (typeof title != 'string') {
    return 'Error! Bad value of title!';
  } else if (title == '') {
    return 'Error! Empty value of title!';
  }
  //check the type of html and check if it's a empty string
  if (typeof html != 'string' && typeof html != 'object') {
    return 'Error! Bad value of html!';
  } else if (typeof html == 'string' && html == '') {
    return 'Error! Empty String value of html!';
  }
  //check the type of footer and check if it's a empty string
  if (typeof footer != 'string') {
    return 'Error! Bad value of footer!';
  } else if (footer == '') {
    return 'Error! Empty value of footer!';
  }
  //Only generate a string html when the html variable is not empty string or empty object
  if (html != '' && html != []) {
    return typeof html != 'string'
      ? `<!doctype html>\n` +
          `<html lang="${lang}">\n<head>\n<meta charset="UTF-8">\n<title>${title}</title>\n` +
          `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
          `<body>\n` +
          `<div class = "container">\n` +
          `${html.join(' ')}` +
          `</div>\n</body>\n` +
          `<footer> \n ${footer}\n</footer>\n</html>`
      : `<!doctype html>\n` +
          `<html lang="${lang}">\n<head>\n<meta charset="UTF-8">\n<title>${title}</title>\n` +
          `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
          `<body>\n` +
          `<div class = "container">\n` +
          `<h1>${title} </h1>\n` +
          `${html}` +
          `</div>\n</body>\n` +
          `<footer> \n ${footer}\n</footer>\n</html>`;
  } else {
    return 'Error! Empty Object value of html!';
  }
}

module.exports.htmlGenerator = htmlGenerator;
