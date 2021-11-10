const { htmlGenerator } = require('./htmlGenerator');

describe('htmlGenerator', () => {
  //All good values and the typeof html is string
  it('Generate a html code with all good values and a html string', () => {
    let lang = 'en-CA';
    let title = 'OSD600';
    let html = '<p>Hello World!</p>';
    let footer = 'Seneca College';
    let temp =
      `<!doctype html>\n` +
      `<html lang="${lang}">\n<head>\n<meta charset="UTF-8">\n<title>${title}</title>\n` +
      `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
      `<body>\n` +
      `<div class = "container">\n` +
      `<h1>${title} </h1>\n` +
      `${html}` +
      `</div>\n</body>\n` +
      `<footer> \n ${footer}\n</footer>\n</html>`;
    expect(htmlGenerator(lang, title, html, footer)).toEqual(temp);
  });

  //All good values and the typeof html is object
  it('Generate a html code with all good values and a html object', () => {
    let lang = 'en-CA';
    let title = 'OSD600';
    let html = [`<p>Hello World!</p>`, `<p>I'm in OSD600!</p>`];
    let footer = 'Seneca College';
    let temp =
      `<!doctype html>\n` +
      `<html lang="${lang}">\n<head>\n<meta charset="UTF-8">\n<title>${title}</title>\n` +
      `<link rel="stylesheet" href="../src/css/style.css">\n</head>\n` +
      `<body>\n` +
      `<div class = "container">\n` +
      `${html.join(' ')}` +
      `</div>\n</body>\n` +
      `<footer> \n ${footer}\n</footer>\n</html>`;
    expect(htmlGenerator(lang, title, html, footer)).toEqual(temp);
  });

  // Bad value of lang (wrong value type or empty string)
  it('Generate a html code with bad lang value type or an empty lang', () => {
    let lang = null;
    let title = 'OSD600';
    let html = '<p>Hello World!</p>';
    let footer = 'Seneca College';
    let temp = 'Error! Bad value of lang!';

    let tempLang = '';
    let temp1 = 'Error! Empty value of lang!';
    expect(htmlGenerator(lang, title, html, footer)).toEqual(temp);
    expect(htmlGenerator(tempLang, title, html, footer)).toEqual(temp1);
  });

  // Bad value of title (wrong value type or empty string)
  it('Generate a html code with bad title value type or an empty title', () => {
    let lang = 'en-CA';
    let title = 600;
    let html = [`<p>Hello World!</p>` + `<p>I'm in OSD600!</p>`];
    let footer = 'Seneca College';
    let temp = 'Error! Bad value of title!';

    let tempTitle = '';
    let temp1 = 'Error! Empty value of title!';
    expect(htmlGenerator(lang, title, html, footer)).toEqual(temp);
    expect(htmlGenerator(lang, tempTitle, html, footer)).toEqual(temp1);
  });

  // Bad value of html (wrong value type)
  it('Generate a html code with bad html value type', () => {
    let lang = 'en-CA';
    let title = 'OSD600';
    let html = false;
    let footer = 'Seneca College';
    let temp = 'Error! Bad value of html!';
    expect(htmlGenerator(lang, title, html, footer)).toEqual(temp);
  });

  // Bad value of html (empty string or empty object)
  it('Generate a html code with empty html string or empty html object', () => {
    let lang = 'en-CA';
    let title = 'OSD600';
    let html = '';
    let footer = 'Seneca College';
    let temp = 'Error! Empty String value of html!';

    let tempHtml = [];
    let temp1 = 'Error! Empty Object value of html!';
    expect(htmlGenerator(lang, title, html, footer)).toEqual(temp);
    expect(htmlGenerator(lang, title, tempHtml, footer)).toEqual(temp1);
  });

  // Bad value of footer (wrong value type or empty string)
  it('Generate a html code with bad footer value type or an empty footer', () => {
    let lang = 'en-CA';
    let title = 'OSD600';
    let html = '<p>Hello World!</p>';
    let footer = undefined;
    let temp = 'Error! Bad value of footer!';

    let tempFooter = '';
    let temp1 = 'Error! Empty value of footer!';
    expect(htmlGenerator(lang, title, html, footer)).toEqual(temp);
    expect(htmlGenerator(lang, title, html, tempFooter)).toEqual(temp1);
  });
});
