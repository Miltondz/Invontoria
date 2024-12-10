import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { Edit2, Trash2, Package, Plus, ArrowRightLeft, DollarSign, XCircle } from 'lucide-react';
import { InventoryItem } from '../../types';
import InventoryForm from './InventoryForm';
import TransferModal from './TransferModal';
import SalesForm from '../sales/SalesForm';
import WastageForm from '../wastage/WastageForm';

export default function InventoryList() {
  const { inventory, deleteItem } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [isWastageOpen, setIsWastageOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<InventoryItem | undefined>();
  const [itemToTransfer, setItemToTransfer] = useState<InventoryItem | undefined>();
  const [itemForSale, setItemForSale] = useState<InventoryItem | undefined>();
  const [itemForWastage, setItemForWastage] = useState<InventoryItem | undefined>();

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: InventoryItem) => {
    setItemToEdit(item);
    setIsFormOpen(true);
  };

  const handleTransfer = (item: InventoryItem) => {
    setItemToTransfer(item);
    setIsTransferOpen(true);
  };

  const handleSale = (item: InventoryItem) => {
    setItemForSale(item);
    setIsSalesOpen(true);
  };

  const handleWastage = (item: InventoryItem) => {
    setItemForWastage(item);
    setIsWastageOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setItemToEdit(undefined);
  };

  const handleCloseTransfer = () => {
    setIsTransferOpen(false);
    setItemToTransfer(undefined);
  };

  const handleCloseSales = () => {
    setIsSalesOpen(false);
    setItemForSale(undefined);
  };

  const handleCloseWastage = () => {
    setIsWastageOpen(false);
    setItemForWastage(undefined);
  };

  return (
    <div className="bg-black rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Package className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-white">Inventory Items</h2>
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search items..."
            className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Item
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-900">
                <td className="px-6 py-4 whitespace-nowrap text-white">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-white">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  <span className={item.quantity <= item.threshold ? 'text-red-500' : 'text-white'}>
                    {item.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">${item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-400"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-violet-500 hover:text-violet-400"
                      onClick={() => handleTransfer(item)}
                    >
                      <ArrowRightLeft className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-green-500 hover:text-green-400"
                      onClick={() => handleSale(item)}
                    >
                      <DollarSign className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-yellow-500 hover:text-yellow-400"
                      onClick={() => handleWastage(item)}
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-400"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InventoryForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        itemToEdit={itemToEdit}
      />

      {itemToTransfer && (
        <TransferModal
          isOpen={isTransferOpen}
          onClose={handleCloseTransfer}
          item={itemToTransfer}
        />
      )}

      {itemForSale && (
        <SalesForm
          isOpen={isSalesOpen}
          onClose={handleCloseSales}
          item={itemForSale}
        />
      )}

      {itemForWastage && (
        <WastageForm
          isOpen={isWastageOpen}
          onClose={handleCloseWastage}
          item={itemForWastage}
        />
      )}
    </div>
  );
}