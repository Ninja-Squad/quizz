Generate a quizz in a few seconds with [Yeoman](http://yeoman.io).


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Quizz Generator

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-quizz from npm, run:

```
$ npm install -g generator-quizz
```

Finally, initiate the generator:

```
$ mkdir my-quizz
$ cd my-quizz
$ yo quizz
```

You will have to answer a few questions, than you can open the HTMl file created and enjoy your quizz!

If you want to add a question, you can use the generator too!
To add a new questions with 3 checkboxes, simply enter:

```
$ yo quizz:checkbox 3
```

Answer the questions, then reload your browser and your new question has been added!

### Developers

In the `generator` directory, you'll have to run :

```
$ npm install
```

then you can link your module to your npm

```
$ npm link
```

You can now modify the module and test the generator wherever you want on your computer!

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
