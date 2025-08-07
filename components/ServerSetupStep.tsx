import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft, ArrowRight, Copy, CheckCircle, Server } from "lucide-react";
import { SetupData } from "../App";
import { toast } from "sonner@2.0.3";

interface ServerSetupStepProps {
  setupData: SetupData;
  setSetupData: (data: SetupData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ServerSetupStep({ setupData, setSetupData, onNext, onPrevious }: ServerSetupStepProps) {
  const [smsGenerated, setSmsGenerated] = useState(false);
  
  const generateSMS = () => {
    if (!setupData.serverValue || !setupData.password) {
      toast.error("لطفاً تمام فیلدها را پر کنید");
      return;
    }
    setSmsGenerated(true);
    toast.success("پیامک ساخته شد!");
  };

  const copySMS = async () => {
    const sms = `#set:110,${setupData.serverValue},${setupData.password}`;
    try {
      await navigator.clipboard.writeText(sms);
      toast.success("پیامک کپی شد!");
    } catch (err) {
      toast.error("خطا در کپی کردن");
    }
  };

  const smsCommand = `#set:110,${setupData.serverValue},${setupData.password}`;
  const expectedReply = `ID: 110, IP: ${setupData.serverValue}, Port: ${setupData.port}, Password: ${setupData.password}`;

  return (
    <div className="space-y-6">
      <Card className="soft-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center ml-3 text-sm font-bold">
              ۲
            </span>
            تنظیم سرور (IP یا URL)
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs 
            value={setupData.serverType} 
            onValueChange={(value) => setSetupData({ ...setupData, serverType: value as "ip" | "url" })}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ip">آدرس IP</TabsTrigger>
              <TabsTrigger value="url">آدرس وب‌سایت (URL)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ip" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="server-ip">آدرس IP سرور:</Label>
                <Input
                  id="server-ip"
                  placeholder="مثال: 192.168.1.100"
                  value={setupData.serverValue}
                  onChange={(e) => setSetupData({ ...setupData, serverValue: e.target.value })}
                  className="text-left"
                  dir="ltr"
                />
                <p className="text-sm text-gray-600">
                  آدرس IP سروری که دستگاه باید به آن متصل شود
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="server-url">آدرس وب‌سایت (URL):</Label>
                <Input
                  id="server-url"
                  placeholder="مثال: gps.example.com"
                  value={setupData.serverValue}
                  onChange={(e) => setSetupData({ ...setupData, serverValue: e.target.value })}
                  className="text-left"
                  dir="ltr"
                />
                <p className="text-sm text-gray-600">
                  نام دامنه سرور GPS (بدون http یا www)
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="space-y-2">
            <Label htmlFor="password">رمز عبور دستگاه:</Label>
            <Input
              id="password"
              value={setupData.password}
              onChange={(e) => setSetupData({ ...setupData, password: e.target.value })}
              className="text-left"
              dir="ltr"
            />
            <p className="text-sm text-gray-600">
              رمز پیش‌فرض: 123456 (می‌توانید تغییر دهید)
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={generateSMS}
              className="bg-accent hover:bg-accent/90"
            >
              <Server className="ml-2 h-4 w-4" />
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
                  پس از ارسال پیامک، منتظر پاسخ دستگاه بمانید (ممکن است تا ۲ دقیقه طول بکشد).
                  اگر پاسخی دریافت نکردید، بررسی کنید که سیم‌کارت شارژ کافی دارد و سیگنال GSM قوی است.
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