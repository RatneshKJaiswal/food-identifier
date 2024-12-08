import { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';

export const UploadSection = ({ onImageCapture, preview, loading }) => {
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please make sure you've granted camera permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
      onImageCapture({ target: { files: [file] } });
      stopCamera();
    }, 'image/jpeg');
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-semibold mb-6 text-gray-100">Upload Food Image</h2>
      <div className="flex flex-col items-center gap-6">
        {!showCamera && !preview && (
          <div className="w-full space-y-4">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-700 rounded-lg border-2 border-gray-600 border-dashed cursor-pointer hover:bg-gray-600 transition-colors">
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400" />
                <p className="mt-4 text-sm text-gray-300">Click to upload or drag and drop</p>
                <p className="mt-2 text-xs text-gray-400">PNG, JPG, or JPEG</p>
              </div>
              <input type="file" className="hidden" onChange={onImageCapture} accept="image/*" />
            </label>

            <button
              onClick={startCamera}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Camera className="w-5 h-5" />
              Take Photo
            </button>
          </div>
        )}

        {showCamera && (
          <div className="w-full relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              <button
                onClick={captureImage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Capture
              </button>
              <button
                onClick={stopCamera}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {preview && (
          <div className="w-full relative">
            <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
            <button
              onClick={() => onImageCapture({ target: { files: [] } })}
              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              disabled={loading}
              className="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 font-medium"
            >
              {loading ? 'Analyzing Image...' : 'Identify Food'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;