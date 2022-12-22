// Read in samples.json URL with D3
function buildMetadata(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let metadata = data.metadata;
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    let pannel = d3.select('#sample-metadata');
    pannel.html("");
    for (key in result) {
      pannel.append('h6').text(`${key.toUpperCase()}: ${result[key]}`);
    };
  });
}

function buildCharts(sample){
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let samples = data.samples;
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    let otuIds = result.otu_ids;
    let otuLabels = result.otu_labels;
    let sampleValues = result.sample_values;

    let bubble = {
      title: 'All OTUs Found',
      margin: {t:0},
      hoverMode: 'closest',
      xaxis: {title:'OTU ID'},
      margin: {t:30}
    };
    let bubbleData = [
      {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: otuIds,
          colorscale: 'Bluered'
        }
      }
    ];
    Plotly.newPlot("bubble", bubbleData, bubble);
    let yTicks = otuIds.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let bar = [
      {
        y: yTicks,
        x: sampleValues.slice(0, 10).reverse(),
        text: otuLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      }
    ];
    let barLayout = {
      title: "Top 10 OTUs Found",
      margin: {t:30, l:150}
    };
    Plotly.newPlot("bar", bar, barLayout);
  });
}
  function init(){
    let selector = d3.select("#selDataset");
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let sampleName = data.names;
      for (let i = 0; i < sampleName.length; i++) {selector
        .append("option")
        .text(sampleName[i])
        .property("value", sampleName[i]);
      };
      let firstSample = sampleName[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();
