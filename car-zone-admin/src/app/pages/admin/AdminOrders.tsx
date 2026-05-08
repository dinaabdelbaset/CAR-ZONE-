import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_HOST } from "../../data/apiConfig";
import { toast } from "sonner";

export function AdminOrders() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/orders`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`${API_HOST}/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update order status");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Order status updated!");
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
    },
    onError: () => {
      toast.error("Error updating order status");
    },
  });

  const handleUpdateStatus = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  if (isLoading) return <div className="p-8">Loading orders...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading orders</div>;

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
            {orders?.map((order: any) => (
              <TableRow key={order._id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-blue-600">{order._id.slice(-6).toUpperCase()}</TableCell>
                <TableCell className="text-gray-900">
                  {order.customerName}
                  <div className="text-xs text-gray-500">{order.customerPhone}</div>
                </TableCell>
                <TableCell className="text-gray-600">{order.itemName}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${order.itemType === 'Car' ? 'bg-indigo-100 text-indigo-700' : 'bg-orange-100 text-orange-700'}`}>
                    {order.itemType}
                  </span>
                </TableCell>
                <TableCell className="text-gray-900 font-medium">${order.amount?.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-blue-700 hover:bg-blue-50 border-gray-200">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={() => handleUpdateStatus(order._id, "Completed")}
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                    disabled={updateStatusMutation.isPending || order.status === "Completed"}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={() => handleUpdateStatus(order._id, "Cancelled")}
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    disabled={updateStatusMutation.isPending || order.status === "Cancelled"}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!orders || orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
