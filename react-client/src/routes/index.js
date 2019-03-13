import ExampleTable from '../components/ExampleTable';
import ExampleBarGraph from '../components/ExampleBarGraph';

var routes = [
    { path: "/", exact:true, component: ExampleTable },
    { path: "/bargraph", exact:true, component: ExampleBarGraph },
]

export default routes;
