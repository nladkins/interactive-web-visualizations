
// read in json
d3.json("samples.json").then(function(data) {

  // console.log(data.samples)

  let myArray = []

  // Initialized arrays
  let id = []
  let otu_ids = []
  let sample_values = []
  let otu_labels = []

  // For loop to populate arrays
  for (let i = 0; i < data.samples.length; i++) {
    row = data.samples[i];
    id.push(row.id);
    otu_ids.push(row.otu_ids)
    sample_values.push(row.sample_values)
    otu_labels.push(row.otu_labels);
  }
  console.log(`ID: ${id}`)
  console.log(`otu_ids: ${otu_ids}`)
  console.log(`sample_values: ${sample_values}`)
  console.log(`otu_labels: ${otu_labels}`)


// Display the default plot
  var data = [{
    values: sample_values.slice(0,10),
    labels: otu_labels.slice(0,10),
    type: "bar"
  }];

  var layout = {
    height: 600,
    width: 800
  };

  var trace = {
    x: sample_values,
    y: otu_ids,
    text: otu_labels,
    marker: {
    color: "red"},
    type:"bar",
    // orientation: "h",
};
  // create data variable
  var data = [trace];

    // create layout variable to set plots layout
    var layout = {
        title: "Top 10 OTU",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };

  // create the bar plot
  Plotly.newPlot("bar", data, layout);
  
  // The bubble chart
  var trace1 = {
      x: otu_ids[0],
      y: sample_values[0],
      mode: "markers",
      marker: {
          size: sample_values[0],
          color: otu_ids[0]
      },
      text: otu_labels[0]
      }
    
  function getPlots(id) {
    function init() {
      // select dropdown menu 
      var dropdown = d3.select("#selDataset");

      // read the data 
      d3.json("samples.json").then((data)=> {
          console.log(data)

          // get the id data to the dropdwown menu
          data.names.forEach(function(name) {
              dropdown.append("option").text(name).property("value");
          });

          // call the functions to display the data and the plots to the page
          getPlots(data.names[0]);
          getDemoInfo(data.names[0]);
      });
    }

    init();
  }

})