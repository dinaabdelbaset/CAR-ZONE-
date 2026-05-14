import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { CarZoneLogo } from "../components/CarZoneLogo";
import { API_HOST } from "../data/apiConfig";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_HOST}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      const data = await res.json();
      localStorage.setItem("customer_token", data.access_token);
      localStorage.setItem("customer_user", JSON.stringify(data.user));
      
      toast.success("تم إنشاء الحساب بنجاح! وتم إضافة سيارة افتراضية لحسابك.");
      window.location.href = "/profile";
    } catch (error) {
      toast.error("حدث خطأ أثناء إنشاء الحساب، ربما البريد مستخدم مسبقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <CarZoneLogo />
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold text-gray-900">
          إنشاء حساب جديد
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          سجل الآن لتتمكن من حجز الصيانات ومتابعة سيارتك
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-2">
                الاسم بالكامل
              </label>
              <Input
                required
                type="text"
                placeholder="أحمد محمود"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-right"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-2">
                البريد الإلكتروني
              </label>
              <Input
                required
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-right"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-2">
                كلمة المرور
              </label>
              <Input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-right"
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  لديك حساب بالفعل؟
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/login">
                <Button variant="outline" className="w-full h-12 text-gray-700 border-gray-300">
                  تسجيل الدخول
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
