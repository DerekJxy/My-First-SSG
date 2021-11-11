# Options

Options:

``` 
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
  -o, --output                           [string] [required] [default: "./dist"]
  -l, --lang     generate the lang attribute  [string] [required] [default: "."]
  -i, --input    convert .txt file to html file              [string] [required]
```
 
# Optional Features
 
 + Get the __title__ of the _.txt file_ and put the __name of the title__ into`title`, also put it into `h1` that inside `body`
 
 + Personal `footer`
 
 + Convert a `MD` file to a `HTML` file

 + A feature for `language`in `<html>`

# Prettier

+ `npm run prettier` is the command to run the __prettier__ command with the main `js` file -- `server.js`.
+ `npm run prettier-check` is the command to check if the main `js` file -- `server.js` run the __prettier__ or not.


# Eslint

+ `npm run eslint` is the command to run the __eslint__ command with main `js` file -- `server.js` to check the coding syntax.
+ `npm run eslint-fix` is the command to fix some command or basic error for the `server.js`, and return warnings for what can't be fixed automatically.

# .Vscode

+ `extensions.json` Specify the static extensions. For helping the cooperator to install servals recommended extensions.
+ `settings.json` Specify settings for the editor. Ensure that whenever the cooperator saves a file, the program would format the code using the __prettier__ extension.

# Testing

+ `npm run test` is the command to run all testing files of the program(currently only have 1 test file).
+ `npm run test .\htmlGenerator.test.js` is the command to run the specific testing functions in the __htmlGenerator.test.js__.

# Watch

+ `npm run test:watch` is the command to run the __test runner watch__. It will show a list of options for testing:
```
No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.

```
And you can type in __'a'__ or __'f'__ or __'p'__ or __'t'__ or __'q'__ to selection an option. Also, you can press __<Enter>__ to trigger a test run.

# Coverage

+ `npm run coverage` is the command to run the __Code Coverage Analysis__, it will run the tests generate a coverage report to the user.
It will have a table similar to this:
```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |      100 |     100 |     100 |                   
 htmlGenerator.js |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------
```

