import './App.css';
import { generateData } from './data';
import VirtualTableScroll from './VirtualTableScroll';

function App() {
  const data = generateData();
  const headers = Object.keys(data[0]).filter(field => field !== 'id');
  return (
    <div className="App">
      <VirtualTableScroll
        rows={data}
        headers={headers}
        visibleRows={10}
        rowHeight={50}
      />
    </div>
  );
};

export default App;
