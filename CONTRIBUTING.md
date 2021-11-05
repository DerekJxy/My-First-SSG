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