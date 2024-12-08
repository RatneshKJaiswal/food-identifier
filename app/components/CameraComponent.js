import React, { useRef, useEffect } from 'react';
import { X, Camera } from 'lucide-react';

const CameraComponent = ({ onImageCapture, onClose }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    startCamera();
    
    // Cleanup function to stop the camera when component unmounts
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        onImageCapture(file);
        stopCamera(); // Stop the camera after capturing
      }, 'image/jpeg');
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="relative w-full">
      <button 
        onClick={handleClose}
        className="absolute top-2 right-2 z-10 p-2 bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700"
      >
        <X className="w-5 h-5" />
      </button>
      
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-64 object-cover rounded-lg"
      />
      
      <button
        onClick={capturePhoto}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <Camera className="w-5 h-5" />
        Take Photo
      </button>
    </div>
  );
};

export default CameraComponent;