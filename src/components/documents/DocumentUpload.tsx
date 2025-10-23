'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudArrowUpIcon,
  DocumentIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PhotoIcon,
  DocumentTextIcon,
  TableCellsIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/outline';
import { UploadProgress } from '@/lib/mockDocumentData';
import { formatFileSize } from '@/lib/mockDocumentData';

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
  onUploadProgress: (progress: UploadProgress) => void;
  isUploading: boolean;
}

export default function DocumentUpload({ onUpload, onUploadProgress, isUploading }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) return <PhotoIcon className="h-6 w-6 text-green-500" />;
    if (type.includes('pdf')) return <DocumentTextIcon className="h-6 w-6 text-red-500" />;
    if (type.includes('word') || type.includes('document')) return <DocumentTextIcon className="h-6 w-6 text-blue-500" />;
    if (type.includes('sheet') || type.includes('excel')) return <TableCellsIcon className="h-6 w-6 text-green-600" />;
    if (type.includes('presentation') || type.includes('powerpoint')) return <PresentationChartBarIcon className="h-6 w-6 text-orange-500" />;
    return <DocumentIcon className="h-6 w-6 text-gray-500" />;
  };

  const simulateUpload = async (files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileId = `file-${Date.now()}-${i}`;
      
      // Initialize progress
      const progress: UploadProgress = {
        fileId,
        fileName: file.name,
        progress: 0,
        status: 'uploading'
      };
      
      setUploadProgress(prev => [...prev, progress]);
      onUploadProgress(progress);
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const updatedProgress: UploadProgress = {
          fileId,
          fileName: file.name,
          progress,
          status: progress === 100 ? 'completed' : 'uploading'
        };
        
        setUploadProgress(prev => 
          prev.map(p => p.fileId === fileId ? updatedProgress : p)
        );
        onUploadProgress(updatedProgress);
      }
    }
    
    // Clear progress after a delay
    setTimeout(() => {
      setUploadProgress([]);
      setSelectedFiles([]);
    }, 2000);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    onUpload(selectedFiles);
    await simulateUpload(selectedFiles);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xls,.xlsx,.ppt,.pptx"
        />
        
        <div className="text-center">
          <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload Documents
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop files here, or click to select files
          </p>
          <div className="text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT, XLS, XLSX, PPT, PPTX
          </div>
          <div className="text-sm text-gray-500">
            Maximum file size: 10MB per file
          </div>
        </div>
      </motion.div>

      {/* Selected Files */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Selected Files ({selectedFiles.length})
            </h4>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setSelectedFiles([])}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isUploading ? 'Uploading...' : 'Upload Files'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadProgress.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Upload Progress
            </h4>
            <div className="space-y-3">
              {uploadProgress.map((progress) => (
                <motion.div
                  key={progress.fileId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex-shrink-0">
                    {progress.status === 'completed' ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : progress.status === 'error' ? (
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {progress.fileName}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {progress.progress}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
