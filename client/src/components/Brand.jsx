import { useEffect, useState } from "react";

const Brand = () => {
  const [allBrands, setAllBrands] = useState([]);
  const [error, setError] = useState(null);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [showAddBrandOverlay, setShowAddBrandOverlay] = useState(false);
  const [formData, setFormData] = useState({ brand_id: "", brand_name: "", description: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/brand");
      if (response.ok) {
        const data = await response.json();
        setAllBrands(data.data);
        setFilteredBrands(data.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  const handleInputSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = allBrands.filter(brand =>
      brand.brand_name.toLowerCase().includes(searchValue) ||
      brand.description.toLowerCase().includes(searchValue)
    );
    setFilteredBrands(filtered);
  };

  const handleSubmit = () => {
    formData.brand_id ? updateBrand(formData) : addBrand(formData);
  };

  const handleEdit = (brand) => {
    setFormData(brand);
    setShowAddBrandOverlay(true);
  };

  const updateBrand = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/brand/${data.brand_id}`, {
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

  const addBrand = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/brand`, {
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
  const deleteBrand = async (e) => {
    const brand_id = e.target.value;
    try {
      const response = await fetch(`http://localhost:3000/admin/brand/${brand_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      await response.json();
      fetchData();
    } catch (error) {
      console.error('There was a problem with the add request:', error);
      setError('There was a problem with the Delete request.');
    }
  };

  const closeOverlay = () => {
    setShowAddBrandOverlay(false);
    setFormData({ brand_id: "", brand_name: "", description: "" });
  };

  return (
    <>
      {showAddBrandOverlay && (
        <div className="overlay">
          <div className="add-brand-overlay">
            <h3>{formData.brand_id ? "Update" : "Add"} Brand</h3>
            <input
              type="text"
              placeholder="Brand Name"
              className="input-focus"
              value={formData.brand_name}
              onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
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
          <h1>Brand</h1>
          <button onClick={() => setShowAddBrandOverlay(true)}>Add Brand</button>
        </div>
        <div className="card-body">
          <div className="card-header-input">
            <input type="text" placeholder="Search..." onChange={handleInputSearch} />
            <button onClick={() => {
              setFilteredBrands(allBrands);
            }}>Clear Filter</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Brand Name</th>
                <th>Description</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand, index) => (
                <tr key={index}>
                  <td>{`${index + 1}`}</td>
                  <td>{brand.brand_name}</td>
                  <td>{brand.description}</td>
                  <td>
                    <button className="option-buttons edit" onClick={() => handleEdit(brand)}>Edit</button>
                    <button className="option-buttons delete" onClick={deleteBrand} value={brand.brand_id}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && <div>Error: {error}</div>}
        </div>
      </div>
    </>
  );
};

export default Brand;
