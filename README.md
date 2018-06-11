# A real time toDolist Application


About ToDoList is a full-stack MEAN (MongoDB, Express.js, Angular.js, Node.js) application that allows users to store To Do items.


- A task consists of a description and a check box to choose the state of the task (Done / In Progress). 
If the task is complete, it will be visually different, and also moved under the last active task (In Progress).
  - The user must be able to Create / Change the state / Delete a task.
  - The user must be able to delete all items at once.

I build a REST API with both websockets and http where I use websockets to tell the client that new data is available or provide the new data to the client directly.

* Idea : 


    User1 get all tasks with GET /tasks
    User1 register to get websocket updates when a change is done to /tasks
    User2 add a task with POST /tasks
    The new task is sent to User1 by websocket


Built With the Following Technologies/Tools:

    Node.js (Express)
    Angular.js
    MongoDB (Mongoose)
    Passport.js
    Bootstrap
    Gulp

To Run an Instance of this App :

    Start the server with node server.js (Access to: http://localhost:8080)

