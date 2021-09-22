# My-First-SSG

A __Static Site Generator__(_SSG_) for __OSD600__

This repo introduces a __JavaScript__ program that convert __.txt file__ into a __HTML file__


# Installation 

`npm -i yargs`

# Commands

  `server.js --input  Convert a text file to HTML file.`
  
__For Example:__

After installation of yargs. You can simply run the program by the command:

`node server.js -i 'Silver Blaze.txt'`

Which will generate a __HTML__ file for the __'Silver Blaze.txt'__ file into the __/dist__ folder.

__Or__

`node server.js -i .\Sherlock-Holmes-Selected-Stories\` 

Which will generate a few of __HTML__ files for the __Sherlock-Holmes-Selected-Stories directory__ into the __/dist__ folder.

# Options

Options:

``` 
  -h, --help     Show help                                             [boolean]
 
  -v, --version  Show version number                                   [boolean]
 
  -o, --output                           [string] [required] [default: "./dist"] 
```
 
# Optional Features
 
 + Get the __title__ of the _.txt file_ and put the __name of the title__ into`title`, also put it into `h1` that inside `body`
 
 + Personal `footer`

# Index HTML(DEMO)
 
 [My-First-SSG-Example](https://derekjxy.github.io/My-First-SSG/)
 
# License

 [__MIT License__](https://choosealicense.com/licenses/mit/)
 
