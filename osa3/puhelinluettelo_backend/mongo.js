const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Note = mongoose.model('Note', phonebookSchema)
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.cgqvi1t.mongodb.net/puhelinluettelo?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4})



if (process.argv.length == 3) {
    console.log("phonebook:")
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(`${note.name} ${note.number}`)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length == 5) {
    const note  = new Note({
        name: process.argv[3],
        number: process.argv[4]
    })
    note.save().then(result => {
        mongoose.connection.close()
    })
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
}









