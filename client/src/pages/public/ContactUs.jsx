import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been sent! Our support team will reply within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="bg-white border-b border-secondary-200 py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            We're Here to Help
          </span>
          <h1 className="text-3xl font-extrabold text-secondary-900 mt-3 mb-2">Get in Touch</h1>
          <p className="text-xs sm:text-sm text-secondary-500">
            Have questions about candidate sourcing, platform features, or enterprise hiring partnerships?
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Support Channels */}
          <div className="space-y-4">
            <div className="card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-secondary-900">Email Inquiries</h4>
                <p className="text-xs text-secondary-500 mt-0.5">contact@hirehub.com</p>
                <p className="text-[11px] text-secondary-400 mt-1">24/7 dedicated support</p>
              </div>
            </div>

            <div className="card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-secondary-900">Phone Support</h4>
                <p className="text-xs text-secondary-500 mt-0.5">+1 (800) 555-HIRE</p>
                <p className="text-[11px] text-secondary-400 mt-1">Mon-Fri, 9am - 6pm EST</p>
              </div>
            </div>

            <div className="card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-secondary-900">Headquarters</h4>
                <p className="text-xs text-secondary-500 mt-0.5">Technology Park, Chandigarh, India</p>
                <p className="text-[11px] text-secondary-400 mt-1">Chandigarh University Campus</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-6 sm:p-8">
              <h2 className="text-lg font-bold text-secondary-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary-600" />
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="input-field text-xs py-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="input-field text-xs py-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary-800 mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Candidate sourcing or platform inquiry"
                    className="input-field text-xs py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary-800 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can assist you..."
                    className="input-field text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary text-xs py-3 px-8 font-bold flex items-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;

