//server w Express
let express = require('express');
let app = express();

//Db initial code
let Datastore = require('nedb');
let db = new Datastore('travel.db');
db.loadDatabase();

//make sure the program connects to the default port of the Glitch enviornment
let port = process.env.PORT || 4000;
app.listen(port, ()=> {
console.log('listening at ', port);
});


//Serve files from the public folder
app.use(express.static('public'));

//Status Data
let travelTracker = [];

//parse JSON data
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));


// //send data
// app.get('/data',(request,response) => {
//     response.json(data);
// })

//add a route to get all travel record
app.get('/getTravelRecord',(request,response) => {

    db.find({}, (err,docs)=> {
        if(err){
            response.json({task:"task failed"})
        }else{
            let obj = {data: docs};
            response.json(obj);
        }
        // console.log(docs);
        
    })
    
})

//add a route on server that is listening for a post request
app.post('/travelRecord', (request,response)=> {
    console.log(request.body);
    let currentDate = Date();
    let obj = {
        date:currentDate,
        record: request.body
    }
    // travelTracker.push(obj);
    // console.log(travelTracker);
    

    //insert travel data into the database
    db.insert(obj,(err,newDocs)=>{
        if(err){
            response.json({task:'task failed'});
        }else{
        console.log('new document inserted');
        response.json({task:"success"});
        }
        
    })

    // coffeeTracker.push(obj);
    // console.log(coffeeTracker);
    
})
    
// app.listen(4000,()=> {
//     console.log('app is listening at localhost:4000');
// })

