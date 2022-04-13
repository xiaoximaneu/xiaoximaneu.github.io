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
});



