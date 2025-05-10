
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';


function App() {
  console.log("App renderizou!");
  console.log("API:", import.meta.env.VITE_API);
  console.log("KEY:", import.meta.env.VITE_API_KEY);

  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
