
const mongoose = require("mongoose")

const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString)
.then(() => {
    console.log("Database Connected")
})
.catch(err => {
    console.error(err);
})

/* const note = new Note({
    content: "a dormin",
    date: new Date(),
    important: true
})

note.save()
.then(result => {
    console.log(result)
    mongoose.connection.close()
})
.catch(err => console.error(err)) */