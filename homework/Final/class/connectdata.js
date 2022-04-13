//first way: nesting ome into another
d3.json("world-alpha3.json").then(function(world){

    //access to world

    d3.csv("data/myData.csv").then(function(myData){
        //access to myData and world
    });
});



//second way: 
var csvLoader =  d3.csv("data/myData.csv");
var worldLoader = d3.json("world-alpha3.json");

Promise.all([csvLoader, worldLoader]).then(function(results){
     var myData = results[0];
     var world = results[1];
});
