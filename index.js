const JSONdb = require('simple-json-db');
const db = new JSONdb('todos.json');
const {v4: uuidv4} = require('uuid');
const bodyParser = require('body-parser')

const app = require('express')();

const PORT = 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req,res,next) => {
	setTimeout(next, 1000)
})

app.get('/get-todos',  (req, res) => {
	const todos = db.JSON();
	const arrayFromTodosObj = Object.keys(todos).map(key => todos[key])

	res.send(arrayFromTodosObj)
})

app.get('/todo/:id', (req, res) => {
	const todo = db.get(req.params.id)

	if(!todo) {
		return res.status(404).send({message: 'TODO NOT FOUND'})
	}

	res.send(todo)
})

app.post('/create-todo', (req, res) => {
	if(!req.body) {
		return res.status(400).send({message: 'BODY WAS NOT PROVIDED'})
	}

	const { title, description } = req.body;

	if(!title || !description || typeof title !== 'string' || typeof description !== "string") {
		return res.status(400).send(
			{
				message: 'MAKE SURE YOU ARE PROVIDING title AND description FIELDS TO BODY AND THEY ARE OF TYPE STRING'
			}
		)
	}

	const id = uuidv4();
	const newTodo = {
		title,
		description,
		id,
		completed: false,
		createdAt: new Date(),
		updatedAt: null
	}

	db.set(id, newTodo);

	res.send(newTodo);
})

app.patch('/update-todo/:id', (req, res) => {
	if(!req.body) {
		return res.status(400).send({message: 'BODY WAS NOT PROVIDED'})
	}


	if(!req.params.id) {
		return res.status(400).send({message: 'TODO id WAS NOT PROVIDED'})
	}

	const { id } = req.params;
	const todoToUpdate = db.get(id)

	if(!todoToUpdate) {
		return res.status(404).send({message: 'TODO WITH SPECIFIED id WAS NOT FOUND'})
	}

	const { title, description, completed } = req.body;

	if(
		(title && typeof title !== 'string')
		|| (description && typeof description !== "string")
		|| (completed &&  (['true', 'false'].includes(completed) || typeof completed !== "boolean"))
	) {
		return res.status(400).send(
			{
				message: 'MAKE SURE YOU ARE PROVIDING title (string), description (string), completed (boolean) FIELDS TO BODY'
			}
		)
	}

	const updatedTodo = {
		...todoToUpdate,
		...title !== undefined && {title},
		...description !== undefined && {description},
		...completed !== undefined && {completed: Boolean(completed)},
		updatedAt: new Date()
	}

	db.set(id, updatedTodo);

	res.send(updatedTodo);
})

app.delete('/delete-todo/:id', (req, res) => {
	const {id} = req.params;

	const todo = db.get(id);

	if(!todo) {
		return res.status(404).send({message: 'TODO NOT FOUND'})
	}

	db.delete(id);

	res.send({message: 'TODO DELETED', id})
})

app.use((_, res) =>
	res.status(404).send({message: 'NOT FOUND'}))


app.listen(PORT, () => {
	console.log('Listening on port', PORT)
})


