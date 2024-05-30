import { useEffect, useState } from "react";
import loading from "../assets/infinite-spinner.svg";

const Category = () => {
    const [allCategory, setAllCategory] = useState([]);
    const [error, setError] = useState(null);
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [showAddCategoryOverlay, setShowAddCategoryOverlay] = useState(false);
    const [formData, setFormData] = useState({ category_id: "", category_name: "", description: "" });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/admin/category");
            if (response.ok) {
                const data = await response.json();
                setAllCategory(data.data);
                setFilteredCategory(data.data);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filtered = allCategory.filter(category =>
            category.category_name.toLowerCase().includes(searchValue) ||
            category.description.toLowerCase().includes(searchValue)
        );
        setFilteredCategory(filtered);
    };

    const handleSubmit = () => {
        formData.category_id ? updateCategory(formData) : addCategory(formData);
    };

    const handleEdit = (category) => {
        setFormData(category);
        setShowAddCategoryOverlay(true);
    };

    const updateCategory = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/category/${data.category_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            await response.json();
            closeOverlay();
            fetchData();
        } catch (error) {
            console.error('There was a problem with the update request:', error);
            setError('There was a problem with the update request.');
        }
    };

    const addCategory = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            await response.json();
            closeOverlay();
            fetchData();
        } catch (error) {
            console.error('There was a problem with the add request:', error);
            setError('There was a problem with the add request.');
        }
    };

    const deletecategory = async (e) => {
        const category_id = e.target.value;
        try {
            const response = await fetch(`http://localhost:3000/admin/category/${category_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
            await response.json();
            fetchData();
        } catch (error) {
            console.error('There was a problem with the delete request:', error);
            setError('There was a problem with the Delete request.');
        }
    };

    const closeOverlay = () => {
        setShowAddCategoryOverlay(false);
        setFormData({ category_id: "", category_name: "", description: "" });
    };

    return (
        <>
            {showAddCategoryOverlay && (
                <div className="overlay">
                    <div className="add-brand-overlay">
                        <h3>{formData.category_id ? "Update" : "Add"} Category</h3>
                        <input
                            type="text"
                            placeholder="Category name"
                            className="input-focus"
                            value={formData.category_name}
                            onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <div className="add-overlay-buttons">
                            <button onClick={closeOverlay}>Close</button>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <div className="cards-headers">
                    <h1>CATEGORY</h1>
                    <button onClick={() => setShowAddCategoryOverlay(true)}>Add Category</button>
                </div>
                <div className="card-body">
                    <div className="card-header-input">
                        <input type="text" placeholder="Search..." onChange={handleInputSearch} />
                        <button onClick={() => setFilteredCategory(allCategory)}>Clear Filter</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Category Name</th>
                                <th>Description</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategory.map((category, index) => (
                                <tr key={index}>
                                    <td>{`${index + 1}`}</td>
                                    <td>{category.category_name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <button className="option-buttons edit" onClick={() => handleEdit(category)}>Edit</button>
                                        <button className="option-buttons delete" onClick={deletecategory} value={category.category_id}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isLoading && (
                        <div className="loading-container">
                            <img className="loading-img" src={loading} alt="Loading" />
                        </div>
                    )}
                    {error && <div>Error: {error}</div>}
                </div>
            </div>
        </>
    );
};

export default Category;
