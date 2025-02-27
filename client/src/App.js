import './App.css';
import {Outlet} from "react-router-dom";
import NavMenuFooter from "./components/NavMenu/Footer/NavMenuFooter";
import NavHeader from "./components/NavMenu/Header/NavHeader";

function App() {
    return (
        <div className="App">
            <NavHeader/>
                <Outlet/>
            <NavMenuFooter/>
        </div>
    );
}

export default App;
