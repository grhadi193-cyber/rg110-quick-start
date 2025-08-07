import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft, ArrowRight, Copy, CheckCircle, TestTube, Wifi, Satellite, Shield } from "lucide-react";
import { SetupData } from "../App";
import { toast } from "sonner@2.0.3";

interface OnlineTestStepProps {
  setupData: SetupData;
  onNext: () => void;
  onPrevious: () => void;
}

export function OnlineTestStep({ setupData, onNext, onPrevious }: OnlineTestStepProps) {
  const [testSent, setTestSent] = useState(false);
  
  const sendTestSMS = () => {
    setTestSent(true);
    toast.success("پیامک تست ارسال شد!");
  };

  const copyTestSMS = async () => {
    const sms = `#get:190,${setupData.password}`;
    try {
      await navigator.clipboard.writeText(sms);
      toast.success("پیامک کپی شد!");
    } catch (err) {
      toast.error("خطا در کپی کردن");
    }
  };

  const testCommand = `#get:190,${setupData.password}`;
  const expectedReply = `GPS: 35.1234,51.5678
GSM: Signal Good
Server: Connected (${setupData.serverValue}:${setupData.port})
Status: Online`;

  return (
    <div className="space-y-6">
      <Card className="soft-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center ml-3 text-sm font-bold">
              ۴
            </span>
            تست آنلاین بودن دستگاه
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <Satellite className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">GPS</h3>
              <p className="text-sm text-blue-600">موقعیت جغرافیایی</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <Wifi className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">GSM</h3>
              <p className="text-sm text-green-600">اتصال شبکه موبایل</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">Server</h3>
              <p className="text-sm text-purple-600">اتصال به سرور</p>
            </div>
          </div>
          
          <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="space-y-2">
              <Label>پیامک تست وضعیت:</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={testCommand}
                  readOnly
                  className="text-left bg-white"
                  dir="ltr"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyTestSMS}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={sendTestSMS}
              className="w-full bg-accent hover:bg-accent/90"
            >
              <TestTube className="ml-2 h-4 w-4" />
              ارسال پیامک تست
            </Button>
          </div>
          
          {testSent && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>پاسخ مورد انتظار:</strong> دستگاه باید اطلاعاتی مشابه زیر ارسال کند:
                <div className="mt-2 p-3 bg-white rounded text-sm font-mono" dir="ltr">
                  {expectedReply}
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <div><strong>GPS:</strong> موقعیت جغرافیایی (عرض و طول)</div>
                  <div><strong>GSM:</strong> قدرت سیگنال شبکه موبایل</div>
                  <div><strong>Server:</strong> وضعیت اتصال به سرور</div>
                  <div><strong>Status:</strong> وضعیت کلی دستگاه</div>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          <Alert>
            <AlertDescription>
              اگر دستگاه پاسخ مناسب ارسال کرد، یعنی راه‌اندازی موفق بوده است. 
              در غیر این صورت، به مرحله عیب‌یابی بروید.
            </AlertDescription>
          </Alert>
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
          مرحله بعد
          <ArrowLeft className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}