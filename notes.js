console.log('Starting notes.js...');

//module is available in all of our files
module.exports.age = 35;
const fs = require('fs');

let addNote = (title, body) =>{
    const notes = getAll();
    let note = {
        title,
        body
    };

    let duplicateNotes = notes.filter((anote) => anote.title === title);

    if(duplicateNotes.length === 0){
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    }
};

let getAll = () =>{
    const notes = [];
    
    try {
        let notesString = fs.readFileSync('notes-data.json');
        Array.prototype.push.apply(notes, JSON.parse(notesString));
    } catch (error) {
        console.log('Error: read file doesn\'t exist yet');
    }
    return notes;
};

let remove = (title) => {
    const notes = getAll();
    const newNotes = notes.filter( el => el.title !== title);
    if(notes.length == newNotes.length){
        console.log(`Note ${title} not found in the repository - impossible to delete.`);
    } else{
        const stringified = JSON.stringify(newNotes);
        console.log(`Removing note ${title} from the repository, new repository is ${stringified}`);
        fs.writeFileSync('notes-data.json', stringified);
    }
};

let get = (title) => {
    const notes = getAll();

    let found = false;
    let index = -1;
    for(var i=0;i<notes.length;i++){
        if(notes[i].title === title){
            found = true;
            index = i;
        }
    }
    return found ? notes[index] : null;
}

let log = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    //since ES 6 identical as addNote: addNote
    addNote,
    getAll,
    remove,
    get,
    log
};