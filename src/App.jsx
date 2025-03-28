
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';


function App() {
  console.log("App renderizou!");

  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
