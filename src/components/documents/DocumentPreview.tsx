'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EyeIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  TagIcon,
  CalendarDaysIcon,
  UserIcon,
  BuildingOfficeIcon,
  XMarkIcon,
  DocumentIcon,
  PhotoIcon,
  DocumentTextIcon,
  TableCellsIcon,
  PresentationChartBarIcon,
  GlobeAltIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { Document } from '@/lib/mockDocumentData';
import { formatFileSize, getFileIcon } from '@/lib/mockDocumentData';
import { formatDate } from '@/lib/dateUtils';

interface DocumentPreviewProps {
  document: Document;
  onDownload: (document: Document) => void;
  onClose: () => void;
}

export default function DocumentPreview({ document, onDownload, onClose }: DocumentPreviewProps) {
  const [showFullPreview, setShowFullPreview] = useState(false);

  const getFileIconComponent = (format: string) => {
    const iconClass = "h-6 w-6";
    switch (format) {
      case 'JPG':
      case 'PNG':
        return <PhotoIcon className={`${iconClass} text-green-500`} />;
      case 'PDF':
        return <DocumentTextIcon className={`${iconClass} text-red-500`} />;
      case 'DOC':
      case 'DOCX':
        return <DocumentTextIcon className={`${iconClass} text-blue-500`} />;
      case 'XLS':
      case 'XLSX':
        return <TableCellsIcon className={`${iconClass} text-green-600`} />;
      case 'PPT':
      case 'PPTX':
        return <PresentationChartBarIcon className={`${iconClass} text-orange-500`} />;
      default:
        return <DocumentIcon className={`${iconClass} text-gray-500`} />;
    }
  };

  const getTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      contract: 'bg-blue-100 text-blue-800 border-blue-200',
      id: 'bg-green-100 text-green-800 border-green-200',
      certificate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      policy: 'bg-purple-100 text-purple-800 border-purple-200',
      report: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colorMap[type] || colorMap.other;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {getFileIconComponent(document.format)}
            <div>
              <h3 className="text-xl font-bold text-gray-900">{document.name}</h3>
              <p className="text-sm text-gray-500">
                {document.format} • {formatFileSize(document.size)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onDownload(document)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Document Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* File Preview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">File Preview</h4>
                <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
                  {document.format === 'JPG' || document.format === 'PNG' ? (
                    <div className="text-center">
                      <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Image Preview</p>
                      <p className="text-sm text-gray-500">Click to view full image</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      {getFileIconComponent(document.format)}
                      <p className="text-gray-600 mt-2">{document.format} Document</p>
                      <p className="text-sm text-gray-500">Preview not available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Document Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Document Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Type</label>
                    <p className="text-sm text-gray-900 capitalize">{document.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Category</label>
                    <p className="text-sm text-gray-900">{document.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Format</label>
                    <p className="text-sm text-gray-900">{document.format}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Size</label>
                    <p className="text-sm text-gray-900">{formatFileSize(document.size)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Upload Date</label>
                    <p className="text-sm text-gray-900">{formatDate(document.uploadDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Modified</label>
                    <p className="text-sm text-gray-900">{formatDate(document.lastModified)}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {document.description && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Description</h4>
                  <p className="text-sm text-gray-700">{document.description}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Document Status */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Document Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Visibility</span>
                    <div className="flex items-center space-x-1">
                      {document.isPublic ? (
                        <>
                          <GlobeAltIcon className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600">Public</span>
                        </>
                      ) : (
                        <>
                          <LockClosedIcon className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-600">Private</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Downloads</span>
                    <span className="text-sm font-medium text-gray-900">{document.downloadCount}</span>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Owner Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{document.uploadedBy}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{document.department}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {document.tags.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Actions</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => onDownload(document)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <ShareIcon className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
