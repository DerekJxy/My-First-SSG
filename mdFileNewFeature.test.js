const { mdFileNewFeature } = require('./mdFileNewFeature');
const assert = require('assert');

describe('mdFileNewFeature', () => {
  it('test1', () => {
    let tempString = `# This is a testing sentence.`;
    let content = tempString.split(/\r?\n\r?\n/);

    let temp = ['<h1> This is a testing sentence.</h1> <br /><hr /><br />'];
    assert.deepEqual(mdFileNewFeature(content), temp);
  });

  it('test2', () => {
    let tempString = `## This is a testing sentence.`;
    let content = tempString.split(/\r?\n\r?\n/);

    let temp = ['<h2> This is a testing sentence.</h2> <br />'];
    assert.deepEqual(mdFileNewFeature(content), temp);
  });

  it('test3', () => {
    let tempString = `### This is a testing sentence.`;
    let content = tempString.split(/\r?\n\r?\n/);

    let temp = ['<h3> This is a testing sentence.</h3> <br />'];
    assert.deepEqual(mdFileNewFeature(content), temp);
  });

  it('test4', () => {
    let tempString = `This is a testing sentence.`;
    let content = tempString.split(/\r?\n\r?\n/);

    let temp = ['<p>This is a testing sentence.</p> <br />'];
    assert.deepEqual(mdFileNewFeature(content), temp);
  });

  it('test5', () => {
    let temp = 'Error! The function is passing an empty Content!';
    assert.deepEqual(mdFileNewFeature(), temp);
  });
});
