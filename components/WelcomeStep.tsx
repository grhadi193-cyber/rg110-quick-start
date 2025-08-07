import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Rocket, ArrowLeft } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="max-w-2xl w-full soft-shadow hover:hover-shadow transition-all">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Rocket className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-4xl mb-4 text-gray-800">
            شروع سریع دستگاه RG110
          </CardTitle>
          <p className="text-xl text-gray-600 leading-relaxed">
            راهنمای گام به گام برای راه‌اندازی سریع و آسان ردیاب GPS شما
          </p>
        </CardHeader>
        
        <CardContent className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary">۱</span>
              </div>
              <h3 className="font-semibold mb-2">نصب سیم‌کارت</h3>
              <p className="text-sm text-gray-600">راهنمای اتصال سیم‌ها و نصب سیم‌کارت</p>
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary">۲</span>
              </div>
              <h3 className="font-semibold mb-2">تنظیم سرور</h3>
              <p className="text-sm text-gray-600">ساخت پیامک برای اتصال به سرور</p>
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary">۳</span>
              </div>
              <h3 className="font-semibold mb-2">تست آنلاین</h3>
              <p className="text-sm text-gray-600">بررسی اتصال موفق دستگاه</p>
            </div>
          </div>
          
          <Button 
            onClick={onNext}
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
          >
            شروع راه‌اندازی
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
          
          <p className="text-sm text-gray-500 mt-6">
            این فرآیند حدود ۵ دقیقه طول می‌کشد
          </p>
        </CardContent>
      </Card>
    </div>
  );
}