import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";
import { SetupData } from "../App";
import wiringImage from "figma:asset/f91473aaccaaffa6e7383d97d30ad32d63b84a33.png";

interface WiringStepProps {
  setupData: SetupData;
  setSetupData: (data: SetupData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function WiringStep({ setupData, setSetupData, onNext, onPrevious }: WiringStepProps) {
  const canProceed = setupData.simInstalled && setupData.deviceOutside;

  const wireColors = [
    { color: "نارنجی", description: "اتصال به MC (میکروکنترلر)" },
    { color: "قهوه‌ای", description: "زمین (GND)" },
    { color: "خاکستری", description: "ورودی آنالوگ" },
    { color: "آبی", description: "پمپ ۲" },
    { color: "سبز", description: "پمپ ۱" },
    { color: "سفید", description: "خروجی دیجیتال" },
    { color: "زرد", description: "ACC (جریان خودرو)" },
    { color: "قرمز", description: "مثبت باتری (+)" },
    { color: "سیاه", description: "منفی باتری (-)" },
  ];

  return (
    <div className="space-y-6">
      <Card className="soft-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center ml-3 text-sm font-bold">
              ۱
            </span>
            نصب سیم‌کارت و اتصال سیم‌ها
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold mb-4 text-blue-800">نمودار اتصالات:</h3>
            <div className="flex justify-center">
              <img 
                src={wiringImage} 
                alt="نمودار اتصالات RG110" 
                className="max-w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">راهنمای رنگ سیم‌ها:</h3>
              {wireColors.slice(0, 5).map((wire, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse p-2 bg-gray-50 rounded">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300" 
                       style={{ backgroundColor: wire.color === 'نارنجی' ? '#ff6b35' : 
                                                 wire.color === 'قهوه‌ای' ? '#8b4513' :
                                                 wire.color === 'خاکستری' ? '#808080' :
                                                 wire.color === 'آبی' ? '#4169e1' :
                                                 wire.color === 'سبز' ? '#228b22' : '#000' }}>
                  </div>
                  <div>
                    <span className="font-medium">{wire.color}:</span>
                    <span className="text-sm text-gray-600 mr-2">{wire.description}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 invisible md:visible">ادامه سیم‌ها:</h3>
              {wireColors.slice(5).map((wire, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse p-2 bg-gray-50 rounded">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300" 
                       style={{ backgroundColor: wire.color === 'سفید' ? '#ffffff' :
                                                 wire.color === 'زرد' ? '#ffd700' :
                                                 wire.color === 'قرمز' ? '#dc143c' :
                                                 wire.color === 'سیاه' ? '#000000' : '#000' }}>
                  </div>
                  <div>
                    <span className="font-medium">{wire.color}:</span>
                    <span className="text-sm text-gray-600 mr-2">{wire.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>نکات مهم:</strong> حتماً سیم قرمز را به مثبت باتری و سیم سیاه را به منفی باتری متصل کنید. 
              سیم زرد (ACC) باید به جریان خودرو متصل شود تا دستگاه هنگام روشن شدن خودرو فعال شود.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800">بررسی‌های لازم:</h3>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <Checkbox
                id="sim-installed"
                checked={setupData.simInstalled}
                onCheckedChange={(checked) =>
                  setSetupData({ ...setupData, simInstalled: !!checked })
                }
              />
              <label htmlFor="sim-installed" className="text-sm cursor-pointer">
                سیم‌کارت در دستگاه قرار داده شده است
              </label>
            </div>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <Checkbox
                id="device-outside"
                checked={setupData.deviceOutside}
                onCheckedChange={(checked) =>
                  setSetupData({ ...setupData, deviceOutside: !!checked })
                }
              />
              <label htmlFor="device-outside" className="text-sm cursor-pointer">
                دستگاه در فضای باز قرار داده شده است (برای دریافت سیگنال GPS)
              </label>
            </div>
          </div>
          
          {!setupData.simInstalled && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                لطفاً سیم‌کارت را در دستگاه قرار دهید. اطمینان حاصل کنید که سیم‌کارت شارژ کافی دارد.
              </AlertDescription>
            </Alert>
          )}
          
          {!setupData.deviceOutside && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                برای دریافت سیگنال GPS، دستگاه باید در فضای باز یا نزدیک پنجره قرار گیرد.
              </AlertDescription>
            </Alert>
          )}
          
          {canProceed && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                عالی! حالا می‌توانید به مرحله بعد بروید.
              </AlertDescription>
            </Alert>
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
          disabled={!canProceed}
          className="bg-primary hover:bg-primary/90"
        >
          مرحله بعد
          <ArrowLeft className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}