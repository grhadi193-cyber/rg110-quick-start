import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft, ArrowRight, Copy, CheckCircle, Network } from "lucide-react";
import { SetupData } from "../App";
import { toast } from "sonner@2.0.3";

interface PortSetupStepProps {
  setupData: SetupData;
  setSetupData: (data: SetupData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function PortSetupStep({ setupData, setSetupData, onNext, onPrevious }: PortSetupStepProps) {
  const [smsGenerated, setSmsGenerated] = useState(false);
  
  const generateSMS = () => {
    if (!setupData.port) {
      toast.error("لطفاً پورت را وارد کنید");
      return;
    }
    setSmsGenerated(true);
    toast.success("پیامک ساخته شد!");
  };

  const copySMS = async () => {
    const sms = `#set:112,${setupData.port},${setupData.password}`;
    try {
      await navigator.clipboard.writeText(sms);
      toast.success("پیامک کپی شد!");
    } catch (err) {
      toast.error("خطا در کپی کردن");
    }
  };

  const smsCommand = `#set:112,${setupData.port},${setupData.password}`;
  const expectedReply = `ID: 112, Port: ${setupData.port}`;

  return (
    <div className="space-y-6">
      <Card className="soft-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center ml-3 text-sm font-bold">
              ۳
            </span>
            تنظیم پورت اتصال
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="port">شماره پورت:</Label>
            <Input
              id="port"
              value={setupData.port}
              onChange={(e) => setSetupData({ ...setupData, port: e.target.value })}
              className="text-left"
              dir="ltr"
              placeholder="7015"
            />
            <p className="text-sm text-gray-600">
              پورت پیش‌فرض: 7015 (معمولاً نیازی به تغییر نیست)
            </p>
          </div>
          
          <Alert>
            <Network className="h-4 w-4" />
            <AlertDescription>
              <strong>توضیح:</strong> پورت، شماره کانال ارتباطی است که دستگاه از آن برای اتصال به سرور استفاده می‌کند.
              معمولاً پورت 7015 برای ردیاب‌های GPS استفاده می‌شود.
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-3">
            <Button 
              onClick={generateSMS}
              className="bg-accent hover:bg-accent/90"
            >
              <Network className="ml-2 h-4 w-4" />
              ساخت پیامک
            </Button>
          </div>
          
          {smsGenerated && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="space-y-2">
                <Label>پیامک آماده برای ارسال:</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={smsCommand}
                    readOnly
                    className="text-left bg-white"
                    dir="ltr"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copySMS}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>راهنما:</strong> این پیامک را به شماره سیم‌کارت دستگاه ارسال کنید. 
                  دستگاه باید پاسخی مشابه زیر ارسال کند:
                  <div className="mt-2 p-2 bg-white rounded text-sm font-mono" dir="ltr">
                    {expectedReply}
                  </div>
                </AlertDescription>
              </Alert>
              
              <Alert>
                <AlertDescription>
                  پس از ارسال پیامک، منتظر پاسخ دستگاه بمانید. 
                  این تنظیم معمولاً سریع‌تر از تنظیم سرور انجام می‌شود.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowRight className="ml-2 h-4 w-4" />
          مرحله قبل
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!smsGenerated}
          className="bg-primary hover:bg-primary/90"
        >
          مرحله بعد
          <ArrowLeft className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}