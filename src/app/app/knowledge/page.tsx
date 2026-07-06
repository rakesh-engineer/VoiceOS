'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  FileText,
  Upload,
  Search,
  Trash2,
  Database,
  Loader2,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Document } from '@/types';

export default function KnowledgePage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Upload states
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const loadDocuments = async () => {
    try {
      const res = await fetch('/api/documents');
      if (res.ok) {
        const result = await res.json();
        setDocuments(result.data);
      }
    } catch (e) {
      console.error('Failed to load documents:', e);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDocuments();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName || !fileContent) return;

    setLoading(true);
    setSuccessMsg('');

    try {
      const ext = fileName.split('.').pop() || 'txt';
      const sizeBytes = fileContent.length;
      const sizeFormatted = `${(sizeBytes / 1024).toFixed(1)} KB`;

      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: fileName,
          content: fileContent,
          metadata: { size: sizeFormatted, extension: ext },
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to upload document.');
      }

      await loadDocuments();
      setSuccessMsg('Document successfully parsed and chunked for vector indexing.');
      setFileName('');
      setFileContent('');
      
      setTimeout(() => {
        setSuccessMsg('');
        setShowUploadModal(false);
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/documents?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await loadDocuments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <Building2 className="h-6 w-6 text-violet-400 mr-2" />
            Knowledge Base
          </h1>
          <p className="text-xs text-zinc-400">Upload documentation for your AI Employees to refer to during calls.</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-1.5"
        >
          <Upload className="h-4 w-4" />
          <span>Upload File</span>
        </Button>
      </div>

      {/* Info Callout */}
      <div className="border border-indigo-950/20 bg-indigo-950/5 p-4 rounded-xl flex gap-3 text-xs">
        <Info className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-white font-bold">RAG Architecture Ready</h4>
          <p className="text-zinc-400 leading-normal">
            Every document you upload is automatically chunked into overlapping token segments and prepared for vector indexing (`pgvector` cosine similarity checks) inside the voice pipeline runtime.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-555" />
        <Input
          type="text"
          placeholder="Search index documents by title, contents, or tags..."
          className="pl-11"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Documents List */}
      <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 overflow-hidden">
        <div className="p-4 border-b border-zinc-900 text-xs font-bold text-zinc-500 uppercase tracking-wider">
          Indexed Documents
        </div>

        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">
            No matching documents found in knowledge base.
          </div>
        ) : (
          <div className="divide-y divide-zinc-900">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="p-5 flex items-center justify-between hover:bg-zinc-900/10 transition-colors gap-6">
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="h-10 w-10 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-400 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{doc.title}</h4>
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase mt-0.5">
                      Size: {String(doc.metadata.size || '34KB')} | Extension: {String(doc.metadata.extension || 'txt')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-zinc-650 hover:text-red-400 p-2 rounded hover:bg-zinc-900 transition-colors"
                  title="Remove document index"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-lg border border-zinc-850 bg-zinc-950 rounded-2xl p-6 shadow-2xl relative space-y-6">
            <button onClick={() => setShowUploadModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Database className="h-5 w-5 text-violet-400 mr-2" />
                Ingest Knowledge Source Document
              </h3>
              <p className="text-xs text-zinc-400">Import files to feed the RAG embeddings pipeline.</p>
            </div>

            {successMsg ? (
              <div className="flex items-center space-x-2 bg-emerald-950/20 border border-emerald-900/30 text-emerald-450 p-4 rounded-lg text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="docTitle">File Name (with extension)</Label>
                  <Input
                    id="docTitle"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="Company_Policy_Guidelines_2026.pdf"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="docContent">Text Content / Extract (Simulated Upload)</Label>
                  <textarea
                    id="docContent"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    placeholder="Paste parsed document paragraphs or policy instructions here..."
                    rows={5}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 p-3 text-xs font-normal text-white focus:outline-none focus:ring-1 focus:ring-violet-500 placeholder-zinc-650"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900">
                  <Button variant="secondary" size="sm" onClick={() => setShowUploadModal(false)}>Cancel</Button>
                  <Button type="submit" variant="primary" size="sm" disabled={loading} className="flex items-center space-x-1.5">
                    {loading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Parsing...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        <span>Parse & Chunk</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
