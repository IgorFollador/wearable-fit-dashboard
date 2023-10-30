import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <Home /> }></Route>
                <Route path="/login" element={ <Login /> }></Route>
                <Route path="/dashboard" element={ <Dashboard /> }>
                    {/* <Route path='clients' element= { <SectionClients /> }>
                        <Route path='clients/update/:id' element= { <SectionClient /> }/>
                    </Route>
                    <Route path='notifications' element= { <SectionNotifications /> }/> */}
                </Route>
            </Routes>
        </Router>
    )
}