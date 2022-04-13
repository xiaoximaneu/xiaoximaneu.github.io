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

      d3.csv("female_chess_player - standard_top.csv")
        .then(function(csvData){

          csvData.forEach(function (d){
              d.Rank = parseFloat(d.Rank);
              d.World_Rank = parseFloat(d.World_Rank);
              d.Standard_Rating = parseFloat(d.Standard_Rating);
              d.Year_of_birth = parseFloat(d.Year_of_birth);
              d.Games = parseFloat(d.Games);
          });

          console.log(csvData);

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
                  .attr("stroke", "black")
                  .on("mousemove", function(event, d) {
                    var myCountryData = csvData 
                      .filter(function(row) {
                        return row.Country === d.id;
                      });
                    console.log(myCountryData);

                    var playerList = "";
                    myCountryData.forEach(function(player) {
                      playerList = playerList + player.Name + "<br />";
                    });

                    var tooltip = d3.select("#tooltip")
                      .style("display", "block")
                      .style("left", event.pageX + 20 + "px")
                      .style("top", event.pageY + 20 + "px");
                 
                   tooltip.select("#Country").html(d.id);
                   tooltip.select("#players").html(myCountryData.length);
                   tooltip.select("#list").html(playerList);
                    
                  })
                  .on("mouseout", function(){
                    d3.select("#tooltip").style("display", "none");
                  });

                  //var points = [
                  //    {"name": "Boston", "coords": [-71.0589, 42.3601]},
                  //    {"name": "London", "coords": [-0.1278, 51.5074]}
                  //  ];
                    
                  //  var dots = map.selectAll("circle")
                  //    .data(points);
                    
                  //  dots.enter().append("circle")
                  //   .attr("r", 10)
                  //   .attr("transform", function(d){
                  //     return "translate(" + proj(d.coords) + ")";
                  //   });

      });
    
    
});



