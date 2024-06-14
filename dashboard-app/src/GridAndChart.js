import React from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import {Chart, defaults} from "chart.js/auto";
import { Line} from 'react-chartjs-2';
import { useCallback, useEffect, useState, useRef } from 'react';

//defaults.maintainAspectRatio=false;
defaults.responsive = true;



var base='EUR'
var baseChart='EUR'
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
		flex: 1,filter:true,
  }
  
const gridOptions={
	sidebar:true,
	
}
  
 const columnDefs  = [
		{ headerName: 'Date', field: 'date' },
		{ headerName: 'EUR', field: 'EUR'},
		{ headerName: 'CAD', field: 'CAD' },
		{ headerName: 'USD', field: 'USD' },
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
var gridData=[]
export const GridAndChart= ()=>{
	const [gridApi, setGridApi]= useState();
	const [lineApi, setLineApi]= useState();
	console.log("Building displays")
	const [gridData,setGridData]= useState([])
	var output=null
	useEffect(()=>{
		fetch("http://127.0.0.1:8000/frankfurter/").then(resp=>resp.json())
		.then(data=>{console.log(data)
		//gridapi.api.applyTransaction({add:data})
		//data.forEach(setGridData)
		setGridData(data)
		data.forEach(setLineData)
		//lineData.labels.push(data.map(data => data.date))
		console.log("line data: " + lineData)
		})
	},[])
	
	const onGridReady = (params)=>{
		
		console.log("Grid is ready")
		setGridApi(params)
		console.log(params)
		chartRef.current.update();

	}
	
	const saveState = () => {
		//window.colState = gridApi.api.getColumnState();
		const colState= JSON.stringify(gridApi.api.getColumnState());
		const baseState=JSON.stringify(base);
		const filterState= JSON.stringify(gridApi.api.getFilterModel());
		localStorage.setItem('colState',colState);
		localStorage.setItem('base',baseState);
		localStorage.setItem('filter',filterState);
		//savedBase=base;
		//setLocalStorage(colState);
		//closeSidebarToolpanel();
		console.log("column state saved");
		console.log(colState);
  };

  const loadState = () => {
	const colState= JSON.parse(localStorage.getItem('colState'));
	const baseState=JSON.parse(localStorage.getItem('base'));
	const filterState=JSON.parse(localStorage.getItem('filter'));
    if (!colState) {
      console.log("no columns state to restore by, you must save state first");
      return;
    }

    gridApi.api.applyColumnState({
      state: colState,
      applyOrder: true,
    });
	gridApi.api.setFilterModel(filterState);
	if(baseState=='EUR'){
		EURButton()
	}else if (baseState=='CAD'){
		CADButton()
	}else if (baseState=='USD'){
		USDButton()
	}
    //closeSidebarToolpanel();
    console.log("column state restored");
  };

  const resetState = () => {
    gridApi.api.resetColumnState();
	EURButton();
	gridApi.api.setFilterModel();
    //clearLocalStorage();
    //closeSidebarToolpanel();
    console.log("column state reset");
  };
  
  const EURButton=(params)=>{
	//console.log(params)
	if(base=='EUR'){
		return
	}
	base='EUR'
	console.log("EUR")
	const setBaseEUR =(data)=>{
		const eur=data.EUR
		const cad=data.CAD
		const usd=data.USD
		data.EUR=1
		data.CAD=cad/eur
		data.USD=usd/eur
	}
	gridData.forEach(setBaseEUR)
	console.log(gridData)
	gridApi.api.refreshCells()
}
const CADButton=(params)=>{
	if(base=='CAD'){
		return
	}
	base='CAD'
	console.log("CAD")
	const setBaseCAD =(data)=>{
		const eur=data.EUR
		const cad=data.CAD
		const usd=data.USD
		data.EUR=eur/cad
		data.CAD=1
		data.USD=usd/cad
	}
	gridData.forEach(setBaseCAD)
	console.log(gridData)
	gridApi.api.refreshCells()
}
const USDButton=(params)=>{
		if(base=='USD'){
		return
	}
	base='USD'
	console.log("USD")
	const setBaseUSD =(data)=>{
		const eur=data.EUR
		const cad=data.CAD
		const usd=data.USD
		data.EUR=eur/usd
		data.CAD=cad/usd
		data.USD=1
	}
	gridData.forEach(setBaseUSD)
	console.log(gridData)
	gridApi.api.refreshCells()
}
const chartRef=useRef();



const onClick= (event) =>{
	console.log("clicked the chart")
}

const EURChartButton=(params)=>{

	if(baseChart=='EUR'){
		chartRef.current.update();
		return
	}
	baseChart='EUR'
	console.log("EUR")
	const setBaseEUR =(eur,cad,usd)=>{
		for(let i=0;i<usd.data.length;i++){
			const e=eur.data[i];
			const c=cad.data[i];
			const u=usd.data[i];
			eur.data[i]=1
			cad.data[i]=c/e
			usd.data[i]=u/e
			
		}
	}
	setBaseEUR(lineData.datasets[0],lineData.datasets[1],lineData.datasets[2])
	//console.log(lineData.datasets[1])
	chartRef.current.update();
}

const CADChartButton=(params)=>{
	if(baseChart=='CAD'){
		chartRef.current.update();
		return
	}
	baseChart='CAD'
	console.log("CAD")
	const setBaseCAD =(eur,cad,usd)=>{
		for(let i=0;i<usd.data.length;i++){
			const e=eur.data[i];
			const c=cad.data[i];
			const u=usd.data[i];
			eur.data[i]=e/c
			cad.data[i]=1
			usd.data[i]=u/c
			
		}
	}
	setBaseCAD(lineData.datasets[0],lineData.datasets[1],lineData.datasets[2])
	//console.log(lineData.datasets[1])
	chartRef.current.update();
	//lineData.datasets.forEach(setBaseCAD);

}

const USDChartButton=(params)=>{
	if(baseChart=='USD'){
		chartRef.current.update();
		return
	}
	baseChart='USD'
	console.log("USD")
	const setBaseUSD =(eur,cad,usd)=>{
		for(let i=0;i<usd.data.length;i++){
			const e=eur.data[i];
			const c=cad.data[i];
			const u=usd.data[i];
			eur.data[i]=e/u
			cad.data[i]=c/u
			usd.data[i]=1
			
		}
	}
	setBaseUSD(lineData.datasets[0],lineData.datasets[1],lineData.datasets[2])
	//console.log(lineData.datasets[1])
	chartRef.current.update();
	//lineData.datasets.forEach(setBaseCAD);

}

	const saveChartState = () => {
		//window.colState = gridApi.api.getColumnState();
		const colState= JSON.stringify(gridApi.api.getColumnState());
		const baseState=JSON.stringify(base);
		localStorage.setItem('colState',colState);
		localStorage.setItem('base',baseState);
		//savedBase=base;
		//setLocalStorage(colState);
		//closeSidebarToolpanel();
		console.log("column state saved");
		console.log(colState);
  };


	output =(
	<div className="main-container" >
	<h2> EUR CAD and USD AG-Grid</h2>
	<p></p>
	<div className="button-container" >
            <button onClick={saveState} >Save State</button>
            <button onClick={loadState} >Load State</button>
            <button onClick={resetState} >Reset State</button>
			<button onClick={EURButton} >Set Base to EUR</button>
            <button onClick={CADButton} >Set Base to CAD</button>
            <button onClick={USDButton} >Set Base to USD</button>
     </div>
	<div className="ag-theme-quartz" // applying the grid theme
  style={{ height: 500 , width: '70%'}}>
	<AgGridReact id='gridObj' rowData={gridData} columnDefs={columnDefs} defaultColDef={defaultColDef} onGridReady={onGridReady} />
	</div>
	<h2> EUR CAD and USD Chart</h2>
		<div className="button-container" >
			<button onClick={EURChartButton}>Set Base to EUR</button>
            <button onClick={CADChartButton}>Set Base to CAD</button>
            <button onClick={USDChartButton}>Set Base to USD</button>
     </div>
	<div >
	<Line id='lineObj' data={lineData} ref={chartRef} onClick={onClick}/>
	</div>
	</div>
	)
	
	return(output)
}





function setLineData(param){
	//console.log(param.date)
	lineData.labels.push(param.date)
	lineData.datasets[0].data.push(param.EUR)  
	lineData.datasets[1].data.push(param.CAD)  
	lineData.datasets[2].data.push(param.USD)  
	
	
}

function setGridData(param){
	gridData.push(param)
}