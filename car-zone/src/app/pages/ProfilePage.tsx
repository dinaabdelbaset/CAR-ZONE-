import { useState, useEffect, useCallback } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { ShieldAlert, Wrench, Truck, Car, Clock } from "lucide-react";
import { API_HOST } from "../data/apiConfig";

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("cars");
  
  const [userCars, setUserCars] = useState<any[]>([]);
  const [activeRequests, setActiveRequests] = useState<any[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileData = useCallback(async () => {
    try {
      const token = localStorage.getItem("customer_token");
      if (!token) return;

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      // 1. Fetch Cars
      const carsRes = await fetch(`${API_HOST}/maintenance/cars`, { headers });
      if (carsRes.ok) {
        const cars = await carsRes.json();
        setUserCars(cars);
        if (cars.length > 0) setSelectedCarId(cars[0]._id);

        // 2. Fetch Records for all cars
        let allRecords: any[] = [];
        for (const car of cars) {
          const recRes = await fetch(`${API_HOST}/maintenance/car/${car._id}/records`, { headers });
          if (recRes.ok) {
            const records = await recRes.json();
            allRecords = [...allRecords, ...records];
          }
        }
        setMaintenanceRecords(allRecords);
      }

      // 3. Fetch Active Requests
      const reqRes = await fetch(`${API_HOST}/maintenance/requests/my`, { headers });
      if (reqRes.ok) {
        const requests = await reqRes.json();
        // Filter out completed and cancelled requests
        setActiveRequests(requests.filter((r: any) => r.status !== 'Completed' && r.status !== 'Cancelled'));
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const [cancellationCount, setCancellationCount] = useState(() => {
    return parseInt(localStorage.getItem("cancellation_count") || "0");
  });
  
  const [requestToCancel, setRequestToCancel] = useState<string | null>(null);

  const handleCancelRequest = async () => {
    if (!requestToCancel) return;

    try {
      const token = localStorage.getItem("customer_token");
      const res = await fetch(`${API_HOST}/maintenance/requests/${requestToCancel}/cancel`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to cancel request");

      const data = await res.json();
      
      const newCount = cancellationCount + 1;
      setCancellationCount(newCount);
      localStorage.setItem("cancellation_count", newCount.toString());

      if (data.cancellationFee > 0) {
        toast.success(`تم إلغاء الطلب. تمت إضافة رسوم الإلغاء (${data.cancellationFee} جنيه) على حسابك.`);
      } else {
        toast.success("تم إلغاء الطلب بنجاح مجاناً (أول مرة).");
      }
      
      setRequestToCancel(null);
      fetchProfileData(); // Refresh the list to remove the canceled request
    } catch (error) {
      toast.error("حدث خطأ أثناء إلغاء الطلب.");
    }
  };

  // Timer state to force re-render every second
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRemainingTime = (targetDateStr: string) => {
    const total = Date.parse(targetDateStr) - Date.now();
    if (total <= 0) return "وصل الآن";
    
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return `${hours > 0 ? hours + 'س ' : ''}${minutes}د ${seconds}ث`;
  };

  // Remove this block entirely

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestLocation, setRequestLocation] = useState("");
  const [selectedCarId, setSelectedCarId] = useState("1");

  const openMaintenanceModal = (type: string) => {
    setSelectedRequestType(type);
    setRequestDescription("");
    setRequestLocation("");
    setIsModalOpen(true);
  };

  const submitMaintenanceRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCarId) {
      toast.error("عذراً، يجب إضافة سيارة أولاً لطلب الصيانة.");
      return;
    }
    if (!requestDescription) {
      toast.error("يرجى كتابة تفاصيل المشكلة");
      return;
    }

    try {
      // Map Arabic to backend Enum
      let typeEnum = "Periodic";
      if (selectedRequestType === "عطل بالسيارة") typeEnum = "Breakdown";
      if (selectedRequestType === "ونش إنقاذ") typeEnum = "Tow Truck";

      const token = localStorage.getItem("customer_token");
      const res = await fetch(`${API_HOST}/maintenance/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userCarId: selectedCarId,
          type: typeEnum,
          description: requestDescription,
          location: requestLocation
        })
      });

      if (!res.ok) throw new Error("Failed to submit request");

      toast.success(`تم إرسال طلب ${selectedRequestType} بنجاح، سيتم إبلاغك بالمدة المتوقعة قريباً.`);
      setIsModalOpen(false);
      fetchProfileData(); // Refresh requests list
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الطلب.");
    }
  };

  // Read user data from localStorage
  const userStr = localStorage.getItem("customer_user");
  let userName = "العميل";
  let userInitial = "م";
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      userName = user.name || user.email.split("@")[0];
      userInitial = userName.charAt(0).toUpperCase();
    } catch (e) {}
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-50 p-6 rounded-2xl h-fit border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold uppercase">
              {userInitial}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">مرحباً بك</h2>
              <p className="text-gray-500 font-medium truncate max-w-[150px]" title={userName}>{userName}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button 
              variant={activeTab === "cars" ? "default" : "ghost"} 
              className="w-full justify-start text-lg h-12"
              onClick={() => setActiveTab("cars")}
            >
              <Car className="mr-3 ml-3" /> سياراتي
            </Button>
            <Button 
              variant={activeTab === "maintenance" ? "default" : "ghost"} 
              className="w-full justify-start text-lg h-12"
              onClick={() => setActiveTab("maintenance")}
            >
              <Wrench className="mr-3 ml-3" /> الصيانة والهوية الرقمية
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-3/4">
          {activeTab === "cars" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">السيارات المملوكة</h2>
              {userCars.map(car => (
                <div key={car.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">{car.model}</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>الهوية الرقمية (VIN): {car.vin}</p>
                      <p>تاريخ الشراء: {car.purchaseDate}</p>
                      <p>رقم اللوحة: {car.plate}</p>
                    </div>
                  </div>
                  <Car size={80} className="text-gray-200" />
                </div>
              ))}
            </div>
          )}

          {activeTab === "maintenance" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">طلب صيانة للسيارة</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center hover:shadow-md transition cursor-pointer" onClick={() => openMaintenanceModal("صيانة دورية")}>
                    <Wrench size={48} className="mx-auto text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">صيانة دورية</h3>
                    <p className="text-gray-600 text-sm">حجز موعد صيانة دورية للسيارة (زيت، فلاتر، سيور)</p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-center hover:shadow-md transition cursor-pointer" onClick={() => openMaintenanceModal("عطل بالسيارة")}>
                    <ShieldAlert size={48} className="mx-auto text-orange-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">عطل بالسيارة</h3>
                    <p className="text-gray-600 text-sm">طلب مهندس لفحص عطل مفاجئ في السيارة</p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center hover:shadow-md transition cursor-pointer" onClick={() => openMaintenanceModal("ونش إنقاذ")}>
                    <Truck size={48} className="mx-auto text-red-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">طلب ونش</h3>
                    <p className="text-gray-600 text-sm">إذا تعطلت سيارتك على الطريق وتحتاج ونش للإنقاذ</p>
                  </div>
                </div>
              </div>

              {activeRequests.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                    <Clock className="text-blue-600" /> طلبات الصيانة الحالية
                  </h2>
                  <div className="space-y-4">
                    {activeRequests.map(req => (
                      <div key={req.id} className="bg-blue-50 p-5 rounded-xl border border-blue-100 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden">
                        {/* Progress Bar Background */}
                        <div className="absolute bottom-0 left-0 h-1 bg-blue-200 w-full">
                          <div className="h-full bg-blue-600 animate-pulse" style={{ width: '60%' }}></div>
                        </div>

                        <div className="flex-1">
                          <h4 className="font-bold text-blue-900 text-lg flex items-center gap-2">
                            {req.type === 'ونش إنقاذ' ? <Truck size={20}/> : <Wrench size={20}/>}
                            {req.type}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">تاريخ الطلب: {req.date}</p>
                        </div>

                        <div className="text-center md:text-right flex-1">
                          <p className="font-bold text-blue-800 text-lg">{req.status}</p>
                          <p className="text-sm text-gray-600 mt-1">المدة الكلية: {req.estimatedDuration}</p>
                          <button 
                            onClick={() => setRequestToCancel(req.id)}
                            className="mt-3 text-sm text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                          >
                            إلغاء الطلب
                          </button>
                        </div>

                        {req.targetTime && (
                          <div className="bg-white px-6 py-3 rounded-lg border border-blue-200 shadow-sm flex flex-col items-center min-w-[150px] relative z-10">
                            <span className="text-xs text-gray-500 font-bold mb-1">الوقت المتبقي للوصول</span>
                            <span className="text-xl font-mono font-bold text-red-600 tabular-nums" dir="ltr">
                              {getRemainingTime(req.targetTime)}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">الهوية الرقمية للسيارة (سجل الصيانة)</h2>
                <p className="text-gray-500 mb-4">هذا السجل يعرض جميع أعمال الصيانة التي تمت على السيارة بواسطة المهندس من لوحة التحكم، ويُعد كمرجع موثوق لحالة السيارة.</p>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <table className="w-full text-right">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="p-4 font-bold text-gray-700">التاريخ</th>
                        <th className="p-4 font-bold text-gray-700">النوع</th>
                        <th className="p-4 font-bold text-gray-700">الإجراء الذي تم</th>
                        <th className="p-4 font-bold text-gray-700">المهندس المسؤول</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenanceRecords.map(record => (
                        <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4 text-gray-600">{record.date}</td>
                          <td className="p-4 text-gray-600"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{record.type}</span></td>
                          <td className="p-4 text-gray-900 font-medium">{record.action}</td>
                          <td className="p-4 text-gray-600">{record.engineer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">تفاصيل طلب {selectedRequestType}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={submitMaintenanceRequest} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 text-right mb-2">السيارة</label>
                <select 
                  className="w-full text-right h-12 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                >
                  {userCars.map(car => (
                    <option key={car.id} value={car.id}>{car.model} - {car.plate}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 text-right mb-2">تفاصيل المشكلة أو الطلب <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={4}
                  className="w-full text-right p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="يرجى كتابة تفاصيل العطل أو الصيانة المطلوبة..."
                  value={requestDescription}
                  onChange={(e) => setRequestDescription(e.target.value)}
                ></textarea>
              </div>

              {selectedRequestType === "ونش إنقاذ" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-right mb-2">موقعك الحالي <span className="text-red-500">*</span></label>
                  <Input
                    required
                    type="text"
                    className="text-right h-12"
                    placeholder="مثال: الدائري، اتجاه المعادي"
                    value={requestLocation}
                    onChange={(e) => setRequestLocation(e.target.value)}
                  />
                </div>
              )}

              <div className="pt-4 flex gap-4">
                <Button type="button" variant="outline" className="w-1/3 h-12 text-gray-700 border-gray-300" onClick={() => setIsModalOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit" className="w-2/3 h-12 bg-blue-600 hover:bg-blue-700">
                  إرسال الطلب الآن
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {requestToCancel && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200 p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="text-red-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">تأكيد الإلغاء</h3>
            
            {cancellationCount === 0 ? (
              <p className="text-gray-600 mb-6">هل أنت متأكد من إلغاء هذا الطلب؟<br/><span className="text-green-600 font-bold">الإلغاء هذه المرة مجاني.</span></p>
            ) : (
              <p className="text-gray-600 mb-6">لقد قمت بإلغاء طلبات مسبقاً.<br/>سيتم تطبيق <span className="text-red-600 font-bold">رسوم إلغاء بقيمة 50 جنيه</span> على حسابك في حال تأكيد الإلغاء. هل توافق؟</p>
            )}

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1 h-12 text-gray-700 border-gray-300" onClick={() => setRequestToCancel(null)}>
                تراجع
              </Button>
              <Button type="button" className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white" onClick={handleCancelRequest}>
                تأكيد الإلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
