const fs = require('fs')
const { default: chalk } = require('chalk')

const getNotes =  ()=> {
    return 'Your notes...'
}

const addNote =  (title, body)=> {
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=> note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes =(notes)=> {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removenote=(title)=>{
    const notes=loadNotes()
    const notesKeep=notes.filter((note)=>note.title!=title)
    if(notes.length>notesKeep.length){
        console.log(chalk.inverse.green("Notes Removed"))
    }
    else{
        console.log(chalk.inverse.red("Notes not Found"))
    }
    saveNotes(notesKeep)

}

const listnodes=()=>{
    const notes=loadNotes()
    console.log(chalk.green("Your Notes"))
    notes.forEach((note) => {
        console.log(note.title)
    }) 
    
}

const readNote=(title)=>{

    const notes=loadNotes()
    const findNote=notes.find((note)=>note.title===title) 

    if(findNote){
        console.log(chalk.green.inverse(findNote.title))
        console.log(findNote.body)
    }
    else{
        console.log(chalk.red("No Notes Found"))
    }

}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removenote:removenote,
    listnodes:listnodes,
    readNote:readNote 
}