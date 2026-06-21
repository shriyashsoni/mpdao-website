'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { 
  Star, Lock, Mail, LogOut, Plus, Trash2, Edit2, Upload, ExternalLink, 
  Calendar, MapPin, Tag, FileText, CheckCircle2, Shield, UserPlus, Users, Link as LinkIcon,
  BarChart3, Sparkles, Clock, Eye, X, Image as ImageIcon, Heading, Bold, Italic, List, Minus, PlusCircle
} from 'lucide-react';
import Image from 'next/image';

// ─────────────────────────────────────────────
// Reusable Image Upload Bucket Component
// ─────────────────────────────────────────────
function ImageUploadZone({
  value,
  onChange,
  onUpload,
  uploading,
  label = 'Upload Image',
  accept = 'image/png,image/jpeg,image/webp,image/gif',
  placeholder = 'Paste URL or drag & drop / click to upload PNG, JPG, WEBP',
}: {
  value: string;
  onChange: (url: string) => void;
  onUpload: (file: File, callback: (url: string) => void) => void;
  uploading: boolean;
  label?: string;
  accept?: string;
  placeholder?: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file, onChange);
    }
  }, [onUpload, onChange]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file, onChange);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-neutral-400 text-xs font-medium">{label}</label>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-2 p-4 min-h-[100px] ${
          isDragging
            ? 'border-white/60 bg-white/10'
            : value
            ? 'border-white/20 bg-black'
            : 'border-white/10 bg-black/60 hover:border-white/30 hover:bg-white/5'
        }`}
      >
        {value ? (
          <div className="relative w-full flex flex-col items-center gap-2">
            <img
              src={value}
              alt="Preview"
              className="max-h-32 max-w-full rounded-xl object-contain border border-white/10"
            />
            <span className="text-[10px] text-neutral-500 truncate max-w-full px-2">{value.length > 60 ? value.slice(0, 60) + '...' : value}</span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
              className="absolute top-1 right-1 bg-black/80 text-white rounded-full p-0.5 hover:bg-red-500/80 transition-colors"
            >
              <X size={10} />
            </button>
          </div>
        ) : uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-t-white border-white/20 animate-spin" />
            <span className="text-[10px] text-neutral-400 animate-pulse">Uploading to Convex...</span>
          </div>
        ) : (
          <>
            <Upload size={18} className="text-neutral-500" />
            <span className="text-[10px] text-neutral-500 text-center leading-relaxed">{placeholder}</span>
            <span className="text-[9px] text-neutral-600 bg-white/5 px-2 py-0.5 rounded-full">PNG · JPG · WEBP · GIF</span>
          </>
        )}
        <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleFileSelect} />
      </div>

      {/* URL text input */}
      <input
        type="text"
        placeholder="Or paste direct image URL..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-xs font-light"
      />
    </div>
  );
}

export default function AdminPanel() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'sponsors' | 'partners' | 'events' | 'team' | 'admins'>('sponsors');

  // Convex mutations & queries
  const initDefaultAdmin = useMutation(api.admins.initDefaultAdmin);
  const loginMutation = useMutation(api.admins.login);
  const createAdmin = useMutation(api.admins.createAdmin);
  const deleteAdmin = useMutation(api.admins.deleteAdmin);
  const listAdmins = useQuery(api.admins.listAdmins);

  const sponsors = useQuery(api.sponsors.getSponsors);
  const addSponsor = useMutation(api.sponsors.addSponsor);
  const updateSponsor = useMutation(api.sponsors.updateSponsor);
  const deleteSponsor = useMutation(api.sponsors.deleteSponsor);

  const partners = useQuery(api.partners.getPartners);
  const addPartner = useMutation(api.partners.addPartner);
  const updatePartner = useMutation(api.partners.updatePartner);
  const deletePartner = useMutation(api.partners.deletePartner);

  const teamMembers = useQuery(api.team.getTeamMembers);
  const addTeamMember = useMutation(api.team.addTeamMember);
  const updateTeamMember = useMutation(api.team.updateTeamMember);
  const deleteTeamMember = useMutation(api.team.deleteTeamMember);

  const events = useQuery(api.events.getEvents);
  const addEvent = useMutation(api.events.addEvent);
  const updateEvent = useMutation(api.events.updateEvent);
  const deleteEvent = useMutation(api.events.deleteEvent);

  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const getStorageUrl = useMutation(api.images.getStorageUrl);

  // States for forms
  const [uploading, setUploading] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [adminSuccess, setAdminSuccess] = useState('');

  // Sponsor Form State
  const [editingSponsorId, setEditingSponsorId] = useState<string | null>(null);
  const [sponsorForm, setSponsorForm] = useState({ name: '', logoUrl: '', link: '', order: 0 });

  // Partner Form State
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [partnerForm, setPartnerForm] = useState({ name: '', logoUrl: '', link: '', type: 'community', order: 0 });

  // Team Form State
  const [editingTeamMemberId, setEditingTeamMemberId] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState({ name: '', role: '', image: '', twitterUrl: '', linkedinUrl: '', achievements: '', order: 0 });

  // Event Form State
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    slogan: '',
    date: '',
    location: '',
    tag: 'Meetup',
    image: '',
    description: '',
    eventLink: '',
    isPast: false,
    communityPartners: [] as string[],
    mediaPartners: [] as string[],
    
    // New Detailed fields
    endDate: '',
    endTime: '',
    startTime: '',
    category: 'meetup',
    speakers: [] as { name: string; title: string; image: string; link?: string }[],
    coHosts: [] as { name: string; email?: string; image: string }[],
    supportedEcosystems: [] as string[],
    themeColor: '',
  });

  // Local helper states for new Speaker/CoHost form additions
  const [newSpeaker, setNewSpeaker] = useState({ name: '', title: '', image: '', link: '' });
  const [newCoHost, setNewCoHost] = useState({ name: '', email: '', image: '' });

  // Modal / Analytics Dashboard state
  const [managingEvent, setManagingEvent] = useState<any | null>(null);

  // Run admin init on mount
  useEffect(() => {
    initDefaultAdmin().catch(console.error);
    const savedEmail = localStorage.getItem('mpdao_admin_email');
    if (savedEmail) {
      setIsLoggedIn(true);
      setAdminEmail(savedEmail);
    }
  }, [initDefaultAdmin]);

  // Helper to safely convert plain text URLs into clickable links without breaking HTML tags
  const linkifyHtml = (html: string) => {
    if (!html) return '';
    const parts = html.split(/(<[^>]+>)/g);
    let insideAnchor = false;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('<')) {
        if (part.match(/^<a\b/i)) insideAnchor = true;
        if (part.match(/^<\/a>/i)) insideAnchor = false;
        continue;
      }
      if (!insideAnchor) {
        parts[i] = part.replace(
          /(https?:\/\/[^\s<]+)/g, 
          '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline hover:text-blue-300 break-all">$1</a>'
        );
      }
    }
    return parts.join('');
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await loginMutation({ email, password });
      if (res.success) {
        setIsLoggedIn(true);
        setAdminEmail(email);
        localStorage.setItem('mpdao_admin_email', email);
      } else {
        setLoginError(res.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Error logging in. Please try again.');
      console.error(err);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAdminEmail('');
    localStorage.removeItem('mpdao_admin_email');
  };

  // Image Upload helper — uploads to Convex Storage and retrieves the real public URL from backend
  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    setUploading(true);
    try {
      // Step 1: Get a one-time signed upload URL from Convex
      const postUrl = await generateUploadUrl();

      // Step 2: POST the file bytes directly to Convex Storage
      const uploadRes = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        throw new Error(`Upload failed (${uploadRes.status}): ${errText}`);
      }

      const json = await uploadRes.json();
      const storageId: string = json.storageId;

      if (!storageId) throw new Error('No storageId returned from Convex');

      // Step 3: Ask Convex backend for the real public URL — this is the CORRECT approach
      const publicUrl = await getStorageUrl({ storageId });

      if (!publicUrl) throw new Error('Convex returned null URL for storageId: ' + storageId);

      callback(publicUrl);
    } catch (err: any) {
      console.error('Image upload failed:', err);
      alert('Upload failed: ' + (err?.message || 'Unknown error. Check console for details.'));
    } finally {
      setUploading(false);
    }
  };

  // Admin CRUD
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminSuccess('');
    try {
      await createAdmin({ email: newAdminEmail, password: newAdminPassword });
      setAdminSuccess('New Admin created successfully!');
      setNewAdminEmail('');
      setNewAdminPassword('');
    } catch (err: any) {
      alert(err.message || 'Failed to create admin');
    }
  };

  const handleDeleteAdmin = async (id: any) => {
    if (confirm('Are you sure you want to delete this admin?')) {
      await deleteAdmin({ id });
    }
  };

  // Sponsor CRUD
  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSponsorId) {
      await updateSponsor({
        id: editingSponsorId as any,
        ...sponsorForm
      });
      setEditingSponsorId(null);
    } else {
      await addSponsor(sponsorForm);
    }
    setSponsorForm({ name: '', logoUrl: '', link: '', order: 0 });
  };

  const handleEditSponsor = (sponsor: any) => {
    setEditingSponsorId(sponsor._id);
    setSponsorForm({
      name: sponsor.name,
      logoUrl: sponsor.logoUrl,
      link: sponsor.link,
      order: sponsor.order ?? 0
    });
  };

  const handleDeleteSponsor = async (id: any) => {
    if (confirm('Delete this supported ecosystem?')) {
      await deleteSponsor({ id });
    }
  };

  // Partner CRUD
  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPartnerId) {
      await updatePartner({
        id: editingPartnerId as any,
        ...partnerForm
      });
      setEditingPartnerId(null);
    } else {
      await addPartner(partnerForm);
    }
    setPartnerForm({ name: '', logoUrl: '', link: '', type: 'community', order: 0 });
  };

  const handleEditPartner = (partner: any) => {
    setEditingPartnerId(partner._id);
    setPartnerForm({
      name: partner.name,
      logoUrl: partner.logoUrl,
      link: partner.link,
      type: partner.type,
      order: partner.order ?? 0
    });
  };

  const handleDeletePartner = async (id: any) => {
    if (confirm('Delete this partner?')) {
      await deletePartner({ id });
    }
  };

  // Team CRUD
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeamMemberId) {
      await updateTeamMember({
        id: editingTeamMemberId as any,
        ...teamForm,
        twitterUrl: teamForm.twitterUrl || undefined,
        linkedinUrl: teamForm.linkedinUrl || undefined,
        achievements: teamForm.achievements || undefined,
      });
      setEditingTeamMemberId(null);
    } else {
      await addTeamMember({
        ...teamForm,
        twitterUrl: teamForm.twitterUrl || undefined,
        linkedinUrl: teamForm.linkedinUrl || undefined,
        achievements: teamForm.achievements || undefined,
      });
    }
    setTeamForm({ name: '', role: '', image: '', twitterUrl: '', linkedinUrl: '', achievements: '', order: 0 });
  };

  const handleEditTeamMember = (member: any) => {
    setEditingTeamMemberId(member._id);
    setTeamForm({
      name: member.name,
      role: member.role,
      image: member.image,
      twitterUrl: member.twitterUrl || '',
      linkedinUrl: member.linkedinUrl || '',
      achievements: member.achievements || '',
      order: member.order ?? 0
    });
  };

  const handleDeleteTeamMember = async (id: any) => {
    if (confirm('Delete this team member?')) {
      await deleteTeamMember({ id });
    }
  };

  // Event CRUD
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate URL slug from title
    const generatedSlug = eventForm.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const submissionData = {
      title: eventForm.title,
      slogan: eventForm.slogan,
      date: eventForm.date,
      location: eventForm.location,
      tag: eventForm.tag,
      image: eventForm.image,
      description: eventForm.description,
      eventLink: eventForm.eventLink || undefined,
      isPast: eventForm.isPast,
      communityPartners: eventForm.communityPartners,
      mediaPartners: eventForm.mediaPartners,
      
      endDate: eventForm.endDate || undefined,
      endTime: eventForm.endTime || undefined,
      startTime: eventForm.startTime || undefined,
      category: eventForm.category,
      speakers: eventForm.speakers,
      coHosts: eventForm.coHosts,
      supportedEcosystems: eventForm.supportedEcosystems,
      themeColor: eventForm.themeColor || undefined,
      slug: generatedSlug,
    };

    if (editingEventId) {
      await updateEvent({
        id: editingEventId as any,
        ...submissionData
      });
      setEditingEventId(null);
    } else {
      await addEvent(submissionData);
    }

    setEventForm({
      title: '', slogan: '', date: '', location: '', tag: 'Meetup', image: '', description: '',
      eventLink: '', isPast: false, communityPartners: [], mediaPartners: [],
      endDate: '', endTime: '', startTime: '', category: 'meetup',
      speakers: [], coHosts: [], supportedEcosystems: [], themeColor: ''
    });
  };

  const handleEditEvent = (event: any) => {
    setEditingEventId(event._id);
    setEventForm({
      title: event.title,
      slogan: event.slogan,
      date: event.date,
      location: event.location,
      tag: event.tag,
      image: event.image,
      description: event.description,
      eventLink: event.eventLink ?? '',
      isPast: event.isPast,
      communityPartners: event.communityPartners ?? [],
      mediaPartners: event.mediaPartners ?? [],
      endDate: event.endDate ?? '',
      endTime: event.endTime ?? '',
      startTime: event.startTime ?? '',
      category: event.category ?? 'meetup',
      speakers: event.speakers ?? [],
      coHosts: event.coHosts ?? [],
      supportedEcosystems: event.supportedEcosystems ?? [],
      themeColor: event.themeColor ?? '',
    });
  };

  const handleDeleteEvent = async (id: any) => {
    if (confirm('Delete this event?')) {
      await deleteEvent({ id });
    }
  };

  const toggleEventPartner = (type: 'community' | 'media', name: string) => {
    if (type === 'community') {
      setEventForm(prev => {
        const exist = prev.communityPartners.includes(name);
        return {
          ...prev,
          communityPartners: exist 
            ? prev.communityPartners.filter(n => n !== name)
            : [...prev.communityPartners, name]
        };
      });
    } else {
      setEventForm(prev => {
        const exist = prev.mediaPartners.includes(name);
        return {
          ...prev,
          mediaPartners: exist 
            ? prev.mediaPartners.filter(n => n !== name)
            : [...prev.mediaPartners, name]
        };
      });
    }
  };

  const toggleEventSponsor = (name: string) => {
    setEventForm(prev => {
      const exist = prev.supportedEcosystems.includes(name);
      return {
        ...prev,
        supportedEcosystems: exist
          ? prev.supportedEcosystems.filter(n => n !== name)
          : [...prev.supportedEcosystems, name]
      };
    });
  };

  // Helper to add formatting HTML elements to description
  const insertHTML = (tagOpen: string, tagClose: string) => {
    const textarea = document.getElementById('event-description-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = tagOpen + selected + tagClose;
    const newValue = text.substring(0, start) + replacement + text.substring(end);
    setEventForm(prev => ({ ...prev, description: newValue }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selected.length);
    }, 10);
  };

  // Add Speaker Helper
  const handleAddSpeaker = () => {
    if (!newSpeaker.name || !newSpeaker.title) {
      alert('Speaker Name and Title are required');
      return;
    }
    setEventForm(prev => ({
      ...prev,
      speakers: [...prev.speakers, { ...newSpeaker }]
    }));
    setNewSpeaker({ name: '', title: '', image: '', link: '' });
  };

  // Remove Speaker Helper
  const handleRemoveSpeaker = (index: number) => {
    setEventForm(prev => ({
      ...prev,
      speakers: prev.speakers.filter((_, idx) => idx !== index)
    }));
  };

  // Add CoHost Helper
  const handleAddCoHost = () => {
    if (!newCoHost.name) {
      alert('Co-Host Name is required');
      return;
    }
    setEventForm(prev => ({
      ...prev,
      coHosts: [...prev.coHosts, { ...newCoHost }]
    }));
    setNewCoHost({ name: '', email: '', image: '' });
  };

  // Remove CoHost Helper
  const handleRemoveCoHost = (index: number) => {
    setEventForm(prev => ({
      ...prev,
      coHosts: prev.coHosts.filter((_, idx) => idx !== index)
    }));
  };

  // Save associations inside Analytics Dashboard Modal
  const handleSaveModalAssociations = async () => {
    if (!managingEvent) return;
    try {
      await updateEvent({
        id: managingEvent._id,
        title: managingEvent.title,
        slogan: managingEvent.slogan,
        date: managingEvent.date,
        location: managingEvent.location,
        tag: managingEvent.tag,
        image: managingEvent.image,
        description: managingEvent.description,
        eventLink: managingEvent.eventLink,
        isPast: managingEvent.isPast,
        
        communityPartners: managingEvent.communityPartners || [],
        mediaPartners: managingEvent.mediaPartners || [],
        endDate: managingEvent.endDate,
        endTime: managingEvent.endTime,
        startTime: managingEvent.startTime,
        category: managingEvent.category || 'meetup',
        speakers: managingEvent.speakers || [],
        coHosts: managingEvent.coHosts || [],
        supportedEcosystems: managingEvent.supportedEcosystems || [],
      });
      alert('Event settings & associations updated successfully!');
      setManagingEvent(null);
    } catch (err: any) {
      alert('Failed to update event settings: ' + err.message);
    }
  };

  // Toggle partner inside Modal
  const toggleModalPartner = (type: 'community' | 'media', name: string) => {
    setManagingEvent((prev: any) => {
      if (!prev) return null;
      if (type === 'community') {
        const list = prev.communityPartners || [];
        const exist = list.includes(name);
        return {
          ...prev,
          communityPartners: exist ? list.filter((n: string) => n !== name) : [...list, name]
        };
      } else {
        const list = prev.mediaPartners || [];
        const exist = list.includes(name);
        return {
          ...prev,
          mediaPartners: exist ? list.filter((n: string) => n !== name) : [...list, name]
        };
      }
    });
  };

  // Toggle sponsor inside Modal
  const toggleModalSponsor = (name: string) => {
    setManagingEvent((prev: any) => {
      if (!prev) return null;
      const list = prev.supportedEcosystems || [];
      const exist = list.includes(name);
      return {
        ...prev,
        supportedEcosystems: exist ? list.filter((n: string) => n !== name) : [...list, name]
      };
    });
  };

  // Login View
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1.2px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0C0C0C] p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mb-4">
              <Star className="w-6 h-6 fill-white text-white" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">MP DAO Admin</h1>
            <p className="text-neutral-500 text-xs font-light">Login to manage events, partners, and ecosystems</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium text-xs">Gmail ID / Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-neutral-600" />
                <input
                  type="email"
                  required
                  placeholder="admin@mpdao.site"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-black border border-white/10 rounded-2xl text-white placeholder-neutral-600 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white font-medium text-xs">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-neutral-600" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-black border border-white/10 rounded-2xl text-white placeholder-neutral-600 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-red-500 text-xs font-light text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors text-sm mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="text-neutral-600 text-[10px] text-center mt-6">
            Default credentials initialized automatically.
          </p>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden pt-24 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Star className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
              <p className="text-neutral-500 text-xs font-light">Logged in as {adminEmail}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-full transition-colors text-xs font-medium"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {[
            { id: 'sponsors', label: 'Ecosystems & Sponsors', icon: Star },
            { id: 'partners', label: 'Partners & Media', icon: Users },
            { id: 'events', label: 'Events Manager', icon: Calendar },
            { id: 'team', label: 'Core Team', icon: Users },
            { id: 'admins', label: 'Admin Access', icon: Shield },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'bg-[#0C0C0C] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
              }`}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="space-y-12">
          
          {/* TAB 1: SPONSORS */}
          {activeTab === 'sponsors' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add/Edit Sponsor */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-6 lg:col-span-1 h-fit">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Plus size={18} />
                  <span>{editingSponsorId ? 'Edit Sponsor' : 'Add Supported Ecosystem'}</span>
                </h2>
                
                <form onSubmit={handleSponsorSubmit} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Polygon"
                      value={sponsorForm.name}
                      onChange={e => setSponsorForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Website Link</label>
                    <input
                      type="url"
                      required
                      placeholder="https://polygon.technology"
                      value={sponsorForm.link}
                      onChange={e => setSponsorForm(prev => ({ ...prev, link: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  <ImageUploadZone
                    label="Sponsor Logo (PNG, JPG, WEBP)"
                    value={sponsorForm.logoUrl}
                    onChange={url => setSponsorForm(prev => ({ ...prev, logoUrl: url }))}
                    onUpload={handleImageUpload}
                    uploading={uploading}
                    placeholder="Drag & drop or click to upload sponsor logo"
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Sort Order (number)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={sponsorForm.order}
                      onChange={e => setSponsorForm(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    {editingSponsorId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSponsorId(null);
                          setSponsorForm({ name: '', logoUrl: '', link: '', order: 0 });
                        }}
                        className="flex-1 py-2.5 border border-white/10 rounded-full text-xs font-medium hover:border-white/20 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 py-2.5 bg-white text-black rounded-full text-xs font-semibold hover:bg-neutral-200 transition-colors"
                    >
                      {editingSponsorId ? 'Save changes' : 'Add Sponsor'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Sponsors List */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Star size={18} />
                  <span>Ecosystem Sponsors Ticker</span>
                </h2>
                
                {sponsors === undefined ? (
                  <p className="text-xs text-neutral-500">Loading ecosystem sponsors...</p>
                ) : sponsors.length === 0 ? (
                  <p className="text-xs text-neutral-500 bg-[#0C0C0C] border border-white/5 p-6 rounded-2xl">No supported ecosystems added yet. They will appear in the slider ticker on the homepage.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sponsors.map(sponsor => (
                      <div key={sponsor._id} className="flex items-center justify-between p-4 bg-[#0C0C0C] border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="w-12 h-12 bg-black border border-white/5 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                            {sponsor.logoUrl ? (
                              <img
                                src={sponsor.logoUrl}
                                alt={sponsor.name}
                                className="w-full h-full object-contain p-1"
                              />
                            ) : (
                              <Star size={16} className="text-neutral-600" />
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <h3 className="text-sm font-semibold truncate text-white">{sponsor.name}</h3>
                            <a 
                              href={sponsor.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[10px] text-neutral-500 hover:text-white flex items-center gap-1 mt-0.5 truncate"
                            >
                              <LinkIcon size={8} />
                              <span className="truncate">{sponsor.link}</span>
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEditSponsor(sponsor)}
                            className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteSponsor(sponsor._id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PARTNERS */}
          {activeTab === 'partners' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add/Edit Partner */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-6 lg:col-span-1 h-fit">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Plus size={18} />
                  <span>{editingPartnerId ? 'Edit Partner' : 'Add Partner'}</span>
                </h2>
                
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Indore Builders Club"
                      value={partnerForm.name}
                      onChange={e => setPartnerForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Link</label>
                    <input
                      type="url"
                      required
                      placeholder="https://t.me/indorebuilders"
                      value={partnerForm.link}
                      onChange={e => setPartnerForm(prev => ({ ...prev, link: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Partner Type</label>
                    <select
                      value={partnerForm.type}
                      onChange={e => setPartnerForm(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    >
                      <option value="community">Community Partner</option>
                      <option value="media">Media Partner</option>
                    </select>
                  </div>

                  <ImageUploadZone
                    label="Partner Logo (PNG, JPG, WEBP)"
                    value={partnerForm.logoUrl}
                    onChange={url => setPartnerForm(prev => ({ ...prev, logoUrl: url }))}
                    onUpload={handleImageUpload}
                    uploading={uploading}
                    placeholder="Drag & drop or click to upload partner logo"
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Sort Order</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={partnerForm.order}
                      onChange={e => setPartnerForm(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    {editingPartnerId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPartnerId(null);
                          setPartnerForm({ name: '', logoUrl: '', link: '', type: 'community', order: 0 });
                        }}
                        className="flex-1 py-2.5 border border-white/10 rounded-full text-xs font-medium hover:border-white/20 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 py-2.5 bg-white text-black rounded-full text-xs font-semibold hover:bg-neutral-200 transition-colors"
                    >
                      {editingPartnerId ? 'Save changes' : 'Add Partner'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Partners List */}
              <div className="lg:col-span-2 space-y-6">
                {/* Community Partners */}
                <div>
                  <h3 className="text-base font-semibold mb-4 text-neutral-400 flex items-center gap-2">
                    <Users size={16} />
                    <span>Community Partners</span>
                  </h3>
                  
                  {partners === undefined ? (
                    <p className="text-xs text-neutral-500">Loading partners...</p>
                  ) : partners.filter(p => p.type === 'community').length === 0 ? (
                    <p className="text-xs text-neutral-500 bg-[#0C0C0C] border border-white/5 p-4 rounded-2xl">No community partners added yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {partners.filter(p => p.type === 'community').map(partner => (
                        <div key={partner._id} className="flex items-center justify-between p-4 bg-[#0C0C0C] border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                          <div className="flex items-center gap-4 overflow-hidden">
                            <div className="w-10 h-10 bg-black border border-white/5 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                              {partner.logoUrl ? (
                                <img
                                  src={partner.logoUrl}
                                  alt={partner.name}
                                  className="w-full h-full object-contain p-1"
                                />
                              ) : (
                                <Users size={14} className="text-neutral-600" />
                              )}
                            </div>
                            <div className="overflow-hidden">
                              <h3 className="text-sm font-semibold truncate text-white">{partner.name}</h3>
                              <a 
                                href={partner.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[10px] text-neutral-500 hover:text-white flex items-center gap-1 mt-0.5"
                              >
                                <LinkIcon size={8} />
                                <span className="truncate">{partner.link}</span>
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditPartner(partner)}
                              className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-colors"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeletePartner(partner._id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Media Partners */}
                <div>
                  <h3 className="text-base font-semibold mb-4 text-neutral-400 flex items-center gap-2">
                    <Star size={16} />
                    <span>Media Partners</span>
                  </h3>
                  
                  {partners === undefined ? (
                    <p className="text-xs text-neutral-500">Loading partners...</p>
                  ) : partners.filter(p => p.type === 'media').length === 0 ? (
                    <p className="text-xs text-neutral-500 bg-[#0C0C0C] border border-white/5 p-4 rounded-2xl">No media partners added yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {partners.filter(p => p.type === 'media').map(partner => (
                        <div key={partner._id} className="flex items-center justify-between p-4 bg-[#0C0C0C] border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                          <div className="flex items-center gap-4 overflow-hidden">
                            <div className="w-10 h-10 bg-black border border-white/5 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                              {partner.logoUrl ? (
                                <img
                                  src={partner.logoUrl}
                                  alt={partner.name}
                                  className="w-full h-full object-contain p-1"
                                />
                              ) : (
                                <FileText size={14} className="text-neutral-600" />
                              )}
                            </div>
                            <div className="overflow-hidden">
                              <h3 className="text-sm font-semibold truncate text-white">{partner.name}</h3>
                              <a 
                                href={partner.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[10px] text-neutral-500 hover:text-white flex items-center gap-1 mt-0.5"
                              >
                                <LinkIcon size={8} />
                                <span className="truncate">{partner.link}</span>
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditPartner(partner)}
                              className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-colors"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeletePartner(partner._id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: TEAM */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add/Edit Team Member */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-6 lg:col-span-1 h-fit">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Plus size={18} />
                  <span>{editingTeamMemberId ? 'Edit Core Team Member' : 'Add Core Team Member'}</span>
                </h2>
                
                <form onSubmit={handleTeamSubmit} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={teamForm.name}
                      onChange={e => setTeamForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Role</label>
                    <input
                      type="text"
                      required
                      placeholder="Core Contributor"
                      value={teamForm.role}
                      onChange={e => setTeamForm(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  <ImageUploadZone
                    label="Profile Image (PNG, JPG, WEBP)"
                    value={teamForm.image}
                    onChange={url => setTeamForm(prev => ({ ...prev, image: url }))}
                    onUpload={handleImageUpload}
                    uploading={uploading}
                    placeholder="Drag & drop or click to upload profile image"
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Twitter (X) Link</label>
                    <input
                      type="url"
                      placeholder="https://x.com/username"
                      value={teamForm.twitterUrl}
                      onChange={e => setTeamForm(prev => ({ ...prev, twitterUrl: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">LinkedIn Link</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={teamForm.linkedinUrl}
                      onChange={e => setTeamForm(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Achievements Post (Optional)</label>
                    <textarea
                      placeholder="e.g. Winner of ETHGlobal 2026..."
                      value={teamForm.achievements}
                      onChange={e => setTeamForm(prev => ({ ...prev, achievements: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light min-h-[80px]"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    {editingTeamMemberId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTeamMemberId(null);
                          setTeamForm({ name: '', role: '', image: '', twitterUrl: '', linkedinUrl: '', achievements: '', order: 0 });
                        }}
                        className="flex-1 py-2.5 border border-white/10 rounded-full text-xs font-medium hover:border-white/20 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 py-2.5 bg-white text-black rounded-full text-xs font-semibold hover:bg-neutral-200 transition-colors"
                    >
                      {editingTeamMemberId ? 'Save changes' : 'Add Team Member'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Team List */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Users size={18} />
                  <span>Core Team Members</span>
                </h2>
                
                {teamMembers === undefined ? (
                  <p className="text-xs text-neutral-500">Loading team members...</p>
                ) : teamMembers.length === 0 ? (
                  <p className="text-xs text-neutral-500 bg-[#0C0C0C] border border-white/5 p-6 rounded-2xl">No team members added yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamMembers.map((member: any) => (
                      <div key={member._id} className="flex items-center justify-between p-4 bg-[#0C0C0C] border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="w-12 h-12 bg-black border border-white/5 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                            {member.image ? (
                              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <Users size={16} className="text-neutral-600" />
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <h3 className="text-sm font-semibold truncate text-white">{member.name}</h3>
                            <p className="text-[11px] text-neutral-500 mt-0.5 truncate">{member.role}</p>
                            {(member.twitterUrl || member.linkedinUrl) && (
                              <div className="flex gap-2 mt-1">
                                {member.twitterUrl && <a href={member.twitterUrl} target="_blank" className="text-[10px] text-blue-400 hover:underline">X (Twitter)</a>}
                                {member.linkedinUrl && <a href={member.linkedinUrl} target="_blank" className="text-[10px] text-blue-500 hover:underline">LinkedIn</a>}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEditTeamMember(member)}
                            className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteTeamMember(member._id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: EVENTS */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Event Editor Form (Left, 5 cols) */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-6 lg:col-span-5 h-fit space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  {editingEventId ? <Edit2 size={18} /> : <Plus size={18} />}
                  <span>{editingEventId ? 'Edit Event Details' : 'Create New Event'}</span>
                </h2>

                <form onSubmit={handleEventSubmit} className="space-y-4">
                  {/* Event Title */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Event Title</label>
                    <input
                      type="text"
                      required
                      placeholder="MP Web3 Summit 2026"
                      value={eventForm.title}
                      onChange={e => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  {/* Slogan */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">Slogan / Short Description</label>
                    <input
                      type="text"
                      required
                      placeholder="Empowering India's builders."
                      value={eventForm.slogan}
                      onChange={e => setEventForm(prev => ({ ...prev, slogan: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  {/* Start Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 text-xs font-medium">Start Date</label>
                      <input
                        type="date"
                        required
                        value={eventForm.date}
                        onChange={e => {
                          const val = e.target.value; // YYYY-MM-DD
                          const isPastNow = val ? new Date(val) < new Date(new Date().toDateString()) : false;
                          setEventForm(prev => ({ ...prev, date: val, isPast: isPastNow }));
                        }}
                        className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white focus:border-white/30 focus:outline-none transition-colors text-sm font-light [color-scheme:dark]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 text-xs font-medium">Start Time</label>
                      <input
                        type="time"
                        placeholder="10:00 AM"
                        value={eventForm.startTime}
                        onChange={e => setEventForm(prev => ({ ...prev, startTime: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white focus:border-white/30 focus:outline-none transition-colors text-sm font-light [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* End Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 text-xs font-medium">End Date (Optional)</label>
                      <input
                        type="date"
                        value={eventForm.endDate}
                        onChange={e => setEventForm(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white focus:border-white/30 focus:outline-none transition-colors text-sm font-light [color-scheme:dark]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 text-xs font-medium">End Time (Optional)</label>
                      <input
                        type="time"
                        placeholder="05:00 PM"
                        value={eventForm.endTime}
                        onChange={e => setEventForm(prev => ({ ...prev, endTime: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white focus:border-white/30 focus:outline-none transition-colors text-sm font-light [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Location & Category & Status */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1.5 col-span-2">
                      <label className="text-neutral-400 text-xs font-medium">Location</label>
                      <input
                        type="text"
                        required
                        placeholder="Indore, MP"
                        value={eventForm.location}
                        onChange={e => setEventForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 text-xs font-medium">Tag Display</label>
                      <input
                        type="text"
                        placeholder="Summit"
                        value={eventForm.tag}
                        onChange={e => setEventForm(prev => ({ ...prev, tag: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 text-xs font-medium">Event Category</label>
                      <select
                        value={eventForm.category}
                        onChange={e => setEventForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                      >
                        <option value="meetup">Meetup</option>
                        <option value="hackathon">Hackathon</option>
                        <option value="workshop">Workshop</option>
                        <option value="summit">Summit</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 text-xs font-medium">Status</label>
                      <select
                        value={eventForm.isPast ? 'past' : 'upcoming'}
                        onChange={e => setEventForm(prev => ({ ...prev, isPast: e.target.value === 'past' }))}
                        className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                      >
                        <option value="upcoming">Upcoming Event</option>
                        <option value="past">Past Event</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 text-xs font-medium">Theme Color (Hex/Name)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={eventForm.themeColor || '#000000'}
                          onChange={e => setEventForm(prev => ({ ...prev, themeColor: e.target.value }))}
                          className="w-10 h-10 rounded border border-white/10 bg-black cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          placeholder="#000000"
                          value={eventForm.themeColor}
                          onChange={e => setEventForm(prev => ({ ...prev, themeColor: e.target.value }))}
                          className="flex-1 px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Poster Image */}
                  <ImageUploadZone
                    label="Event Poster / Banner (PNG, JPG, WEBP)"
                    value={eventForm.image}
                    onChange={url => setEventForm(prev => ({ ...prev, image: url }))}
                    onUpload={handleImageUpload}
                    uploading={uploading}
                    placeholder="Drag & drop or click to upload event poster"
                  />

                  {/* External redirect link */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">External Register Link (Luma redirect)</label>
                    <input
                      type="url"
                      placeholder="https://luma.com/jkpe70cc"
                      value={eventForm.eventLink}
                      onChange={e => setEventForm(prev => ({ ...prev, eventLink: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  {/* Description HTML Editor (WordPress Style formatting) */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-neutral-400 text-xs font-medium">Detailed Description (HTML / WP Mode)</label>
                      <div className="flex gap-1.5 bg-black border border-white/10 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => insertHTML('<strong>', '</strong>')}
                          title="Bold"
                          className="p-1 hover:bg-white/10 rounded text-neutral-400 hover:text-white"
                        >
                          <Bold size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTML('<em>', '</em>')}
                          title="Italic"
                          className="p-1 hover:bg-white/10 rounded text-neutral-400 hover:text-white"
                        >
                          <Italic size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTML('<h2 class="text-xl font-semibold text-white mt-6 mb-2">', '</h2>')}
                          title="Heading 2"
                          className="p-1 hover:bg-white/10 rounded text-neutral-400 hover:text-white font-bold text-[10px]"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTML('<h3 class="text-lg font-semibold text-white mt-4 mb-2">', '</h3>')}
                          title="Heading 3"
                          className="p-1 hover:bg-white/10 rounded text-neutral-400 hover:text-white font-bold text-[10px]"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt('Enter website link URL:');
                            if (url) insertHTML(`<a href="${url}" target="_blank" class="text-white underline hover:opacity-80">`, '</a>');
                          }}
                          title="Add Link"
                          className="p-1 hover:bg-white/10 rounded text-neutral-400 hover:text-white"
                        >
                          <LinkIcon size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTML('<ul class="list-disc pl-5 my-3 space-y-1"><li>', '</li></ul>')}
                          title="Bullet List"
                          className="p-1 hover:bg-white/10 rounded text-neutral-400 hover:text-white"
                        >
                          <List size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTML('<hr class="border-white/10 my-6" />', '')}
                          title="Horizontal Line"
                          className="p-1 hover:bg-white/10 rounded text-neutral-400 hover:text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt('Enter Image URL:');
                            if (url) insertHTML(`<img src="${url}" class="rounded-3xl border border-white/10 w-full my-4" alt="Image" />`, '');
                          }}
                          title="Add Image Tag"
                          className="p-1 hover:bg-white/10 rounded text-neutral-400 hover:text-white"
                        >
                          <ImageIcon size={12} />
                        </button>
                      </div>
                    </div>
                    <textarea
                      id="event-description-textarea"
                      required
                      rows={7}
                      placeholder="Use buttons above or write direct HTML to format your description. Copy-paste works here too!"
                      value={eventForm.description}
                      onChange={e => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light resize-y min-h-[120px]"
                    />
                    
                    {/* Live Preview Box */}
                    {eventForm.description && (
                      <div className="mt-2 bg-[#080808] border border-white/5 rounded-xl p-3.5 max-h-48 overflow-y-auto">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-2">Live Editor Preview</span>
                        <div 
                          dangerouslySetInnerHTML={{ __html: linkifyHtml(eventForm.description) }} 
                          className="prose prose-invert max-w-none text-neutral-400 text-xs font-light font-sans space-y-2 leading-relaxed whitespace-pre-wrap"
                        />
                      </div>
                    )}
                  </div>

                  {/* Co-Hosts subform */}
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <label className="text-neutral-400 text-xs font-medium block">Configure Co-Hosts</label>
                    
                    {/* List Added Co-Hosts */}
                    {eventForm.coHosts.length > 0 && (
                      <div className="flex flex-col gap-2 bg-black border border-white/5 p-3 rounded-xl">
                        {eventForm.coHosts.map((ch, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                            <div className="flex items-center gap-2 overflow-hidden">
                              {ch.image && <img src={ch.image} alt={ch.name} className="w-5 h-5 rounded-full object-cover" />}
                              <span className="text-xs truncate text-white">{ch.name} ({ch.email || 'No email'})</span>
                            </div>
                            <button type="button" onClick={() => handleRemoveCoHost(idx)} className="text-red-400 hover:text-red-300">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add CoHost Fields */}
                    <div className="grid grid-cols-2 gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                      <input
                        type="text"
                        placeholder="Co-Host Name"
                        value={newCoHost.name}
                        onChange={e => setNewCoHost(prev => ({ ...prev, name: e.target.value }))}
                        className="px-3 py-2 bg-black border border-white/10 rounded-lg text-xs text-white"
                      />
                      <input
                        type="email"
                        placeholder="Co-Host Email"
                        value={newCoHost.email}
                        onChange={e => setNewCoHost(prev => ({ ...prev, email: e.target.value }))}
                        className="px-3 py-2 bg-black border border-white/10 rounded-lg text-xs text-white"
                      />
                      <div className="col-span-2 flex gap-2">
                        <input
                          type="text"
                          placeholder="Profile Photo Link"
                          value={newCoHost.image}
                          onChange={e => setNewCoHost(prev => ({ ...prev, image: e.target.value }))}
                          className="flex-1 px-3 py-2 bg-black border border-white/10 rounded-lg text-xs text-white"
                        />
                        <label className="cursor-pointer px-3 bg-white text-black hover:bg-neutral-200 transition-colors rounded-lg flex items-center justify-center border border-white text-xs">
                          <Upload size={12} />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => {
                              if (e.target.files?.[0]) {
                                handleImageUpload(e.target.files[0], url => {
                                  setNewCoHost(prev => ({ ...prev, image: url }));
                                });
                              }
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={handleAddCoHost}
                          className="px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-xs font-semibold"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Speakers subform */}
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <label className="text-neutral-400 text-xs font-medium block">Configure Speakers</label>
                    
                    {/* List Added Speakers */}
                    {eventForm.speakers.length > 0 && (
                      <div className="flex flex-col gap-2 bg-black border border-white/5 p-3 rounded-xl">
                        {eventForm.speakers.map((sp, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                            <div className="flex items-center gap-2 overflow-hidden">
                              {sp.image && <img src={sp.image} alt={sp.name} className="w-5 h-5 rounded-full object-cover" />}
                              <span className="text-xs truncate text-white">{sp.name} - {sp.title}</span>
                            </div>
                            <button type="button" onClick={() => handleRemoveSpeaker(idx)} className="text-red-400 hover:text-red-300">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Speaker Fields */}
                    <div className="grid grid-cols-2 gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                      <input
                        type="text"
                        placeholder="Speaker Name"
                        value={newSpeaker.name}
                        onChange={e => setNewSpeaker(prev => ({ ...prev, name: e.target.value }))}
                        className="px-3 py-2 bg-black border border-white/10 rounded-lg text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Speaker Title / Role"
                        value={newSpeaker.title}
                        onChange={e => setNewSpeaker(prev => ({ ...prev, title: e.target.value }))}
                        className="px-3 py-2 bg-black border border-white/10 rounded-lg text-xs text-white"
                      />
                      <input
                        type="url"
                        placeholder="Social Link (Optional)"
                        value={newSpeaker.link}
                        onChange={e => setNewSpeaker(prev => ({ ...prev, link: e.target.value }))}
                        className="col-span-2 px-3 py-2 bg-black border border-white/10 rounded-lg text-xs text-white"
                      />
                      <div className="col-span-2 flex gap-2">
                        <input
                          type="text"
                          placeholder="Photo URL"
                          value={newSpeaker.image}
                          onChange={e => setNewSpeaker(prev => ({ ...prev, image: e.target.value }))}
                          className="flex-1 px-3 py-2 bg-black border border-white/10 rounded-lg text-xs text-white"
                        />
                        <label className="cursor-pointer px-3 bg-white text-black hover:bg-neutral-200 transition-colors rounded-lg flex items-center justify-center border border-white text-xs">
                          <Upload size={12} />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => {
                              if (e.target.files?.[0]) {
                                handleImageUpload(e.target.files[0], url => {
                                  setNewSpeaker(prev => ({ ...prev, image: url }));
                                });
                              }
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={handleAddSpeaker}
                          className="px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-xs font-semibold"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>


                  <div className="flex gap-2 pt-4 border-t border-white/5">
                    {editingEventId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEventId(null);
                          setEventForm({
                            title: '', slogan: '', date: '', location: '', tag: 'Meetup', image: '', description: '',
                            eventLink: '', isPast: false, communityPartners: [], mediaPartners: [],
                            endDate: '', endTime: '', startTime: '', category: 'meetup',
                            speakers: [], coHosts: [], supportedEcosystems: [], themeColor: ''
                          });
                        }}
                        className="flex-1 py-2.5 border border-white/10 rounded-full text-xs font-medium hover:border-white/20 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 py-2.5 bg-white text-black rounded-full text-xs font-semibold hover:bg-neutral-200 transition-colors"
                    >
                      {editingEventId ? 'Save Event Details' : 'Publish / Create Event'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Events List & Event Analytics (Right, 7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar size={18} />
                    <span>Existing Events Dashboard</span>
                  </h2>
                  <span className="text-[10px] bg-white/5 border border-white/10 text-neutral-400 px-3 py-1 rounded-full">
                    {events?.length ?? 0} Events Registered
                  </span>
                </div>

                {events === undefined ? (
                  <p className="text-xs text-neutral-500">Loading events database...</p>
                ) : events.length === 0 ? (
                  <p className="text-xs text-neutral-500 bg-[#0C0C0C] border border-white/5 p-6 rounded-2xl">No events added yet. Create one on the left.</p>
                ) : (
                  <div className="space-y-4">
                    {events.map(event => (
                      <div 
                        key={event._id} 
                        className="flex flex-col p-5 bg-[#0C0C0C] border border-white/10 rounded-3xl gap-4 hover:border-white/15 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-black border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                              {event.image ? (
                                <img
                                  src={event.image}
                                  alt={event.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Calendar size={20} className="text-neutral-600" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[9px] font-semibold bg-white/10 text-neutral-300 px-2 py-0.5 rounded-full border border-white/5 uppercase">
                                  {event.category || 'meetup'}
                                </span>
                                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border uppercase ${
                                  event.isPast 
                                    ? 'bg-neutral-900 text-neutral-500 border-neutral-800' 
                                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                }`}>
                                  {event.isPast ? 'Past' : 'Upcoming'}
                                </span>
                              </div>
                              <h3 className="text-sm font-semibold text-white mt-1.5">{event.title}</h3>
                              <p className="text-xs text-neutral-500 font-light mt-0.5">{event.slogan}</p>
                              
                              {/* Metadata Icons row */}
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[10px] text-neutral-400 font-light">
                                <span className="flex items-center gap-1"><Calendar size={10} />{event.date}</span>
                                <span className="flex items-center gap-1"><MapPin size={10} />{event.location}</span>
                                <span className="flex items-center gap-1"><Eye size={10} className="text-neutral-500" />{(event.views ?? 0)} Views</span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-1 sm:self-start self-end">
                            {/* Manage Associations & Analytics Panel */}
                            <button
                              onClick={() => setManagingEvent(JSON.parse(JSON.stringify(event)))}
                              className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl text-xs font-semibold text-white transition-colors"
                            >
                              <BarChart3 size={12} className="text-neutral-400" />
                              <span>Manage & Analytics</span>
                            </button>

                            <button
                              onClick={() => handleEditEvent(event)}
                              className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-colors"
                              title="Edit Event"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event._id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-400 transition-colors"
                              title="Delete Event"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* CoHost status notification alert warning */}
                        {(!event.coHosts || event.coHosts.length === 0) ? (
                          <div className="text-[10px] bg-yellow-500/5 border border-yellow-500/10 text-yellow-500/80 px-3 py-2 rounded-xl font-light">
                            ⚠️ Hosting by default MP DAO Administrator. Add Co-Hosts to display guest hosts.
                          </div>
                        ) : (
                          <div className="text-[10px] bg-white/5 border border-white/5 text-neutral-400 px-3 py-2 rounded-xl flex items-center justify-between">
                            <span>👥 Managed with {event.coHosts.length} Hosts (Notifications active for Co-Hosts)</span>
                            <span className="text-white/60 font-semibold">{event.coHosts.map((c: any) => c.name).join(', ')}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: ADMIN ACCESS */}
          {activeTab === 'admins' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add Admin */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-6 h-fit">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <UserPlus size={18} />
                  <span>Create Admin Account</span>
                </h2>

                <form onSubmit={handleCreateAdmin} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">New Gmail / Email</label>
                    <input
                      type="email"
                      required
                      placeholder="partner@mpdao.in"
                      value={newAdminEmail}
                      onChange={e => setNewAdminEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 text-xs font-medium">New Admin Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={newAdminPassword}
                      onChange={e => setNewAdminPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-700 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                    />
                  </div>

                  {adminSuccess && (
                    <p className="text-emerald-400 text-xs font-light">{adminSuccess}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors text-sm"
                  >
                    Add Admin
                  </button>
                </form>
              </div>

              {/* Admins List */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Shield size={18} />
                  <span>Active Administrators</span>
                </h2>

                {listAdmins === undefined ? (
                  <p className="text-xs text-neutral-500">Loading administrators...</p>
                ) : (
                  <div className="space-y-3">
                    {listAdmins.map(admin => (
                      <div key={admin.id} className="flex items-center justify-between p-4 bg-[#0C0C0C] border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                            <Mail size={14} className="text-neutral-400" />
                          </div>
                          <span className="text-sm font-light text-white">{admin.email}</span>
                        </div>

                        {listAdmins.length > 1 && (
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* DETAILED MANAGE & ANALYTICS MODAL */}
      {managingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-overlay font-sans">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border border-white/10 bg-[#0C0C0C] p-6 sm:p-8 flex flex-col gap-6">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Event Dashboard: {managingEvent.title}</h3>
                  <p className="text-xs text-neutral-500 font-light">Ecosystem & Partner Association Upgrades</p>
                </div>
              </div>
              <button 
                onClick={() => setManagingEvent(null)}
                className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Analytics Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#050505] border border-white/5 rounded-[1.5rem] p-4 text-center">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">Total Page Views</span>
                <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                  <Eye size={18} className="text-neutral-400" />
                  <span>{managingEvent.views ?? 0}</span>
                </div>
              </div>

              <div className="bg-[#050505] border border-white/5 rounded-[1.5rem] p-4 text-center">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">Co-Hosts Configured</span>
                <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                  <Users size={18} className="text-neutral-400" />
                  <span>{(managingEvent.coHosts?.length ?? 0)}</span>
                </div>
              </div>

              <div className="bg-[#050505] border border-white/5 rounded-[1.5rem] p-4 text-center">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">Speakers List</span>
                <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                  <Star size={18} className="text-neutral-400" />
                  <span>{(managingEvent.speakers?.length ?? 0)}</span>
                </div>
              </div>
            </div>

            {/* Manage Partners (Upgrade Area) */}
            <div className="space-y-6">
              
              {/* 1. Supported Ecosystems */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block flex items-center gap-2">
                  <Sparkles size={12} className="text-yellow-500" />
                  <span>Upgrade Supported Ecosystems</span>
                </label>
                {sponsors === undefined ? (
                  <p className="text-[10px] text-neutral-500">Loading ecosystems...</p>
                ) : (
                  <div className="flex flex-wrap gap-2 p-3 bg-black/40 border border-white/5 rounded-2xl">
                    {sponsors.map(s => {
                      const active = (managingEvent.supportedEcosystems || []).includes(s.name) || (managingEvent.supportedEcosystems || []).includes(s._id);
                      return (
                        <button
                          key={s._id}
                          type="button"
                          onClick={() => toggleModalSponsor(s.name)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            active
                              ? 'bg-white text-black border-white font-semibold'
                              : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. Community Partners */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block flex items-center gap-2">
                  <Users size={12} />
                  <span>Upgrade Community Partners</span>
                </label>
                {partners === undefined ? (
                  <p className="text-[10px] text-neutral-500">Loading partners...</p>
                ) : (
                  <div className="flex flex-wrap gap-2 p-3 bg-black/40 border border-white/5 rounded-2xl">
                    {partners.filter(p => p.type === 'community').map(p => {
                      const active = (managingEvent.communityPartners || []).includes(p.name);
                      return (
                        <button
                          key={p._id}
                          type="button"
                          onClick={() => toggleModalPartner('community', p.name)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            active
                              ? 'bg-white text-black border-white font-semibold'
                              : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {p.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. Media Partners */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block flex items-center gap-2">
                  <FileText size={12} />
                  <span>Upgrade Media Partners</span>
                </label>
                {partners === undefined ? (
                  <p className="text-[10px] text-neutral-500">Loading partners...</p>
                ) : (
                  <div className="flex flex-wrap gap-2 p-3 bg-black/40 border border-white/5 rounded-2xl">
                    {partners.filter(p => p.type === 'media').map(p => {
                      const active = (managingEvent.mediaPartners || []).includes(p.name);
                      return (
                        <button
                          key={p._id}
                          type="button"
                          onClick={() => toggleModalPartner('media', p.name)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            active
                              ? 'bg-white text-black border-white font-semibold'
                              : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {p.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
              <button
                onClick={() => setManagingEvent(null)}
                className="px-6 py-2.5 border border-white/10 hover:border-white/20 rounded-full text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModalAssociations}
                className="px-6 py-2.5 bg-white text-black hover:bg-neutral-200 rounded-full text-xs font-semibold transition-colors"
              >
                Save Association Upgrades
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
