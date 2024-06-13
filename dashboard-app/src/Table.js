import React from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid



export const Table=()=>{
	
	console.log("opening grid")
	const columnDefs  = [
		{ headerName: 'Date', field: 'date' },
		{ headerName: 'EUR', field: 'EUR'},
		{ headerName: 'CAD', field: 'CAD' },
		{ headerName: 'USD', field: 'USD' }
	];
	
	const defaultColDef={
		sortable:true, filter:true
	}
	
	const onGridReady=(params)=>{
		console.log("Grid is ready")
		fetch("http://127.0.0.1:8000/frankfurter/").then(resp=>resp.json())
		.then(resp=>{console.log(resp)
		params.api.applyTransaction({add:resp})
		//rowData=resp
		}).catch(error=>console.log(error))
		//params.api.applyTransaction({add:input})
	}
	return(<div className="ag-theme-quartz" // applying the grid theme
  style={{ height: 500 }}>
	<AgGridReact rowData={null} columnDefs={columnDefs} defaultColDef={defaultColDef} onGridReady={onGridReady}/>
	</div>
	
	)
}