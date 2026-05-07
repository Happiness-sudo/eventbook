import { useState } from 'react';

const EditVendorProfile = ({ vendor, onSave }) => {
  const [formData, setFormData] = useState({
    name: vendor?.name || '',
    description: vendor?.description || '',
    hourlyRate: vendor?.hourlyRate || '',
    category: vendor?.category || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Business Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full p-2 border rounded mb-3"
          rows="3"
        />
        <input
          type="number"
          placeholder="Hourly Rate"
          value={formData.hourlyRate}
          onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          className="w-full p-2 border rounded mb-4"
          required
        >
          <option value="">Select Category</option>
          <option value="photography">Photography</option>
          <option value="catering">Catering</option>
          <option value="decoration">Decoration</option>
          <option value="dj">DJ</option>
          <option value="venue">Venue</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVendorProfile;
