import {
  RouterProvider
} from "react-router-dom";
import router from "./Routes/routes";
import './App.css';
import MyNavbar from './components/Navbar/Navbar';

function App() {
  return (
   <>
   <MyNavbar/>
    < RouterProvider router = {
      router
    }/>
   </>
  );
}

export default App;
