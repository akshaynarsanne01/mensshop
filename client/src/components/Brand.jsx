import { useEffect, useState } from "react";

const Brand = () => {
  const [allBrands, setAllBrands] = useState([]);
  const [error, setError] = useState(null);
  const [filteredBrands, setFilteredBrands] = useState(allBrands);
  const [showAddBrandOverlay, setShowAddBrandOverlay] = useState(false);
  const [formData, setFormData] = useState({ brand_id: "", brand_name: "", description: "" });
  const handleFilter = () => {
    setFilteredBrands(allBrands);
  }
  const handleInputSearch = (e) => {
    e.preventDefalt();
  }
  const addBrand = () => {

  }
  const handleEdit = (e) => {
    const brand_id = e.target.value;
    setShowAddBrandOverlay(true);
    setFormData({ ...formData, brand_id: brand_id });
    const mydata = { brand_name: formData.brand_name, description: formData.description };
    fetchData(mydata, brand_id, setFormData);
  }

  const fetchData = (data, id, setFunction) => {
    fetch(`https://localhost/brands/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFunction(data);
      })
      .catch(error => {
        console.error('There was a problem with the update request:', error);
      });
  }
  useEffect(() => {
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
        setError(error.message); // Set error state
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {showAddBrandOverlay && (
        <div className="overlay">
          <div className="add-brand-overlay">
            <h3>Add Brand</h3>
            <input
              type="text"
              placeholder="Brand Name"
              className="input-focus"
              value={formData.brand_name}
              onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
            />

            <input
              type="textbox"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />            <div className="add-overlay-buttons">
              <button onClick={() => setShowAddBrandOverlay(false)}>Close</button>
              <button onClick={addBrand}>Submit</button>
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
            <button onClick={handleFilter}>clear filter</button>
          </div>
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" value={0} /></th>
                <th>Brand Name</th>
                <th>Description</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand, index) => (
                <tr key={index}>
                  <td><input type="checkbox" value={brand.brand_id} /></td>
                  <td>{brand.brand_name}</td>
                  <td>{brand.description}</td>
                  <td>
                    <button className="option-buttons edit" value={brand.brand_id} onClick={handleEdit}>Edit</button>
                    <button className="option-buttons delete">Delete</button>
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
