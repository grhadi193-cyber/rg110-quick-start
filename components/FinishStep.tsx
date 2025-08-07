import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, RotateCcw, Download, Share2 } from "lucide-react";

interface FinishStepProps {
  onRestart: () => void;
}

export function FinishStep({ onRestart }: FinishStepProps) {
  const features = [
    {
      title: "ردیابی لحظه‌ای",
      description: "مشاهده موقعیت خودرو در زمان واقعی"
    },
    {
      title: "تاریخچه مسیر",
      description: "بررسی مسیرهای طی شده"
    },
    {
      title: "هشدارهای هوشمند",
      description: "اطلاع از سرعت، ورود/خروج از منطقه"
    },
    {
      title: "گزارش‌گیری",
      description: "دریافت گزارش‌های کامل و دقیق"
    }
  ];

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="max-w-2xl w-full soft-shadow hover:hover-shadow transition-all">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl mb-4 text-gray-800">
            🎉 دستگاه با موفقیت آنلاین شد
          </CardTitle>
          <p className="text-lg text-gray-600">
            راه‌اندازی RG110 به پایان رسید و دستگاه آماده استفاده است
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-green-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-3">مراحل بعدی:</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 ml-2 flex-shrink-0"></span>
                وارد پنل مدیریت خود شوید
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 ml-2 flex-shrink-0"></span>
                دستگاه خود را در لیست دستگاه‌ها پیدا کنید
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 ml-2 flex-shrink-0"></span>
                شروع به ردیابی و نظارت کنید
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">⚠️ نکات مهم:</h3>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>• همیشه شارژ سیم‌کارت را بررسی کنید</li>
              <li>• دستگاه را در محل با سیگنال قوی نصب کنید</li>
              <li>• تنظیمات را بدون دلیل تغییر ندهید</li>
            </ul>
          </div>
          
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={onRestart}
              variant="outline"
              className="flex items-center"
            >
              <RotateCcw className="ml-2 h-4 w-4" />
              راه‌اندازی دستگاه جدید
            </Button>
            
            <Button 
              className="bg-primary hover:bg-primary/90 flex items-center"
            >
              <Download className="ml-2 h-4 w-4" />
              دانلود راهنما
            </Button>
          </div>
          
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-500">
              آیا از این راهنما راضی بودید؟ 
              <Button variant="link" className="p-0 h-auto mr-1 text-primary">
                <Share2 className="ml-1 h-3 w-3" />
                اشتراک‌گذاری
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}