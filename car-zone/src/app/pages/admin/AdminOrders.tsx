import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { CheckCircle, XCircle, Eye } from "lucide-react";

export function AdminOrders() {
  const [orders, setOrders] = useState([
    { id: "ORD-001", customer: "Ahmed Ali", item: "Toyota Corolla 2023", type: "Car", amount: 25000, status: "Pending", date: "2024-05-08" },
    { id: "ORD-002", customer: "Sara Hassan", item: "Brake Pads Set", type: "Spare Part", amount: 150, status: "Completed", date: "2024-05-07" },
    { id: "ORD-003", customer: "Mohamed Omar", item: "Honda Civic 2022", type: "Car", amount: 22000, status: "Cancelled", date: "2024-05-06" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Orders Management</h2>
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-600">Order ID</TableHead>
              <TableHead className="font-semibold text-gray-600">Customer</TableHead>
              <TableHead className="font-semibold text-gray-600">Item</TableHead>
              <TableHead className="font-semibold text-gray-600">Type</TableHead>
              <TableHead className="font-semibold text-gray-600">Amount</TableHead>
              <TableHead className="font-semibold text-gray-600">Status</TableHead>
              <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-blue-600">{order.id}</TableCell>
                <TableCell className="text-gray-900">{order.customer}</TableCell>
                <TableCell className="text-gray-600">{order.item}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${order.type === 'Car' ? 'bg-indigo-100 text-indigo-700' : 'bg-orange-100 text-orange-700'}`}>
                    {order.type}
                  </span>
                </TableCell>
                <TableCell className="text-gray-900 font-medium">${order.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-blue-700 hover:bg-blue-50 border-gray-200">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
