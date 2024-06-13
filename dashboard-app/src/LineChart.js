import React from 'react'
import {Chart as ChartJS} from "chart.js/auto";
import { Line} from 'react-chartjs-2';



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

export const LineChart=({input})=>{
	console.log("opening linechart" )
	fetch("http://127.0.0.1:8000/frankfurter/").then(resp=>resp.json()).then(resp=>resp.forEach(setLineData))
	//input.forEach(setLineData)
	//.then(resp=>{lineData.labels.push(resp.map(i=>i.date))
	//lineData.datasets[0].data.push(resp.map((i)=>i.EUR))
	//lineData.datasets[1].data.push(resp.map((i)=>i.CAD))
	//lineData.datasets[2].data.push(resp.map((i)=>i.USD))
	//})
	
	//.then(resp=> lineData.datasets[0].data.push(resp.map(i=>i.EUR)))
	//console.log(lineData.datasets[0])

	//return(<div>Line Test</div>)
	console.log("linechart is ready")
	return (<Line data={lineData}/>)
}

function setLineData(param){
	//console.log(param.date)
	lineData.labels.push(param.date)
	lineData.datasets[0].data.push(param.EUR)  
	lineData.datasets[1].data.push(param.CAD)  
	lineData.datasets[2].data.push(param.USD)  
	
	
}