'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var QuizzGenerator = module.exports = function QuizzGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(QuizzGenerator, yeoman.generators.Base);

QuizzGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    type: 'input',
    name: 'name',
    message: 'What do you want to call your quizz?',
    default: 'quizz'
  },{
    type: 'confirm',
    name: 'backButton',
    message: 'Would you like to enable a "previous" button in your quizz?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    this.backButton = props.backButton;

    cb();
  }.bind(this));
};

QuizzGenerator.prototype.app = function app() {
  if(this.backButton){
    this.copy('../../../dist/example.html', this.name + '.html');
  } else {
    this.copy('../../../dist/example_without_previous_button.html', this.name + '.html');
  }
  this.mkdir('js');
  this.directory('../../../dist/js', 'js');
  this.mkdir('css');
  this.copy('../../../dist/css/quizz.css', 'css/quizz.css');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

QuizzGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
