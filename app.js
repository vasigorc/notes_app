const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', { //command, textual description, a list of options
        title: titleOptions, 
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('get', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help() //show previous options when app ran with --help flag 
    .argv;

const action = process.argv[2];
const title = argv['title'];
const body = argv['body'];

switch (action) {
    case 'add':
        notes.addNote(title, body);
        break;
    case 'list':
        notes.getAll().forEach((note) =>
            notes.log(note)
        );
        break;
    case 'get':
        console.log(notes.get(title));
        break;
    case 'remove':
        notes.remove(title);
        break;
    case 'log': notes.log(notes.get(title));
}