import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { Wrench, CheckCircle, Clock } from "lucide-react";

export function AdminMaintenance() {
  const [requests, setRequests] = useState([
    { id: "1", customer: "محمد", car: "Toyota Corolla 2024 (VIN12345)", type: "صيانة دورية", status: "Pending", date: "2024-05-15", duration: "" },
    { id: "2", customer: "أحمد", car: "BMW X5 (VIN98765)", type: "عطل بالسيارة", status: "Assigned", engineer: "م. أحمد", date: "2024-05-14", duration: "3 ساعات" },
  ]);

  const [durations, setDurations] = useState<{ [key: string]: string }>({});

  const handleDurationChange = (id: string, val: string) => {
    setDurations({ ...durations, [id]: val });
  };

  const handleAssignEngineer = (id: string, type: string) => {
    const duration = durations[id] || (type === "صيانة دورية" ? "يوم واحد" : "غير محدد");
    setRequests(requests.map(req => req.id === id ? { ...req, status: "Assigned", engineer: "م. مهندس جديد", duration } : req));
    toast.success(`تم إسناد المهندس بنجاح وتحديد المدة (${duration}) وإبلاغ العميل`);
  };

  const handleComplete = (id: string) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: "Completed" } : req));
    toast.success("تم الانتهاء من الصيانة وتحديث الهوية الرقمية للسيارة في بروفايل العميل");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">إدارة الصيانة والهوية الرقمية للسيارات</h1>
          <p className="text-gray-500 mt-2">متابعة طلبات الصيانة وتعيين المهندسين وتحديث سجلات السيارات</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم الطلب</TableHead>
              <TableHead>العميل</TableHead>
              <TableHead>السيارة</TableHead>
              <TableHead>نوع الطلب</TableHead>
              <TableHead>تاريخ الطلب</TableHead>
              <TableHead>المدة المتوقعة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>المهندس المسؤول</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>#{request.id}</TableCell>
                <TableCell>{request.customer}</TableCell>
                <TableCell>{request.car}</TableCell>
                <TableCell>
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                    {request.type}
                  </span>
                </TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>
                  {request.status === "Pending" ? (
                    <Input 
                      placeholder="أدخل المدة المتوقعة" 
                      className="w-32 h-8 text-sm" 
                      value={durations[request.id] || ""}
                      onChange={(e) => handleDurationChange(request.id, e.target.value)}
                    />
                  ) : (
                    <span className="font-semibold text-gray-700">{request.duration}</span>
                  )}
                </TableCell>
                <TableCell>
                  {request.status === "Pending" && <span className="flex items-center text-orange-500 gap-1"><Clock size={16}/> قيد الانتظار</span>}
                  {request.status === "Assigned" && <span className="flex items-center text-blue-500 gap-1"><Wrench size={16}/> جاري العمل</span>}
                  {request.status === "Completed" && <span className="flex items-center text-green-500 gap-1"><CheckCircle size={16}/> مكتمل</span>}
                </TableCell>
                <TableCell>{request.engineer || "لم يتم التعيين"}</TableCell>
                <TableCell className="space-x-2 space-x-reverse">
                  {request.status === "Pending" && (
                    <Button onClick={() => handleAssignEngineer(request.id, request.type)} size="sm">تعيين مهندس وإبلاغ العميل</Button>
                  )}
                  {request.status === "Assigned" && (
                    <Button onClick={() => handleComplete(request.id)} size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">تحديث الهوية الرقمية (إكمال)</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
