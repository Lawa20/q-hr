'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  TagIcon,
  CalendarDaysIcon,
  UserIcon,
  BuildingOfficeIcon,
  DocumentIcon,
  PhotoIcon,
  DocumentTextIcon,
  TableCellsIcon,
  PresentationChartBarIcon,
  GlobeAltIcon,
  LockClosedIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Document } from '@/lib/mockDocumentData';
import { formatFileSize, getFileIcon, getDepartments, getFormats } from '@/lib/mockDocumentData';
import { formatDate } from '@/lib/dateUtils';

interface DocumentListProps {
  documents: Document[];
  onPreview: (document: Document) => void;
  onDownload: (document: Document) => void;
  onShare: (document: Document) => void;
}

interface DocumentFilters {
  type: string;
  category: string;
  format: string;
  department: string;
  isPublic: string;
  search: string;
}

export default function DocumentList({ documents, onPreview, onDownload, onShare }: DocumentListProps) {
  const [filters, setFilters] = useState<DocumentFilters>({
    type: '',
    category: '',
    format: '',
    department: '',
    isPublic: '',
    search: ''
  });
  const [sortBy, setSortBy] = useState<'name' | 'uploadDate' | 'size' | 'downloadCount'>('uploadDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const departments = getDepartments(documents);
  const formats = getFormats(documents);

  const filteredDocuments = documents.filter(doc => {
    if (filters.type && doc.type !== filters.type) return false;
    if (filters.category && doc.category !== filters.category) return false;
    if (filters.format && doc.format !== filters.format) return false;
    if (filters.department && doc.department !== filters.department) return false;
    if (filters.isPublic && doc.isPublic.toString() !== filters.isPublic) return false;
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (!doc.name.toLowerCase().includes(searchTerm) &&
          !doc.description?.toLowerCase().includes(searchTerm) &&
          !doc.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
        return false;
      }
    }
    
    return true;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    if (sortBy === 'uploadDate') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

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

  const clearFilters = () => {
    setFilters({
      type: '',
      category: '',
      format: '',
      department: '',
      isPublic: '',
      search: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filter Documents</h3>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">
              {filteredDocuments.length} of {documents.length} documents
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="contract">Contract</option>
              <option value="id">ID Document</option>
              <option value="certificate">Certificate</option>
              <option value="policy">Policy</option>
              <option value="report">Report</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select
              value={filters.format}
              onChange={(e) => setFilters({ ...filters, format: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Formats</option>
              {formats.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
            <select
              value={filters.isPublic}
              onChange={(e) => setFilters({ ...filters, isPublic: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Documents</option>
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Documents Grid/List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
      >
        <AnimatePresence>
          {sortedDocuments.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow ${
                viewMode === 'list' ? 'flex items-center p-4' : 'p-6'
              }`}
            >
              {viewMode === 'grid' ? (
                // Grid View
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getFileIconComponent(document.format)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{document.name}</h3>
                        <p className="text-sm text-gray-500">{formatFileSize(document.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {document.isPublic ? (
                        <GlobeAltIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <LockClosedIcon className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(document.type)}`}>
                        {document.type}
                      </span>
                      <span className="text-xs text-gray-500">{document.format}</span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <UserIcon className="h-4 w-4" />
                        <span>{document.uploadedBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span>{formatDate(document.uploadDate)}</span>
                      </div>
                    </div>

                    {document.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {document.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            <TagIcon className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {document.tags.length > 3 && (
                          <span className="text-xs text-gray-500">+{document.tags.length - 3} more</span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onPreview(document)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDownload(document)}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onShare(document)}
                          className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                        >
                          <ShareIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">{document.downloadCount} downloads</span>
                    </div>
                  </div>
                </>
              ) : (
                // List View
                <>
                  <div className="flex items-center space-x-4 flex-1">
                    {getFileIconComponent(document.format)}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{document.name}</h3>
                      <p className="text-sm text-gray-500">{document.uploadedBy} • {formatDate(document.uploadDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(document.type)}`}>
                      {document.type}
                    </span>
                    <span className="text-sm text-gray-500">{formatFileSize(document.size)}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onPreview(document)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDownload(document)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onShare(document)}
                        className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                      >
                        <ShareIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {sortedDocuments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <DocumentIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
}
