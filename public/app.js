window.addEventListener('load', ()=> {
    //log the travel record by the clicking of the button and make it show
    document.getElementById('record-button').addEventListener('click',()=> {
        let travelRecord = document.getElementById('travel-note').value;
        console.log(travelRecord);

        //creating objects, 
        let obj = {"comment": travelRecord};

        // stringify the objects
        let jsonData = JSON.stringify(obj);


        //fech the travelRecord
        fetch('/travelRecord', {
            method:'POST',
            headers: {
                "Content-type": "application/json"
            },
            body:jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});
        //make a fetch reqyest of type POST so that we can send the info(noCups) to the server

    })
    document.getElementById('get-tracker').addEventListener('click', ()=> {
        //get info on All the travel status
        fetch('/getTravelRecord')
        .then(response =>response.json())
        .then(data => {
            document.getElementById('travel-info').innerHTML = '';
            console.log(data.data);
            for(let i=0; i<data.data.length; i++){
                let string = data.data[i].date + ' : ' + data.data[i].record.comment;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('travel-info').appendChild(elt);
            }
        })
    })
})