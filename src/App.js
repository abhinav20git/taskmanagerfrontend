import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Task from "./pages/Task/Task";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import Report from "./pages/Report/Report";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
          <Route path="login" element={<LogIn/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="task" element={<Task />} />
          <Route path="task/:id" element={<Task />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="report" element={<Report />} />
        </Route>
      </Routes>
        <ToastContainer />
    </>
  );
}

export default App;
