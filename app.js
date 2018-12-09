const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;

const action = process.argv[2];
const title = argv['title'];
const body = argv['body'];

switch(action){
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