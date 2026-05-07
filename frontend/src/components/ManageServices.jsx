import { useState } from 'react';

const ManageServices = ({ services, onAdd, onRemove }) => {
  const [newService, setNewService] = useState('');

  const handleAdd = () => {
    if (newService.trim()) {
      onAdd(newService);
      setNewService('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Manage Services</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New service name"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul className="space-y-2">
        {services.map((service, idx) => (
          <li key={idx} className="flex justify-between items-center border-b py-2">
            <span>{service}</span>
            <button onClick={() => onRemove(service)} className="text-red-500 hover:text-red-700">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageServices;
