import React from 'react';
import { useAuth } from '../context/AuthContext';
import { InventoryProvider } from '../context/InventoryContext';
import InventoryList from './inventory/InventoryList';
import WarehouseList from './warehouse/WarehouseList';
import LowStockNotifications from './notifications/LowStockNotifications';
import { 
  LayoutDashboard, 
  LogOut, 
  Bell,
  Search,
} from 'lucide-react';

export default function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-black shadow-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <LayoutDashboard className="h-8 w-8 text-blue-500" />
              <h1 className="ml-2 text-xl font-semibold text-white">Inventory Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-300">
                <Bell className="h-6 w-6" />
              </button>
              
              <div className="flex items-center">
                <span className="mr-2 text-sm font-medium text-gray-300">{user?.username}</span>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-gray-300"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-black p-6 rounded-lg shadow-lg border border-gray-800">
            <h3 className="text-blue-500 text-sm font-medium">To be Fulfilled</h3>
            <p className="mt-2 text-3xl font-semibold text-white">56</p>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-lg border border-gray-800">
            <h3 className="text-violet-500 text-sm font-medium">To be Invoiced</h3>
            <p className="mt-2 text-3xl font-semibold text-white">24</p>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-lg border border-gray-800">
            <h3 className="text-red-500 text-sm font-medium">Completed</h3>
            <p className="mt-2 text-3xl font-semibold text-white">12</p>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-lg border border-gray-800">
            <h3 className="text-blue-500 text-sm font-medium">Assigned to me</h3>
            <p className="mt-2 text-3xl font-semibold text-white">3</p>
          </div>
        </div>

        <InventoryProvider>
          <LowStockNotifications />
          <InventoryList />
          <WarehouseList />
        </InventoryProvider>
      </main>
    </div>
  );
}