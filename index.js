const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

let notes = [
    {"id": 1, "content": "hacer la cama"},
    {"id": 2, "content": "comer verduras"},
]

app.use((request, response,next) => {
    console.log(request.method);
    console.log(request.path);
    console.log(request.body);
    next()
})

app.get("/", (request, response) => {
    response.send("<h1>Este es un servidor</h2>")
})

app.get("/api/notes", (request, response) => {
    response.json(notes)
})

app.get("/api/notes/:id", (request,response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        response.json(note)
    }else {
        response.status(404).end()
    }
    
})

app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post("/api/notes", (request, response) => {
    const note = request.body
     if(!note || !note.content){
        return response.status(400).json({error: "note.content.dsnt exist"})
    }
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)
    const newNote = {
        id : maxId +1,
        content: note.content
    }
    notes = [...notes, newNote] 
    response.json(note)
})

app.use((request, response) => {
    response.status(404).json({
        error: "Not found"
    })
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})