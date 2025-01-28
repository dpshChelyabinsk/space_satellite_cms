import './App.css';
import {BrowserRouter} from "react-router-dom";
import LinksRoute from "./router/Router";
import {CarouselProvider} from "./contexts/CarouselContext";

import NavMenuFooter from "./components/NavMenu/Footer/NavMenuFooter";
import NavHeader from "./components/NavMenu/Header/NavHeader";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <CarouselProvider>
                    <NavHeader/>
                    <LinksRoute/>
                    <NavMenuFooter/>
                </CarouselProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
