import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { ROUTES } from "./platform/routes";
import UserList from "./pages/UserList";
import ModifyUser from "./pages/ModifyUser";

function App() {
  return (
    <div className="G-page">
      <Router>
        <Sidebar />
        <Routes>
          <Route path={ROUTES.MODIFYUSER} element={<ModifyUser />} />
          <Route path={ROUTES.USERS} element={<UserList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
