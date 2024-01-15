import { HashRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Favorites from './components/Favorites.jsx';
import Home from './components/Home.jsx';
import { clearStorageAfterTtlMinutes } from "./util.js";
import ErrorPage from "./components/ErrorPage.jsx";
import './App.css';


function App() {
  clearStorageAfterTtlMinutes();
  return (
          <HashRouter>
            {/*Use HashRouter instead of BrowserRouter due to GitHub pages deploy requirements */}
            <Routes>
              <Route path="/" element={<Header />}>
                <Route index element={<Home />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="*" element={<ErrorPage/>}/>
              </Route>
            </Routes>
          </HashRouter>
  );
}

export default App;
