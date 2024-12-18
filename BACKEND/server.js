const express = require("express");
const parser = require("body-parser");
const fs = require("fs");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

const todoFile = "./todo.json";
const readTodos = ()=>{
    const data = fs.readFileSync(todoFile,"utf8");
    return JSON.parse(data);
}
const writeTodos = (todos)=>{
    fs.writeFileSync(todoFile,JSON.stringify(todos,null,2));
}

app.get('/',(req,res)=>{
    const todos = readTodos();
    res.json(todos);
});
app.post('/todo',(req,res)=>{
    const todos = readTodos();
    const newTodo = {
        id:todos.length+1,
        task: req.body.task,
        completed: false,
    }
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
});
app.put('/todo/:id',(req,res)=>{
    const todos = readTodos();
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex((todo)=> todo.id === todoId);
    if(todoIndex===-1){
        return res.status(404).json({error:"todo not found"})
    }
    const updatedTodo = {
        id:todoId,
        task:req.body.task,
        completed:req.body.completed || false
    }
    todos[todoIndex] = updatedTodo;
    writeTodos(todos);
    res.status(200).json({message:"todos updated successfully"});
});
app.patch('/todo/:id',(req,res)=>{
    const todos = readTodos();
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex((todo)=> todo.id === todoId);
    if(todoIndex===-1){
        return res.status(404).json({error:"todo not found"})
    }
    todos[todoIndex].completed = true;
    writeTodos(todos);
    res.status(200).json(todos[todoIndex]);
});
app.delete('/todo/:id',(req,res)=>{
    const todos = readTodos();
    const todoId = parseInt(req.params.id);
    const filteredTodos = todos.filter((todo)=>todo.id!==todoId);
    if(filteredTodos.length === todos.length){
       return res.status(404).json({error:"todo not found"}); 
    }
    writeTodos(filteredTodos);
    res.status(200).json({message:"todo deleted successfully"});
});
app.listen(port , ()=>{
    console.log(`listening to port ${port}`);
})
