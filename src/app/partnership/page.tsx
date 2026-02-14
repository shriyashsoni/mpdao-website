'use client';

import { useState } from 'react';
import { Mail, Phone, Building2, ArrowRight } from 'lucide-react';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    partnership_type: 'strategic',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/partnership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit partnership request');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        partnership_type: 'strategic',
        description: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-white">Partnership Opportunities</h1>
          <p className="text-xl text-gray-400">
            Join us in bringing Web3 technology to Madhya Pradesh. We're looking for strategic partners to collaborate and grow together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <Mail className="w-8 h-8 text-indigo-500 mb-3" />
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <a href="mailto:partnership@mpdao.site" className="text-gray-400 hover:text-indigo-400 transition">
              partnership@mpdao.site
            </a>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <Phone className="w-8 h-8 text-indigo-500 mb-3" />
            <h3 className="text-white font-semibold mb-2">Phone</h3>
            <p className="text-gray-400">Available for inquiries</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <Building2 className="w-8 h-8 text-indigo-500 mb-3" />
            <h3 className="text-white font-semibold mb-2">Location</h3>
            <p className="text-gray-400">Madhya Pradesh, India</p>
          </div>
        </div>

        {/* Partnership Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Partnership Request</h2>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-lg">
              <p className="text-green-400">
                ✓ Thank you! We've received your partnership request. We'll get back to you soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
              <p className="text-red-400">✗ {errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition"
                  placeholder="john@example.com"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-white font-medium mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition"
                  placeholder="Your Company"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition"
                  placeholder="+91 XXXX XXXXX"
                />
              </div>
            </div>

            {/* Partnership Type */}
            <div>
              <label htmlFor="partnership_type" className="block text-white font-medium mb-2">
                Partnership Type *
              </label>
              <select
                id="partnership_type"
                name="partnership_type"
                value={formData.partnership_type}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none transition"
              >
                <option value="strategic">Strategic Partnership</option>
                <option value="sponsor">Event Sponsorship</option>
                <option value="technology">Technology Partnership</option>
                <option value="ecosystem">Ecosystem Integration</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-white font-medium mb-2">
                Tell us about your partnership interest *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition"
                placeholder="Describe your partnership interests, goals, and how you believe MP DAO can collaborate with you..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? 'Sending...' : (
                <>
                  Send Partnership Request
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-4">
            * Required fields. We'll review your request and get back to you within 48 hours.
          </p>
        </div>
      </div>
    </main>
  );
}
