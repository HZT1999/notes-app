const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Customise yargs version
yargs.version('1.5.0');

// Create add command
yargs.command({
    command: 'add', 
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }, 
        body: {
            descibe: 'Note body', 
            demandOption: true, 
            type: 'string'
        }
    }, 
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
    }
});

// Create remove command
yargs.command({
    command:'remove', 
    describe: 'Removes a note', 
    builder: {
        title: {
            descibe: 'Note title', 
            demandOption: true, 
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
})

// Create list command
yargs.command({
    command:'list', 
    describe: 'Lists all note', 
    handler: function () {
        notes.listNotes();
    }
})

// Create read command
yargs.command({
    command:'read', 
    describe: 'Reads a note', 
    builder: {
        title: {
            descibe: 'Note title', 
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.readNote(argv.title);
    }
})

// add, remove, read, list

yargs.parse();