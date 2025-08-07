import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft, ArrowRight, AlertTriangle, PhoneCall, Satellite, CreditCard, Settings } from "lucide-react";

interface TroubleshootingStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function TroubleshootingStep({ onNext, onPrevious }: TroubleshootingStepProps) {
  const troubleshootingSteps = [
    {
      icon: <CreditCard className="w-6 h-6 text-red-600" />,
      title: "بررسی شارژ سیم‌کارت",
      description: "اطمینان حاصل کنید که سیم‌کارت شارژ کافی برای ارسال و دریافت پیامک دارد.",
      solutions: [
        "شارژ سیم‌کارت را بررسی کنید",
        "حداقل ۱۰۰۰ تومان شارژ داشته باشید",
        "بسته اینترنت فعال نباشد (ممکن است مزاحم باشد)"
      ]
    },
    {
      icon: <Satellite className="w-6 h-6 text-blue-600" />,
      title: "بررسی سیگنال GPS",
      description: "دستگاه باید در فضای باز قرار گیرد تا سیگنال GPS دریافت کند.",
      solutions: [
        "دستگاه را در فضای باز قرار دهید",
        "از زیر سقف فلزی یا بتنی دور کنید",
        "حداقل ۵ دقیقه منتظر بمانید تا GPS فیکس شود"
      ]
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-green-600" />,
      title: "بررسی سیگنال GSM",
      description: "سیگنال شبکه موبایل باید قوی باشد تا دستگاه بتواند پیامک ارسال کند.",
      solutions: [
        "دستگاه را به مکان با سیگنال قوی‌تر ببرید",
        "آنتن GSM را بررسی کنید",
        "اپراتور سیم‌کارت را تغییر دهید (ایرانسل معمولاً بهتر است)"
      ]
    },
    {
      icon: <Settings className="w-6 h-6 text-purple-600" />,
      title: "تنظیمات APN",
      description: "ممکن است نیاز به تنظیم APN برای اتصال اینترنت باشد.",
      solutions: [
        "APN ایرانسل: mcinet",
        "APN همراه اول: mtnirancell", 
        "پیامک تنظیم APN: #set:apn,mcinet,123456"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="soft-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center ml-3 text-sm font-bold">
              ۵
            </span>
            عیب‌یابی و رفع مشکل
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              اگر دستگاه پاسخ مناسب نداد، مراحل زیر را به ترتیب انجام دهید:
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            {troubleshootingSteps.map((step, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{step.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{step.description}</p>
                      <ul className="space-y-1">
                        {step.solutions.map((solution, sIndex) => (
                          <li key={sIndex} className="text-sm text-gray-700 flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 ml-2 flex-shrink-0"></span>
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Alert className="border-blue-200 bg-blue-50">
            <PhoneCall className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>پشتیبانی تخصصی:</strong> اگر همچنان مشکل دارید، با پشتیبانی تماس بگیرید:
              <div className="mt-2 font-mono text-sm">
                تلفن: ۰۲۱-۱۲۳۴۵۶۷۸<br />
                واتساپ: ۰۹۱۲۳۴۵۶۷۸۹
              </div>
            </AlertDescription>
          </Alert>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">پیامک‌های مفید:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <span>ریست کامل دستگاه:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">#reset:factory,123456</code>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <span>چک کردن وضعیت:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">#get:status,123456</code>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <span>تنظیم APN ایرانسل:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">#set:apn,mcinet,123456</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowRight className="ml-2 h-4 w-4" />
          مرحله قبل
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-primary hover:bg-primary/90"
        >
          تکمیل راه‌اندازی
          <ArrowLeft className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}