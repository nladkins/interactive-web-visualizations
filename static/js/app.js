function getPlots(id) {
  // read in json
  d3.json("samples.json").then(function(data) {

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

  // Verify Data was pushed correctly.
    console.log(`ID: ${id}`)
    console.log(`otu_ids: ${otu_ids}`)
    console.log(`sample_values: ${sample_values}`)
    console.log(`otu_labels: ${otu_labels}`)

  // create a trace for the bar chart using slice for the top 10.
    var trace = {
      x: otu_ids.slice(0,10),
      y: sample_values.slice(0,10),
      text: otu_labels.slice(0,10),
      marker: {
      color: 'blue'},
      type:"bar",
      orientation: "h",
    };
    
  // create data variable
    var data = [trace];

  // create a title for the plot
    var layout = {
      title: "10 of the Top OTUs",
    }

  // create the bar plot
    Plotly.newPlot("bar", data, layout);
    
  
  // create a trace for the pie chart using slice for the top 10.
    var trace1 = {
        x: otu_ids.slice(0,10),
        y: sample_values.slice(0,10),
        mode: "markers",
        marker: {
            size: sample_values.slice(0,10),
            color: otu_ids.slice(0,10)
        },
        text: otu_labels.slice(0,10)[0]
        }
  })

}

// collect the demographic information using the id as the key
function getDemoInfo(id) {

// Read in the json file again to get the metadata for demographics
  d3.json("samples.json").then((data)=> {

// specifically grab the metadata for the demographic info
  var metadata = data.metadata;

// print the metadata
  console.log(metadata)

// filter the metadata using the id as the key
  var result = metadata.filter(meta => meta.id.toString() === id)[0];

// Map the new information to the the demographic section in the html doc
  var demographicInfo = d3.select("#sample-metadata");
  
// clear out the demographic information for the new id selected
  demographicInfo.html("");

// append the relevant demographic to display the id selected by the user
  Object.entries(result).forEach((key) => {   
      demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
  });
  });
}

// Need a function to identify the event that changed
function optionChanged(id) {
  getPlots(id);
  getDemoInfo(id);
}

function init() {
// select the drop down portion of the html document
  var dropdown = d3.select("#selDataset");

// read the json data again pulling in the names for the drop down menu items
  d3.json("samples.json").then((data)=> {
    console.log(data)

  // get the name data for the drop down items
    data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
    
  // using the name info to call out the function for the demographic info
    getPlots(data.names[0]);
    getDemoInfo(data.names[0]);
      
    });

  });

}
// initialize
init();
