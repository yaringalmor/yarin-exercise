//constructor
function CountingPanda(){
    this.counter = 0; //GET request counter
}

//Counts get requests, and return the counter
CountingPanda.prototype.countGetRequests = function(request){
    if (request.method === 'GET'){
        this.counter++;
        return this.counter;
    }
}

module.exports = CountingPanda;
