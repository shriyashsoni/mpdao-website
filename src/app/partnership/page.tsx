'use client';

import { useState } from 'react';
import { Mail, Phone, Building2, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    partnership_type: 'strategic',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create email body with formatted partnership request details
    const emailBody = `Partnership Request from ${formData.name}

Full Name: ${formData.name}
Email Address: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company}
Partnership Type: ${formData.partnership_type}

Partnership Description:
${formData.description}

---
Sent via MP DAO Partnership Request Form`;

    // Encode the email body for URL
    const encodedBody = encodeURIComponent(emailBody);
    const subject = encodeURIComponent(`Partnership Request from ${formData.company}`);

    // Redirect to Gmail with pre-filled content
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=partnerships@mpdao.site&su=${subject}&body=${encodedBody}`;
  };

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden pt-24 sm:pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#0C0C0C] mb-6">
              <Star className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-xs text-neutral-300 font-medium">Collaborate With Us</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white mb-6">
              Partnership Opportunities
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
              Join us in bringing Web3 technology to Madhya Pradesh. We&apos;re looking for strategic partners to collaborate and grow together.
            </p>
          </motion.div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0C0C0C] p-6 hover:border-white/20 transition-all duration-300">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Email</h3>
            <a href="mailto:partnerships@mpdao.site" className="text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm font-light block truncate">
              partnerships@mpdao.site
            </a>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0C0C0C] p-6 hover:border-white/20 transition-all duration-300">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Phone Support</h3>
            <p className="text-neutral-400 text-xs sm:text-sm font-light">Available for official inquiries</p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0C0C0C] p-6 hover:border-white/20 transition-all duration-300">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Location</h3>
            <p className="text-neutral-400 text-xs sm:text-sm font-light">Madhya Pradesh, India</p>
          </div>
        </div>

        {/* Partnership Form */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0C0C0C] p-8 sm:p-10 hover:border-white/15 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Send us a Partnership Request</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-white font-medium text-xs sm:text-sm">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-2xl text-white placeholder-neutral-600 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-white font-medium text-xs sm:text-sm">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-2xl text-white placeholder-neutral-600 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                  placeholder="john@example.com"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-white font-medium text-xs sm:text-sm">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-2xl text-white placeholder-neutral-600 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                  placeholder="Your Company"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-white font-medium text-xs sm:text-sm">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-2xl text-white placeholder-neutral-600 focus:border-white/30 focus:outline-none transition-colors text-sm font-light"
                  placeholder="+91 XXXX XXXXX"
                />
              </div>
            </div>

            {/* Partnership Type */}
            <div className="flex flex-col gap-2">
              <label htmlFor="partnership_type" className="text-white font-medium text-xs sm:text-sm">
                Partnership Type *
              </label>
              <select
                id="partnership_type"
                name="partnership_type"
                value={formData.partnership_type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-2xl text-white focus:border-white/30 focus:outline-none transition-colors text-sm font-light appearance-none"
              >
                <option value="strategic" className="bg-[#0C0C0C]">Strategic Partnership</option>
                <option value="sponsor" className="bg-[#0C0C0C]">Event Sponsorship</option>
                <option value="technology" className="bg-[#0C0C0C]">Technology Partnership</option>
                <option value="ecosystem" className="bg-[#0C0C0C]">Ecosystem Integration</option>
                <option value="other" className="bg-[#0C0C0C]">Other</option>
              </select>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-white font-medium text-xs sm:text-sm">
                Tell us about your partnership interest *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-2xl text-white placeholder-neutral-600 focus:border-white/30 focus:outline-none transition-colors text-sm font-light resize-none"
                placeholder="Describe your partnership interests, goals, and how you believe MP DAO can collaborate with you..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 text-sm mt-4"
            >
              <span>Send Partnership Request via Gmail</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-neutral-500 text-xs font-light mt-4 text-center">
            * Required fields. We&apos;ll review your request and get back to you within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
