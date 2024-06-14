
import {GridAndChart} from './GridAndChart'
import * as ReactDOM from 'react-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

function App(){
	console.log("opening app")
	const el=(
	<div style={{ padding: 50 }}>
        <h1>Frankfurter Dashboard</h1>
		<GridAndChart/>
	</div>
	);
	//return (el)
	root.render(el)
	
	
	


}

export default App;


/* 		//<h2> EUR CAD and USD AG-Grid</h2>
		//<Table/>
		//</div>
		//<div>
		//<h2> EUR CAD and USD Chart</h2>
		//<LineChart />
		//</div> */
