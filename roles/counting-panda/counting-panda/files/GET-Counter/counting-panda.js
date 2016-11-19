//constructor
function CountingPanda(){
    this.counter = 0; //GET request counter
}

CountingPanda.prototype.countGetRequests = function(request){
    if (request.method === 'GET'){
        this.counter++;
        return this.counter;
    }
}

//CountingPanda.prototype.getNumOfGetRequests = function(){
//    return this.counter;
//}

module.exports = CountingPanda;
