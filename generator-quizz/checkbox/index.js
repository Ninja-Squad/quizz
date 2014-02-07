'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');

var SEPARATOR = '// Insert your next question here (keep the comment for the generator).';

var CheckboxGenerator = module.exports = function CheckboxGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Adding a checkbox question with ' + this.name + ' choices.');
};

util.inherits(CheckboxGenerator, yeoman.generators.NamedBase);

CheckboxGenerator.prototype.askForQuestion = function askForQuestion() {
  var cb = this.async();
  var prompts = [{
    type: 'input',
    name: 'questionText',
    message: 'What is your question text?'
  }];

  for (var i = 0; i < this.name; i++){
    var message = 'What is the text of the choice CHOICE ?'.replace('CHOICE', i+1);
    prompts.push({
      type: 'input', 
      name: 'choiceText' + i, 
      message: message
    });
    prompts.push({
      type: 'confirm',
      name: 'choiceValidity' + i,
      message: 'Is this choice a valid answer?',
      default: true
    });
  }

  this.prompt(prompts, function (props) {
    this.questionText = props.questionText;

    // choices
    var choices = [];
    for (var i = 0; i < this.name; i++){
      choices.push({text: props['choiceText'+i], valid: props['choiceValidity'+i]});
    }
    var fullPath = path.join(process.cwd(), 'js/example-quizz.js');
    var content = fs.readFileSync(fullPath, 'utf8');
    var parts = content.split(SEPARATOR);

    console.log('... building question...');
    var question = this.read('checkbox.js', 'utf8');
    var answer = '';
    for(var choice = 0; choice < this.name; choice++){
      answer += '{ text: \''+ choices[choice].text + '\',correct: ' + choices[choice].valid + '},'
    }
    answer = answer.substring(0, answer.length-1);
    question = question.replace('ANSWERS', answer);  
    question = question.replace('TEXT', this.questionText);

    parts[0] += question;

    content = parts.join(SEPARATOR);
    fs.writeFileSync(fullPath, content, 'utf8');

    cb();
  }.bind(this));
};

