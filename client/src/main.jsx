import App from './App.jsx'
import Dashboard from './components/Dashboard.jsx';
import Brand from './components/Brand.jsx';
import Category from "./components/Category.jsx"
import SubCategory from "./components/Subcategory.jsx";
import Products from "./components/products.jsx";
import ErrorPage from "./components/ErrorPage.jsx"
import './index.css'
import  ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Dashboard /> },
            { path: "admin", element: <Dashboard /> },
            { path: "admin/Brand", element: <Brand /> },
            { path: "admin/Brand/:id", element: <Brand /> },
            { path: "admin/category", element: <Category /> },
            { path: "admin/subcategory", element: <SubCategory /> },
            { path: "admin/products", element: <Products /> }
        ]
    }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
