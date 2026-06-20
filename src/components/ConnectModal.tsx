'use client';

import { useState } from 'react';
import { useConnectModal } from '@/context/ConnectModalContext';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';

const QUERY_OPTIONS = [
  "Submitting the event",
  "Partnership",
  "Want to host the event",
  "Need the speaker",
  "Want to join community partner",
  "Want to join media partner",
  "Connect with me"
];

export default function ConnectModal() {
  const { isOpen, closeModal } = useConnectModal();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    query: QUERY_OPTIONS[0],
    mobile: '',
    email: '',
    about: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to send request');
      
      setSuccess(true);
      setTimeout(() => {
        closeModal();
        setSuccess(false);
        setFormData({
          name: '',
          query: QUERY_OPTIONS[0],
          mobile: '',
          email: '',
          about: '',
        });
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0C0C0C] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in-up z-10 overflow-hidden">
        {/* Decorative Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-white/5 blur-[60px] rounded-full pointer-events-none" />
        
        <button 
          onClick={closeModal}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-white mb-2 tracking-tight">Let&apos;s Connect</h2>
        <p className="text-sm text-gray-400 mb-6 font-light">Fill out the form below and our team will get back to you.</p>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Request Received</h3>
            <p className="text-sm text-gray-400">Your query is successfully received. Our team will contact you soon!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Name *</label>
              <input 
                type="text" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Query Type *</label>
              <select 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                value={formData.query}
                onChange={e => setFormData({ ...formData, query: e.target.value })}
              >
                {QUERY_OPTIONS.map(opt => (
                  <option key={opt} value={opt} className="bg-[#0C0C0C]">{opt}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Mobile Number *</label>
                <input 
                  type="tel" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="+91 98765 43210"
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email *</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">About / Message *</label>
              <textarea 
                required
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                placeholder="Tell us more about your inquiry..."
                value={formData.about}
                onChange={e => setFormData({ ...formData, about: e.target.value })}
              />
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 w-full bg-white text-black font-semibold rounded-xl px-4 py-3 text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Click to send
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
