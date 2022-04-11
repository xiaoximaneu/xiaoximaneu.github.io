var width = 1000;
var height = 600;

var svg = d3.select("#viz")
            .attr("width", width)
            .attr("height", height);

svg.select("#ocean")
            .attr("width", width)
            .attr("height", height);

var map = svg.select("#map");

d3.json("world-alpha3.json")
    .then(function(world) {

    console.log(world);
    var geoJSON = topojson.feature(world, world.objects.countries);

    geoJSON.features = geoJSON.features.filter(function(d) {
                return d.id !== "ATA";
                });
    console.log(geoJSON);

    var proj = d3.geoMercator()
                .fitSize([width, height], geoJSON);
    
    var path = d3.geoPath()
                .projection(proj);
    var countries = map.selectAll("path")
                .data(geoJSON.features);

    countries.enter().append("path")
            .attr("d", path)
            .attr("fill", "white")
            .attr("stroke-width", 1)
            .attr("stroke", "black");
    
    
});

