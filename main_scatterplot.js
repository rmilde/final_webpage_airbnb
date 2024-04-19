//Define data
const data = d3.csv("airbnb_data_3000_copy.csv");   

data.then(function(data) {

// Convert string values to numbers
data.forEach(function(d) {
    d.availability_365 = +d.availability_365;
});

data.forEach(function(d) {
    d.price = +d.price;
});

// Create SVG

//defime dimensions
let 
    width = 700,
    height = 500;

let margin = {
    top: 60,
    bottom: 50,
    left: 75,
    right: 30
    };

//build svg
let svg = d3
    .select('body')
    .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', '#e9f7f2');

// Define Scales
let pricemax = d3.max(data, d => d.price);  
let daymax = d3.max(data, d => d.availability_365);     
let padding = 1;

let xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.price)])
    .range([margin.left, width - margin.right]);

let yScale = d3.scaleLinear()
    .domain([daymax + 1, 0])    
    .range([margin.top, height - margin.bottom]);


//Draw Axes
svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft().scale(yScale));

svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

// add x axis label
svg.append("text")             
    .attr("transform",
          "translate(" + (width/2) + " ," + 
                         (height - margin.bottom + 40) + ")")
    .style("text-anchor", "middle")
    .text("Daily Price");

// Y-axis label
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 30) // Keeps the label horizontally aligned, closer to the Y-axis.
    .attr("x", -(height / 2)) // Adjust this value to move the label up or down along the Y-axis.
    .style("text-anchor", "middle")
    .text("Availability (days)");

svg.append("text")
    .attr("y", 30) 
    .attr("x", 400)             
    .attr("text-anchor", "middle")  
    .style("text-decoration", "underline")  
    .text("Availability vs. Price");

//Draw circles    
let circle = svg
  .selectAll('circle')
    .data(data)
  .enter()
  .append('circle')
    .attr('cx', d => xScale(d.price))
    .attr('cy', d => yScale(d.availability_365))
    .attr('r', 3)
    .attr('fill', 'steelblue');




// color and add legend?

});
