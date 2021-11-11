const { urlencoded } = require('express');
// require express
const express = require('express');

// require path
const path = require("path");

// require data base connection mongdb
const db = require('./config/mongoose');

// require datbase  schema
const Task = require('./models/task');

// create a port where the server is running
const port = 8000;

//  fire up our expresss server
const app = express();

// set a view engine here its ejs
app.set("view engine", "ejs");

//  set a path to find the view engine(ejs) folder
app.set("views", path.join(__dirname, "views"));

// fetch static files through express
app.use(express.static("./views"));

// parsing data which is coing from server
app.use(express.urlencoded());



// get request to receive data from browser
app.get('/', function(req, res) {
    // fetching data from db.......................
    Task.find({}, function(err, task) {
        if (err) {
            console.log('Error in fetching tasks from db');
            return;
        }
        //  resonse happen here send the views
        return res.render('home', {
            contact: task
        });
    })
});


//  receiving from data through url
app.post('/create', function(req, res) {
    Task.create({
        details: req.body.details,
        select: req.body.select,
        date: req.body.date
    }, function(err, newTaskk) {
        if (err) {
            console.log("creating databse is error", err);
            return;
        }
        console.log("add data successful", newTaskk);
        return res.redirect('back');
    })

})

// deleting Tasks
app.get('/delete-task', function(req, res) {
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {

        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err) {
            if (err) {
                console.log('error in deleting task');
                return;
            }
            console.log("delete successfully", Object.keys(id)[i]);
        })
    }
    return res.redirect('back');
});

// listen on port
app.listen(port, function(err) {
    if (err) {
        console.log("error", err);

    } else {
        console.log("the server is running sucessfully at port", port);
    }
})