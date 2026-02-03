import React, { useState, useRef } from 'react';
import { ClubDocument } from '../types';

interface EcosystemProps {
  onBack: () => void;
}

const INITIAL_DOCUMENTS: ClubDocument[] = [
  { id: '1', name: 'UYSC Constitution 2024.pdf', type: 'pdf', size: '2.4 MB', date: 'Oct 10, 2024', sharedBy: 'Admin' },
  { id: '2', name: 'Q3 Financial Report.xls', type: 'xls', size: '1.1 MB', date: 'Sep 28, 2024', sharedBy: 'Treasurer' },
  { id: '3', name: 'Meeting Minutes - Sept.doc', type: 'doc', size: '845 KB', date: 'Sep 15, 2024', sharedBy: 'Secretary' },
  { id: '4', name: 'Event Photos - Akpoha Outreach', type: 'folder', size: '45 items', date: 'Aug 12, 2024', sharedBy: 'Publicity' },
];

const Ecosystem: React.FC<EcosystemProps> = ({ onBack }) => {
  const [documents, setDocuments] = useState<ClubDocument[]>(INITIAL_DOCUMENTS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDriveConnected, setIsDriveConnected] = useState(true);
  const [isLinking, setIsLinking] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<{ name: string; progress: number } | null>(null);
  
  // Folder Creation State
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRefresh = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const toggleDrive = () => {
    if (!isDriveConnected) {
      setIsLinking(true);
      setTimeout(() => {
        setIsDriveConnected(true);
        setIsLinking(false);
      }, 1500);
    } else {
      setIsDriveConnected(false);
    }
  };

  const handleUploadTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    
    const newFolder: ClubDocument = {
      id: Date.now().toString(),
      name: newFolderName.trim(),
      type: 'folder',
      size: '0 items',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      sharedBy: 'Me (Hon. Chidiebere)'
    };

    setDocuments(prev => [newFolder, ...prev]);
    setIsCreatingFolder(false);
    setNewFolderName('');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFile({ name: file.name, progress: 0 });

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          const extension = file.name.split('.').pop()?.toLowerCase() || '';
          const typeMap: Record<string, 'pdf' | 'doc' | 'xls' | 'folder'> = {
            'pdf': 'pdf',
            'doc': 'doc',
            'docx': 'doc',
            'xls': 'xls',
            'xlsx': 'xls'
          };

          const newDoc: ClubDocument = {
            id: Date.now().toString(),
            name: file.name,
            type: typeMap[extension] || 'pdf',
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            sharedBy: 'Me (Hon. Chidiebere)'
          };

          setDocuments(prev => [newDoc, ...prev]);
          setUploadingFile(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }, 500);
      }
      setUploadingFile(prev => prev ? { ...prev, progress } : null);
    }, 400);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return 'description';
      case 'xls': return 'table_chart';
      case 'doc': return 'article';
      case 'folder': return 'folder';
      default: return 'insert_drive_file';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] animate-in slide-in-from-right duration-500 pb-24">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
      />

      {/* Header */}
      <div className="flex items-center p-6 pb-2 justify-between sticky top-0 z-20 bg-slate-50/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-transparent dark:border-white/5">
        <button onClick={onBack} className="text-slate-900 dark:text-white flex size-12 items-center justify-center rounded-2xl active:scale-90 transition-transform">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-black uppercase tracking-tighter">Google Ecosystem</h2>
        <button 
          onClick={handleRefresh}
          className={`text-slate-900 dark:text-white flex size-12 items-center justify-center rounded-2xl active:scale-90 transition-transform ${isSyncing ? 'animate-spin text-primary' : ''}`}
        >
          <span className="material-symbols-outlined">sync</span>
        </button>
      </div>

      <main className="max-w-md mx-auto p-6 space-y-10">
        {/* Profile Card */}
        <div className="flex flex-col items-center text-center space-y-5">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="relative w-32 h-32 rounded-[2.5rem] bg-white dark:bg-[#121212] border border-primary/20 shadow-2xl flex items-center justify-center p-5 active:scale-95 transition-transform overflow-hidden group">
              <img 
                alt="Club Logo" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                src="https://i.postimg.cc/bJQgWxd8/udodiri-young-social-club.jpg"
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black dark:text-white tracking-tight">Akpoha Premium Portal</h3>
            <p className="text-slate-500 text-sm font-semibold mt-1">Managed Organization Account</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Admin Level Access
            </div>
          </div>
        </div>

        {/* Integration Toggles */}
        <section className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Cloud Integrations</h4>
          <div className="space-y-3">
            {[
              { id: 'cal', name: 'Google Calendar', icon: 'calendar_today', status: 'Events Sync Active', color: 'text-blue-500', checked: true },
              { id: 'drive', name: 'Google Drive', icon: 'add_to_drive', status: isSyncing ? 'Syncing...' : isDriveConnected ? 'Resource Library Linked' : 'Not Connected', color: 'text-yellow-500', checked: isDriveConnected },
              { id: 'pay', name: 'Google Pay', icon: 'account_balance_wallet', status: 'Payment Gateway Live', color: 'text-red-500', checked: true },
            ].map(item => (
              <div key={item.id} className="group flex items-center gap-4 bg-white dark:bg-[#121212] rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all">
                <div className={`flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-white/5 size-14 ${item.color} shadow-inner`}>
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <div className="flex-grow">
                  <p className="text-slate-900 dark:text-white text-[15px] font-bold tracking-tight">{item.name}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${item.id === 'drive' && isSyncing ? 'text-primary' : 'text-slate-500'}`}>{item.status}</p>
                </div>
                <div className="shrink-0">
                  <button 
                    onClick={() => item.id === 'drive' ? toggleDrive() : null}
                    className={`w-14 h-7 rounded-full relative transition-all duration-300 ${item.checked ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${item.checked ? 'translate-x-8' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resource Library (Conditional on Drive Connection) */}
        <section className={`space-y-5 transition-all duration-500 ${isDriveConnected ? 'opacity-100 translate-y-0' : 'opacity-30 blur-sm pointer-events-none'}`}>
          <div className="flex justify-between items-end px-1">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Resource Library</h4>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsCreatingFolder(true)}
                className="text-slate-500 dark:text-slate-400 flex items-center justify-center size-8 bg-slate-200/50 dark:bg-white/5 rounded-lg active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-lg">create_new_folder</span>
              </button>
              <button 
                onClick={handleRefresh}
                className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-lg"
              >
                Browse Cloud
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#121212] rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{documents.length} Shared Items</span>
              <span className="material-symbols-outlined text-slate-400 text-xl">folder_shared</span>
            </div>
            
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {uploadingFile && (
                <div className="p-5 bg-primary/5 border-b border-primary/10 animate-pulse">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined animate-spin">sync</span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-bold text-primary truncate tracking-tight">Uploading {uploadingFile.name}...</p>
                      <p className="text-[10px] text-primary/60 font-black uppercase tracking-wider">{Math.round(uploadingFile.progress)}% Complete</p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300" 
                      style={{ width: `${uploadingFile.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {documents.map(doc => (
                <div key={doc.id} className="flex items-center gap-4 p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors active:scale-95 group">
                  <div className={`size-12 rounded-xl flex items-center justify-center ${
                    doc.type === 'pdf' ? 'bg-red-500/10 text-red-500' :
                    doc.type === 'xls' ? 'bg-green-500/10 text-green-500' :
                    doc.type === 'folder' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">{getFileIcon(doc.type)}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate tracking-tight">{doc.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{doc.size} • Shared by {doc.sharedBy}</p>
                  </div>
                  <button className="size-10 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex divide-x divide-slate-100 dark:divide-white/5 border-t border-slate-100 dark:border-white/5">
              <button 
                onClick={handleUploadTrigger}
                className="flex-1 py-5 bg-slate-50 dark:bg-white/5 text-primary text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:bg-slate-100 dark:active:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">upload_file</span>
                Upload
              </button>
              <button 
                onClick={() => setIsCreatingFolder(true)}
                className="flex-1 py-5 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:bg-slate-100 dark:active:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">create_new_folder</span>
                New Folder
              </button>
            </div>
          </div>
        </section>

        {/* Premium Banner */}
        <div className="bg-gradient-to-br from-[#1a2c5b] via-primary to-[#1a2c5b] p-8 rounded-[2.5rem] text-white space-y-5 relative overflow-hidden shadow-2xl premium-shadow animate-in slide-in-from-bottom duration-700">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
          <div className="relative z-10">
            <h5 className="font-black text-xl tracking-tight leading-none mb-2">Cloud Governance</h5>
            <p className="text-white/70 text-[13px] font-medium leading-relaxed max-w-[200px]">
              Advanced synchronization keeps the brotherhood connected across all Google workspaces.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="flex-1 py-3.5 bg-white text-primary rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-transform">
                Manage Data
              </button>
              <button className="size-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-2xl">security</span>
              </button>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] opacity-[0.07] pointer-events-none rotate-12">google</span>
        </div>
      </main>

      {/* Modal: New Folder */}
      {isCreatingFolder && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-background-dark/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-white dark:bg-[#121212] rounded-[2.5rem] p-8 space-y-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 animate-in zoom-in duration-300">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto text-yellow-500 mb-2">
                <span className="material-symbols-outlined text-3xl">create_new_folder</span>
              </div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight">New Collection</h3>
              <p className="text-slate-500 text-xs font-semibold">Organize documents into a new shared folder.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Folder Name</label>
                <input 
                  autoFocus
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="e.g. 2024 Audit Reports"
                  className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-2xl py-4 px-6 text-sm font-bold focus:border-primary focus:ring-0 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setIsCreatingFolder(false)}
                  className="flex-1 py-4 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-2xl text-[11px] font-black uppercase tracking-widest active:scale-95 transition-transform"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim()}
                  className="flex-1 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 disabled:opacity-50 active:scale-95 transition-transform"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Linking Modal Overlay */}
      {isLinking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background-dark/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-xs bg-white dark:bg-[#121212] rounded-[2.5rem] p-8 text-center space-y-6 shadow-2xl animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center mx-auto text-yellow-500">
              <span className="material-symbols-outlined text-4xl animate-bounce">add_to_drive</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black dark:text-white leading-tight">Establishing Link...</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed px-4">Establishing secure connection with your Google storage workspace.</p>
            </div>
            <div className="flex gap-1.5 justify-center pt-2">
              <div className="w-2 h-2 rounded-full bg-google-blue animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-google-red animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 rounded-full bg-google-yellow animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-google-green animate-bounce [animation-delay:-0.45s]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ecosystem;