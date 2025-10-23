'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DocumentIcon,
  CloudArrowUpIcon,
  FolderIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ShareIcon,
  TagIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { 
  generateMockDocuments, 
  getDocumentStats, 
  filterDocuments,
  getDepartments,
  getFormats,
  Document,
  DocumentCategory,
  documentCategories
} from '@/lib/mockDocumentData';
import { downloadDocument, shareDocument, getDocumentStats as getStats } from '@/lib/documentUtils';
import DocumentUpload from '@/components/documents/DocumentUpload';
import DocumentList from '@/components/documents/DocumentList';
import DocumentPreview from '@/components/documents/DocumentPreview';

interface DocumentFilters {
  type: string;
  category: string;
  format: string;
  department: string;
  isPublic: string;
  search: string;
}

export default function DocumentModule() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'upload' | 'categories'>('all');

  // Load mock data on component mount
  useEffect(() => {
    const mockData = generateMockDocuments();
    setDocuments(mockData);
    setFilteredDocuments(mockData);
    setStats(getStats(mockData));
  }, []);

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newDocuments: Document[] = files.map((file, index) => ({
        id: `doc-${Date.now()}-${index}`,
        name: file.name,
        type: 'other' as const,
        category: 'Other',
        size: file.size,
        format: file.name.split('.').pop()?.toUpperCase() || 'TXT',
        uploadDate: new Date(),
        lastModified: new Date(),
        uploadedBy: 'Current User', // In real app, get from auth context
        employeeId: 'current-user',
        employeeName: 'Current User',
        department: 'HR',
        description: `Uploaded file: ${file.name}`,
        tags: ['uploaded', 'new'],
        isPublic: true,
        downloadCount: 0,
        fileUrl: `/uploads/${file.name}`
      }));
      
      setDocuments(prev => [...newDocuments, ...prev]);
      setFilteredDocuments(prev => [...newDocuments, ...prev]);
      setIsUploading(false);
    }, 2000);
  };

  const handleUploadProgress = (progress: any) => {
    console.log('Upload progress:', progress);
  };

  const handlePreview = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleDownload = (document: Document) => {
    downloadDocument(document);
  };

  const handleShare = (document: Document) => {
    shareDocument(document);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Document Management</h2>
          <p className="text-gray-600">Upload, organize, and manage your documents</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('upload')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <CloudArrowUpIcon className="h-4 w-4" />
            <span>Upload Files</span>
          </button>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</p>
              </div>
              <DocumentIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Size</p>
                <p className="text-2xl font-bold text-green-600">{formatFileSize(stats.totalSize)}</p>
              </div>
              <FolderIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalDownloads}</p>
              </div>
              <ArrowDownTrayIcon className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Size</p>
                <p className="text-2xl font-bold text-orange-600">{formatFileSize(stats.averageSize)}</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200"
      >
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Documents
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upload Files
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Categories
            </button>
          </nav>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'all' && (
              <motion.div
                key="all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DocumentList
                  documents={filteredDocuments}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                  onShare={handleShare}
                />
              </motion.div>
            )}

            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DocumentUpload
                  onUpload={handleUpload}
                  onUploadProgress={handleUploadProgress}
                  isUploading={isUploading}
                />
              </motion.div>
            )}

            {activeTab === 'categories' && (
              <motion.div
                key="categories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {documentCategories.map((category, index) => {
                  const categoryDocs = documents.filter(doc => doc.type === category.id);
                  const categoryStats = getStats(categoryDocs);
                  
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => {
                        // Filter documents by category
                        setFilteredDocuments(documents.filter(doc => doc.type === category.id));
                        setActiveTab('all');
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl">{category.icon}</div>
                        <span className="text-sm font-medium text-gray-500">
                          {categoryStats.totalDocuments} docs
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formatFileSize(categoryStats.totalSize)}</span>
                        <span>{categoryStats.totalDownloads} downloads</span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {selectedDocument && (
          <DocumentPreview
            document={selectedDocument}
            onDownload={handleDownload}
            onClose={() => setSelectedDocument(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
