import { useEffect, useState } from "react";
import loading from "../assets/infinite-spinner.svg";

const Subcategory = () => {
    const [allCategory, setAllCategory] = useState([]);
    const [allSubCategory, setAllSubCategory] = useState([]);
    const [error, setError] = useState(null);
    const [filteredSubCategory, setFilteredSubCategory] = useState([]);
    const [showAddSubCategoryOverlay, setShowAddSubCategoryOverlay] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [formData, setFormData] = useState({ category_id: "", sub_category_id: "", sub_category_name: "", description: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/admin/subcategory");
            const categoryResponse = await fetch("http://localhost:3000/admin/category");
            if (response.ok && categoryResponse.ok) {
                const data = await response.json();
                const categories = await categoryResponse.json();
                setAllSubCategory(data.data);
                setFilteredSubCategory(data.data);
                setAllCategory(categories.data);
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
        const filtered = allSubCategory.filter(sub_category =>
            (sub_category.sub_category_name && sub_category.sub_category_name.toLowerCase().includes(searchValue)) ||
            (sub_category.description && sub_category.description.toLowerCase().includes(searchValue))
        );
        setFilteredSubCategory(filtered);
    };
    

    const handleSubmit = () => {
        formData.sub_category_id ? updateSubCategory(formData) : addSubCategory(formData);

    };

    const handleEdit = (category) => {
        setFormData(category);
        setShowAddSubCategoryOverlay(true);
        setIsEdit(false);
    };
    const handleOption = (event) => {
        setSelectedCategory(event.target.value);
        setFormData({ ...formData, category_id: event.target.value });
    }
    const updateSubCategory = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/subcategory/${data.sub_category_id}`, {
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

    const addSubCategory = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/subcategory/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({category_id:parseInt(data.category_id),sub_category_name:data.sub_category_name,description:data.description}),
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

    const deletesubcategory = async (e) => {
        const sub_category_id = e.target.value;
        try {
            const response = await fetch(`http://localhost:3000/admin/subcategory/${sub_category_id}`, {
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
        setShowAddSubCategoryOverlay(false);
        setFormData({ sub_category_id: "", sub_category_name: "", description: "" });
    };

    return (
        <>
            {showAddSubCategoryOverlay && (
                <div className="overlay">
                    <div className="add-brand-overlay">
                        <h3>{formData.sub_category_id ? "Update" : "Add"} Subcategory</h3>
                        <div>
                            {isEdit &&
                                <select className="category-dropdown" value={selectedCategory} onChange={handleOption}>
                                    <option value="">Select category</option>
                                    {
                                        allCategory.map(category => (
                                            <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                        ))
                                    }
                                </select>
                            }

                        </div>
                        <input
                            type="text"
                            placeholder="Category name"
                            className="input-focus"
                            value={formData.sub_category_name}
                            onChange={(e) => {
                                setFormData({ ...formData, sub_category_name: e.target.value })
                            }}
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
                    <h1>SUBCATEGORY</h1>
                    <button onClick={() => {
                        setShowAddSubCategoryOverlay(true);
                        setIsEdit(true);
                    }
                    }>Add Sub Category</button>
                </div>
                <div className="card-body">
                    <div className="card-header-input">
                        <input type="text" placeholder="Search..." onChange={handleInputSearch} />
                        <button onClick={() => setFilteredSubCategory(allSubCategory)}>Clear Filter</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Subcategory Name</th>
                                <th>Description</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubCategory.map((subcategory, index) => (
                                <tr key={index}>
                                    <td>{`${index + 1}`}</td>
                                    <td>{subcategory.sub_category_name}</td>
                                    <td>{subcategory.description}</td>
                                    <td>
                                        <button className="option-buttons edit" onClick={() => handleEdit(subcategory)}>Edit</button>
                                        <button className="option-buttons delete" onClick={deletesubcategory} value={subcategory.sub_category_id}>Delete</button>
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
}

export default Subcategory;
