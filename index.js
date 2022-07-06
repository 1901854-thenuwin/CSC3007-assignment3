let width = 1000,
  height = 600;

let svg = d3.select("svg").attr("viewBox", "0 0 " + width + " " + height);

// Load external data
Promise.all([d3.json("sgmap.json"), d3.csv("population2021.csv")]).then(
  (data) => {
    console.log(data[0]);
    console.log(data[1]);
    console.log(data[1][0]["Planning Area"]);

    // Map and projection
    var projection = d3
      .geoMercator()
      .center([103.851959, 1.29027])
      .fitExtent(
        [
          [20, 20],
          [980, 580],
        ],
        data[0]
      );

    let geopath = d3.geoPath().projection(projection);

    svg
      .append("g")
      .attr("id", "districts")
      .selectAll("path")
      .data(data[0].features)
      .enter()
      .append("path")
      .attr("d", (d) => geopath(d))
      //   .attr("fill", "black")

      .attr("fill", function () {
        return data[1][0]["Planning Area"] <= 222 ? "black" : "orange";
      })
      
      //   .attr("fill", "#777")
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)

      .on("mouseover", (event, d) => {
        d3.select(".tooltip")
          .text(d.properties.Name)
          .style("position", "absolute")
          .style("background", "white")
          .style("left", event.pageX + "px")
          .style("top", event.pageY + "px");

        d3.select(event.currentTarget).style("stroke", "green");
        // console.log('mouse over',d.properties.Name)
        //  console.log('mouse over',data[0].features)
      })
      // to be modified later
      .on("mouseout", (event, d) => {
        d3.select(".tooltip").text("");

        d3.select(event.currentTarget).style("stroke", "white");
      });
  }
);
