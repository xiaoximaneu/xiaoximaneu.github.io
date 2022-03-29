d3.select("#chart1")
  .on("mousemove", function(event) {

    d3.select("#tooltip")
    .style("display", "block")
    .style("top", event.pageY + 20 + "px")
    .style("left", event.pageX + 20 + "px")
    .html("Welcome to the first chart!");

  })
  .on("mouseout", function(){
    d3.select("#tooltip")
    .style("display", "none");
  })