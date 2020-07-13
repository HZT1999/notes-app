const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...';
}

// Goal: Wire up read command
//
// 1. Setup --title option for read command
// 2. Create readNote in notes.js
//  - Search for a note by title
//  - Find note and print title (styled) and body (plain)
//  - No note found? Print error in red
// 3. Have the command handler call the function
// 4. Test your work by running a couple commands

const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title);

    if (noteToRead) {
        console.log(chalk.green.inverse(noteToRead.title));
        console.log(noteToRead.body);

    } else {
        console.log(chalk.red('Note not found!'));
    }

}


const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse.yellow('Your notes:'));
    notes.forEach((note) => console.log(chalk.inverse.blue(note.title)));
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title, 
            body: body, 
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'));
    } else {
        console.log(chalk.red('Note title taken!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);

    } catch (err) {
        return [];
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length === notesToKeep.length) {
        console.log(chalk.red('No note removed!'));
    } else {
        
        saveNotes(notesToKeep)
        console.log(chalk.green('Note removed!'));
    
    }

}

module.exports = {
    getNotes: getNotes, 
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};