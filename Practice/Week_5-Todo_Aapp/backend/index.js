const express = require("express");
const{ createTodo,updateTodo }  = require("./types");
const { todo } = require("./db");
const cors = require("cors");

const app = express();


const PORT= 3008;

app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173"
}));

app.post("/todo", async function(req, res){
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg: "You send wrong inputs",
        })
        return ;
    }
    await todo.create({
        title: createPayload.title,
        description : createPayload.description,
        completed: false
    })

    res.json({
        msg: "todo created!"
    })
    //else put in mongodb
}); 

app.get("/todos", async function(req, res){
    const todos = await todo.find({});

    res.json({
        todos
    })
});


app.put("/completed",async function(req, res){
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs"
        })
        return;
    }

    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })

    res.json({
        msg: "todo maked as completed"
    })
});


app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`);
})