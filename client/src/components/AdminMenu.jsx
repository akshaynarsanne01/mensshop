import {Link} from 'react-router-dom';
const AdminMenu = () => {
    return (
        <div className='menu-items'>
            <ul>
                <li><Link to="/admin">Home</Link></li>
                <li><Link to="/admin/Brand">Brand</Link></li>
                <li><Link to="/admin/category">Category</Link></li>
                <li><Link to="/admin/subcategory">Subcategory</Link></li>
                <li><Link to="/admin/products">Products</Link></li>
            </ul>
        </div>
    )
}

export default AdminMenu;
