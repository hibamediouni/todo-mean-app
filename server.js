//calling express library
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var http = require('http');


//connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todo');

//creating model
var TaskSchema = mongoose.Schema({
    task: {
        type: String
    },
    status: {
        type: Boolean
    },
}, {
    collection: 'task'
});

var TaskModel = mongoose.model("TaskModel", TaskSchema);


//configure app
app.use('/app', express.static(__dirname + '/app')); 
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({
    extended: true
})); 

// Loading the index file . html displayed to the client
var server = http.createServer(app);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    console.log('A client is connected!');
    socket.on('updateTaskSocket', function(task) {
        io.emit('updateTodolist'); // send to all include the sender
    });
});

server.listen(8080);

//GET request 
app.get('/', function(req, res) {
    res.sendfile('app/index.html');
});


//POST request to save todo task in DB
app.post("/api/create/todo", createTodo);

function createTodo(req, res) {
    var todoTask = req.body;
    //save the task in DB
    TaskModel
        .create(todoTask)
        .then(
            function(success) {
                res.send("created");
            },
            function(error) {
                res.send("error");
            }
        )
    res.json(todoTask);
}


//GET all task
app.get("/api/get/tasks", getAllTasks);

function getAllTasks(req, res) {
    TaskModel
        .find()
        .then(
            function(tasks) {
                res.json(tasks);
            },
            function(err) {
                res.sendStatus(400);
            });
}

//DELETE task
app.delete("/api/delete/task/:id", deleteTask);

function deleteTask(req, res) {
    var taskId = req.params.id;
    TaskModel
        .remove({
            _id: mongoose.Types.ObjectId(taskId)
        })
        .then(function() {
                res.sendStatus(200);
            },
            function() {
                res.sendStatus(400)
            });
}

//UPDATE task
app.put("/api/edit/task/:id", editTask);

function editTask(req, res) {
    var taskId = req.params.id;
    var obj = req.body;
    TaskModel.findByIdAndUpdate(taskId, {
            task: obj.task,
            status: obj.status
        },
        function(err) {
            if (err) {
                res.send("error");
                return;
            }
            res.send("updated");
        });
}

//DELETE all task
app.delete("/api/delete/task", deleteAllTask);

function deleteAllTask(req, res) {
    TaskModel
        .remove({})
        .then(function() {
                res.sendStatus(200);
            },
            function() {
                res.sendStatus(400)
            });
}
