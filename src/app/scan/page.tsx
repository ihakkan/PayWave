"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CameraOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function ScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
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
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);
  

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
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/80 p-8 text-center">
                        <CameraOff className="w-16 h-16 text-destructive mb-4" />
                        <Alert variant="destructive" className="max-w-sm">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                                Please allow camera access to use this feature. You may need to grant permissions in your browser or system settings.
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

                {hasCameraPermission && (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="relative w-3/4 aspect-square">
                            {/* Corner brackets */}
                            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>

                            {/* Scanning line */}
                            <div className="absolute top-0 left-0 right-0 h-full overflow-hidden rounded-md">
                                <div className="scan-line absolute top-0 left-0 right-0 h-1 bg-white/80 shadow-[0_0_10px_2px_#fff]"></div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            
            <footer className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/50 to-transparent text-center">
                <p className="text-white/80 text-sm">Align QR code within the frame to scan</p>
            </footer>
        </div>
    </div>
  );
}
