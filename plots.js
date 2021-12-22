// var data = []
// // read in json
// d3.json("samples.json").then(function(data) {
//     console.log(data.samples)
// })

// Initialized arrays
let ids = []
let samples = []
let otu_ids = []
let sample_values = []
let otu_labels = []

// For loop to populate arrays
for (let i = 0; i < samples.length; i++) {
  row = samples[i];
  samples.push(row.samples);
  ids.push(row.ids)
  otu_ids.push(row.otu_ids)
  sample_values.push(row.sample_values)
  otu_labels.push(row.otu_labels);
}

// Trace1 for the Greek Data
let trace1 = {
  x: otu_ids,
  y: sample_values,
  text: ids,
  type: "bar"
};

let data1 = [trace1]

// // Trace 2 for the Roman Data
// let trace2 = {
//   x: names,
//   y: romanSearchResults,
//   text: romanNames,
//   name: "Roman",
//   type: "bar"
// };

// // Create data array
// let data = [trace1, trace2];

// Apply a title to the layout
let layout = {
  title: "OTUs found in that individual"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar", data1, layout);

