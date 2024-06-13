import React from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import {Chart as ChartJS, defaults} from "chart.js/auto";
import { Line} from 'react-chartjs-2';

//defaults.maintainAspectRatio=false;
defaults.responsive = true;
export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },

};

 const defaultColDef = {
		flex: 1,
  }
  
 const columnDefs  = [
		{ headerName: 'Date', field: 'date' },
		{ headerName: 'EUR', field: 'EUR'},
		{ headerName: 'CAD', field: 'CAD' },
		{ headerName: 'USD', field: 'USD' }
	];
	
const lineData ={
	labels: [],
	datasets: [
    {
      label: 'EUR',
      data:[],
    },
	{
	  label: 'CAD',
      data:[],
	},
	{
	  label: 'USD',
      data:[],

	}
  ]
};

export const GridAndChart= ()=>{
	console.log("Building displays")

	const output =(
		<div>
	<h2> EUR CAD and USD Chart</h2>
	<div>
	<Line id='lineObj' data={lineData} />
	</div>
	<h2> EUR CAD and USD AG-Grid</h2>
	<div className="ag-theme-quartz" // applying the grid theme
  style={{ height: 500 }}>
	<AgGridReact rowData={null} columnDefs={columnDefs} defaultColDef={defaultColDef} onGridReady={onGridReady}/>
	</div>
	</div>
	)
	
	return(output)
}
function onGridReady (params){
		console.log("Grid is ready")
		fetch("http://127.0.0.1:8000/frankfurter/").then(resp=>resp.json())
		.then(resp=>{console.log(resp)
		params.api.applyTransaction({add:resp})
		resp.forEach(setLineData)
		//rowData=resp
		}).catch(error=>console.log(error))
		//params.api.applyTransaction({add:input})
		console.log(this)
		
		
	}

function setLineData(param){
	//console.log(param.date)
	lineData.labels.push(param.date)
	lineData.datasets[0].data.push(param.EUR)  
	lineData.datasets[1].data.push(param.CAD)  
	lineData.datasets[2].data.push(param.USD)  
	
	
}