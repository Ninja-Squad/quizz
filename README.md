quizz
=====

A simple angular-based quizz application

# Build pre-requisites

 - Install [node.js](http://nodejs.org/). node.js now comes with npm. If not, install [npm](https://github.com/isaacs/npm)
 - Install [grunt](http://gruntjs.com/)
 - Set the CHROME_BIN environment variable pointing to your chrome executable (needed for end-to-end tests) :
    - on OSX : `export CHROME_BIN=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome`

# Build

The following commands must all be run from the root directory:

 - `npm install`: this will install a whole lot of dependencies needed by the grunt tasks. Don't worry
   if it looks like it downloads the whole internet: that's normal and expected. Until a new task is introduced in the build file,
   this command must not be run anymore.
 - `grunt`: this will generate the `dist` directory, containing an example quizz, as well as the generated JS files, CSS files and
   JS dependencies (markdown, showdown and angular)

# Development

The following commands can be run:

 - `grunt server`: starts a web server on port 9001, serving the files under `src`. Can be used to manually test the code before building
   the application
 - `grunt unit`: runs the unit tests and watches changes in the files, re-executing tests continuously using Karma and PhantomJS
 - `grunt unit-single`: runs the unit tests using Karma and PhantomJS
 - `grunt e2e`: generates the application, and executes end-to-end tests against the generated application in `dist`
 
# Using the example quizz, and generate new ones

The quizz can be run directly from the file system, or be deployed to a web server. 

To create a new quizz, create a new HTML file and JS files inspired by the `dist/example.html` and `dist/js/example-quizz.js` files.
The default quizz HTML template is based on twitter bootstrap, and is embedded into the files `quizz-tmpl.js` and its minidied version,
`quizz-tmpl.min.js`. The `quizz.js` file and its minified version `quizz.min.js` can be used if you want to write and use your own HTML 
template. Note that all the browsers won't allow loading the template dynamically when the quizz is served from the file system directly, 
though. If you want to write your own template and be able to use it from the file system, you'll have to cache it in the JS file, as done
in the `quizz-tmpl.js` file.