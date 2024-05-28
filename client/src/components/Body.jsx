import AdminMenu from "./AdminMenu";
import { Outlet } from 'react-router-dom';
const App = () => {
  return (
    <div className="body">
      <AdminMenu />
      <div className="body-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
