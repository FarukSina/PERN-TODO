const express = require('express');
const pool = require("./db");
const app = express();
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());
// *** Routes *** \\

// create a todo
app.post("/todos", async(req,res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING description",[description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

// get all todos

app.get("/todos", async(req,res)=> {
    try {
       const allTodos = await pool.query("SELECT * FROM todo");
       res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
    
})
// get a todo

    app.get("/todos/:id", async(req,res) => {
        try {
            const todo_id = req.params.id;
            const getTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [todo_id]);
            res.json(getTodo.rows[0]);
        } catch (err) {
            console.error(err.message)
        }
  
    })

// update a todo

app.post("/todos/:id", async(req,res)=>{
    try {
        const id = req.params.id
    const {todo_id, description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description, id]);
        res.json("Todo is updated!!!");
    } catch (err) {
        console.error(err.message);
    }

})

// delete a todo
app.delete("/todos/:id", async(req,res) => {
    try {
        const id=req.params.id;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1",[id]);
        res.json("Todo is deleted!!!")
    } catch (err) {
        console.error(err.message);
    }
})

// run the server on port 5000

app.listen(5000, ()=> {
    console.log("server is running on port 5000")
})