'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
 CameraIcon, 
 ClockIcon, 
 CheckCircleIcon, 
 XCircleIcon,
 WifiIcon,
 SignalSlashIcon
} from '@heroicons/react/24/outline';
import * as faceapi from 'face-api.js';
import { initializeDemoData, getDemoData } from '@/lib/demoDataGenerator';

interface CheckInOutData {
 id: string;
 userId: string;
 type: 'check-in' | 'check-out';
 timestamp: Date;
 faceRecognition: {
 confidence: number;
 verified: boolean;
 };
 isOffline: boolean;
 synced: boolean;
}

export default function CheckInOutModule() {
 const [isLoading, setIsLoading] = useState(true);
 const [isCheckingIn, setIsCheckingIn] = useState(false);
 const [isOnline, setIsOnline] = useState(true);
 const [faceRecognitionReady, setFaceRecognitionReady] = useState(false);
 const [lastCheckIn, setLastCheckIn] = useState<CheckInOutData | null>(null);
 const [checkInHistory, setCheckInHistory] = useState<CheckInOutData[]>([]);
 
 const videoRef = useRef<HTMLVideoElement>(null);
 const canvasRef = useRef<HTMLCanvasElement>(null);
 
 // Add refs to prevent repeated warnings with session storage persistence
 const warningsShown = useRef({
 camera: typeof window !== 'undefined' ? sessionStorage.getItem('cameraWarningShown') === 'true' : false,
 });

 // Initialize face recognition
 useEffect(() => {
 const initializeFaceRecognition = async () => {
 try {
 console.log('Initializing face recognition...');
 
 // Simulate model loading
 await new Promise(resolve => setTimeout(resolve, 1000));
 
 setFaceRecognitionReady(true);
 console.log('Face recognition ready (demo mode)');
 } catch (error) {
 console.error('Error initializing face recognition:', error);
 // Continue without face recognition for demo
 setFaceRecognitionReady(true);
 }
 };

 initializeFaceRecognition();
 }, []);

 // Capture face recognition
 const captureFaceRecognition = async (): Promise<{confidence: number; verified: boolean}> => {
 if (!faceRecognitionReady) {
 return { confidence: 0.95, verified: true }; // Demo fallback
 }

 try {
 // Simulate face detection process
 console.log('Capturing face for recognition...');
 
 // Simulate processing time
 await new Promise(resolve => setTimeout(resolve, 1500));
 
 // Demo: Simulate face detection with random confidence
 const confidence = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
 const verified = confidence > 0.8;
 
 console.log(`Face recognition result: ${(confidence * 100).toFixed(1)}% confidence, verified: ${verified}`);
 
 return {
 confidence: Math.min(confidence, 0.99),
 verified: verified
 };
 } catch (error) {
 console.error('Face recognition error:', error);
 return { confidence: 0.8, verified: true }; // Demo fallback
 }
 };

 // Start camera
 const startCamera = async () => {
 try {
 const stream = await navigator.mediaDevices.getUserMedia({ 
 video: { 
 width: 640, 
 height: 480,
 facingMode: 'user'
 } 
 });
 
 if (videoRef.current) {
 videoRef.current.srcObject = stream;
 }
 } catch (error: any) {
 if (!warningsShown.current.camera) {
 console.warn('Camera access not available:', error.message);
 console.log('Continuing with demo mode - camera not required for face recognition simulation');
 warningsShown.current.camera = true;
 if (typeof window !== 'undefined') {
 sessionStorage.setItem('cameraWarningShown', 'true');
 }
 }
 }
 };

 // Check in/out process
 const handleCheckInOut = async () => {
 setIsCheckingIn(true);
 
 try {
 // Perform face recognition
 const faceRecognitionResult = await captureFaceRecognition();

 // Determine check-in/out type
 const lastRecord = checkInHistory.find(record => record.userId === 'user-1'); // Assuming user-1 is current user
 const type: 'check-in' | 'check-out' = lastRecord && lastRecord.type === 'check-in' ? 'check-out' : 'check-in';

 const newRecord: CheckInOutData = {
 id: `check-${Date.now()}`,
 userId: 'user-1', // Mock user ID
 type,
 timestamp: new Date(),
 faceRecognition: faceRecognitionResult,
 isOffline: !isOnline, // Assume offline if not connected
 synced: isOnline // Sync immediately if online
 };

 // Save to local storage
 const storedData = getDemoData();
 if (storedData && storedData.checkIns) {
 const updatedHistory = [...storedData.checkIns, newRecord];
 localStorage.setItem('demoCheckInHistory', JSON.stringify(updatedHistory));
 setCheckInHistory(updatedHistory);
 setLastCheckIn(newRecord);

 // Simulate sync if offline and now online
 if (!isOnline && newRecord.isOffline && isOnline) {
 console.log('Simulating sync of offline records...');
 // In a real app, send offline records to backend
 const syncedHistory = updatedHistory.map(record => 
 record.isOffline ? { ...record, isOffline: false, synced: true } : record
 );
 localStorage.setItem('demoCheckInHistory', JSON.stringify(syncedHistory));
 setCheckInHistory(syncedHistory);
 }
 } else {
 // Initialize with new record if no data exists
 const newHistory = [newRecord];
 localStorage.setItem('demoCheckInHistory', JSON.stringify(newHistory));
 setCheckInHistory(newHistory);
 setLastCheckIn(newRecord);
 }

 } catch (error) {
 console.error('Check-in/out failed:', error);
 // Handle error, e.g., show a message to the user
 } finally {
 setIsCheckingIn(false);
 }
 };

 // Load initial data and setup online/offline listener
 useEffect(() => {
 initializeDemoData();
 const storedData = getDemoData();
 if (storedData && storedData.checkIns) {
 setCheckInHistory(storedData.checkIns);
 setLastCheckIn(storedData.checkIns.find(record => record.userId === 'user-1') || null); // Get last record for current user
 }

 const handleOnline = () => setIsOnline(true);
 const handleOffline = () => setIsOnline(false);

 window.addEventListener('online', handleOnline);
 window.addEventListener('offline', handleOffline);

 setIsOnline(navigator.onLine);
 setIsLoading(false);

 // Start camera if supported
 startCamera();

 return () => {
 window.removeEventListener('online', handleOnline);
 window.removeEventListener('offline', handleOffline);
 };
 }, []);

 if (isLoading) {
 return (
 <div className="flex items-center justify-center h-full">
 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
 </div>
 );
 }

 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 className="p-6 space-y-6"
 >
 <h2 className="text-3xl font-bold text-gray-900">Employee Check-In/Out</h2>
 <p className="text-gray-600">
 Use face recognition to record your attendance.
 </p>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Camera Feed & Face Recognition */}
 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
 <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
 <CameraIcon className="h-6 w-6 mr-2 text-blue-500" /> Face Recognition
 </h3>
 <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
 <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover"></video>
 <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
 {!faceRecognitionReady && (
 <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 text-white text-lg">
 Loading Face Models...
 </div>
 )}
 {faceRecognitionReady && (
 <div className="absolute bottom-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center">
 <CheckCircleIcon className="h-4 w-4 mr-1" /> Ready
 </div>
 )}
 </div>
 <p className="text-sm text-gray-500 mt-3">
 Ensure your face is clearly visible in the camera.
 </p>
 </div>

 {/* Status & Info */}
 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
 <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
 <ClockIcon className="h-6 w-6 mr-2 text-green-500" /> Status & Info
 </h3>
 
 <div className="space-y-4">
 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
 <span className="text-gray-700">Connection Status:</span>
 <div className="flex items-center">
 {isOnline ? (
 <WifiIcon className="h-5 w-5 text-green-500 mr-2" />
 ) : (
 <SignalSlashIcon className="h-5 w-5 text-red-500 mr-2" />
 )}
 <span className={isOnline ? 'text-green-600' : 'text-red-600'}>
 {isOnline ? 'Online' : 'Offline'}
 </span>
 </div>
 </div>

 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
 <span className="text-gray-700">Face Recognition:</span>
 <div className="flex items-center">
 {faceRecognitionReady ? (
 <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
 ) : (
 <ClockIcon className="h-5 w-5 text-yellow-500 mr-2" />
 )}
 <span className={faceRecognitionReady ? 'text-green-600' : 'text-yellow-600'}>
 {faceRecognitionReady ? 'Ready' : 'Loading...'}
 </span>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Check-in/out Button */}
 <motion.button onClick={handleCheckInOut}
 disabled={isCheckingIn}
 className="w-full py-4 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {isCheckingIn ? (
 <>
 <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
 Processing...
 </>
 ) : lastCheckIn?.type === 'check-in' ? (
 <>
 <XCircleIcon className="h-6 w-6 mr-2" /> Check Out
 </>
 ) : (
 <>
 <CheckCircleIcon className="h-6 w-6 mr-2" /> Check In
 </>
 )}
 </motion.button>

 {/* Last Check-in/out Info */}
 {lastCheckIn && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2, duration: 0.5 }}
 className={`bg-white p-6 rounded-xl shadow-lg border ${lastCheckIn.type === 'check-in' ? 'border-green-200' : 'border-red-200'}`}
 >
 <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
 <ClockIcon className="h-6 w-6 mr-2 text-gray-500" /> Last Activity
 </h3>
 <p className="text-lg font-medium">
 {lastCheckIn.type === 'check-in' ? 'Checked In' : 'Checked Out'} at{' '}
 {new Date(lastCheckIn.timestamp).toLocaleString()}
 </p>
 <p className="text-gray-600 mt-2">
 Face Recognition: {lastCheckIn.faceRecognition.verified ? 'Verified' : 'Failed'} 
 ({Math.round(lastCheckIn.faceRecognition.confidence * 100)}% confidence)
 </p>
 {lastCheckIn.isOffline && (
 <p className="text-orange-500 flex items-center mt-2">
 <SignalSlashIcon className="h-5 w-5 mr-1" /> Offline record, will sync when online.
 </p>
 )}
 {!lastCheckIn.synced && !lastCheckIn.isOffline && (
 <p className="text-red-500 flex items-center mt-2">
 <XCircleIcon className="h-5 w-5 mr-1" /> Sync failed.
 </p>
 )}
 </motion.div>
 )}
 </motion.div>
 );
}