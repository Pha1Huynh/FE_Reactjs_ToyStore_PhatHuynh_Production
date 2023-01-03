import './HeaderAdmin.scss';
import { Link } from 'react-router-dom';
function HeaderAdmin() {
  return (
    <div className="header-admin-container">
      <div className="dropdown data-manage">
        <button className="dropbtn ">Data</button>
        <div className="dropdown-content">
          <Link to="/admin">Admin Home</Link>
          <Link to="/admin-user-manage">User-manage</Link>
          <Link to="/admin-allcodes-manage">Allcode-manage</Link>
          <Link to="/admin-toy-manage">Toy-manage</Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;
