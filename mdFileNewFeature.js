function mdFileNewFeature(content) {
  if (!content) {
    return 'Error! The function is passing an empty Content!';
  } else {
    const html = [];
    content.forEach((e) => {
      if (e.includes('### ')) {
        html.push(
          `<h3>${e.replace('###', '').replace('---', '<hr>')}</h3> <br />`
        );
      } else if (e.includes('## ')) {
        html.push(
          `<h2>${e.replace('##', '').replace('---', '<hr>')}</h2> <br />`
        );
      } else if (e.includes('# ')) {
        html.push(
          `<h1>${e
            .replace('#', '')
            .replace('---', '<hr>')}</h1> <br /><hr /><br />`
        );
      } else {
        html.push(
          `<p>${e.replace(/\r?\n/, ' ').replace('---', '<hr>')}</p> <br />`
        );
      }
    });

    return html;
  }
}

module.exports.mdFileNewFeature = mdFileNewFeature;
