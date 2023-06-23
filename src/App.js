import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./Components/Home"
import Login from "./Components/Login"
import ProtectedRoute from "./Components/ProtectedRoute";
import SideNav from "./Components/SideNav"
import Search from "./Components/Search";


import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<ProtectedRoute> <SideNav /> </ProtectedRoute>}>
					<Route path="/" element={<Home />} />
					<Route path="/search" element={<Search />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App;
