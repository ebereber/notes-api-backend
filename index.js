
const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.use((request, response, next) => {
	console.log(request.method);
	console.log(request.path);
	console.log(request.body);
	console.log("----")
	next()
}) 


let notes = [
    {"id": 1, "content":"tengo que estudiar loquito ddddd", "date": "marzo 19"},
    {"id": 2, "content":"hoy se jueasdasdasga perro flaco loco", "date": "marzo 20"},
]

app.get("/", (req, res) => {
	res.send("<h1>Hola Mundillo</h1>")
})

app.get("/api/notes", (req, res) => {
	res.json(notes)
})

app.get("/api/notes/:id" , (request, response) => {
	const id = Number(request.params.id)
		const note = notes.find( note => note.id === id)
	response.json(note  )
	 
})

app.delete("/api/notes/:id" , (request, response) => {
const id = Number(request.params.id)
notes = notes.filter(note => note.id !== id)
response.status(204).end()
})

app.post("/api/notes" , (request, response) => {
	const note = request.body

	if(!notes || !notes.content){
		return response.status(400).json({error:"no hay nada che"})
	}
	
	const ids = notes.map(note => note.id)
	const maxId = Math.max(...ids)
	
	
	const newNote = {
		"id": maxId + 1,
		"content" : note.content
	}

	notes = [...notes, newNote]

	response.json(newNote)
})

 app.use((request, response) => {
	 console.log(request.path)
	 response.status(404).json({
		 error : "Not found"
	 })
	;
}) 

const PORT = 3001
app.listen(PORT)