"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, CameraOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

// Define the type for the BarcodeDetector if it's not globally available
declare global {
  interface Window {
    BarcodeDetector: new () => {
      detect(image: ImageBitmapSource): Promise<Array<{ rawValue: string }>>;
    };
  }
}

export default function ScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const animationFrameId = useRef<number>();

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const handleScanSuccess = useCallback((scannedValue: string) => {
    setIsScanning(false);
    toast({
      title: "Scan Successful",
      description: `Data: ${scannedValue}`,
      duration: 3000,
    });
    stopCamera();
    setTimeout(() => {
      router.back();
    }, 1000);
  }, [router, stopCamera, toast]);

  const scanLoop = useCallback(async () => {
    if (!videoRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
        if(isScanning) {
            animationFrameId.current = requestAnimationFrame(scanLoop);
        }
        return;
    }

    if (!('BarcodeDetector' in window)) {
        console.log('Barcode Detector is not supported by this browser.');
        toast({
            variant: "destructive",
            title: "Unsupported Browser",
            description: "QR code scanning is not supported by your browser."
        });
        setIsScanning(false);
        return;
    }
    
    const barcodeDetector = new window.BarcodeDetector();

    try {
        const barcodes = await barcodeDetector.detect(videoRef.current);
        if (barcodes.length > 0) {
            handleScanSuccess(barcodes[0].rawValue);
            return;
        }
    } catch (error) {
        console.error("Barcode detection failed:", error);
    }
    
    if(isScanning) {
        animationFrameId.current = requestAnimationFrame(scanLoop);
    }
  }, [isScanning, handleScanSuccess, toast]);

  const getCameraPermission = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Camera API not available in this browser.');
      toast({
        variant: 'destructive',
        title: 'Unsupported Browser',
        description: 'Your browser does not support the camera API.',
      });
      setHasCameraPermission(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setHasCameraPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings.',
      });
    }
  };

  useEffect(() => {
    if(isScanning) {
        scanLoop();
    }
    return () => {
        if(animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    }
  }, [isScanning, scanLoop]);

  useEffect(() => {
    return () => {
      stopCamera();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [stopCamera]);

  return (
    <div className="bg-neutral-900 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-sm h-[844px] bg-neutral-900 rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative border-8 border-neutral-800">
            <header className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold text-white">Scan & Pay</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 bg-black relative flex justify-center items-center">
                {hasCameraPermission === null && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/80 p-8 text-center">
                        <CameraOff className="w-16 h-16 text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Camera Access</h2>
                        <p className="text-muted-foreground mb-6">We need your permission to use the camera for QR code scanning.</p>
                        <Button onClick={getCameraPermission} size="lg">
                            <Camera className="mr-2 h-5 w-5" />
                            Grant Permission
                        </Button>
                    </div>
                )}

                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                
                {hasCameraPermission && (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="relative w-3/4 aspect-square">
                            {/* Corner brackets */}
                            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>

                            {isScanning && (
                                <div className="absolute top-0 left-0 right-0 h-full overflow-hidden rounded-md">
                                    <div className="scan-line absolute top-0 left-0 right-0 h-1 bg-white/80 shadow-[0_0_10px_2px_#fff]"></div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/80 p-8 text-center">
                       <Alert variant="destructive" className="max-w-sm">
                          <AlertTitle>Camera Access Denied</AlertTitle>
                          <AlertDescription>
                              You have denied camera access. Please grant permissions in your browser or system settings to continue.
                          </AlertDescription>
                      </Alert>
                    </div>
                )}
            </main>
            
            <footer className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/50 to-transparent text-center">
                <p className="text-white/80 text-sm">
                    {isScanning ? "Align QR code within the frame to scan" : "Ready to scan?"}
                </p>
            </footer>
        </div>
    </div>
  );
}
