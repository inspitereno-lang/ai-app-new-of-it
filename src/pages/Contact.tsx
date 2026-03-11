import { useState } from 'react';

import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle, 
  Sparkles,
  ChevronRight,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';


export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Our Office",
      details: "828 Busse Highway, Park Ridge, IL, USA",
      action: "Get Directions",
      link: "https://maps.google.com"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "info@prontotech.ai",
      action: "Send Email",
      link: "mailto:info@prontotech.ai"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM",
      action: "Book a Call",
      link: "#"
    }
  ];

  return (
    <Layout>
      <div className="bg-white font-sans text-gray-900">

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-50/50 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Get in Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Let's Build the Future <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Together with AI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Details */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form and our team will get back to you within 24 hours. 
                  Below are other ways to reach us.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex items-start p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 mr-4">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{info.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{info.details}</p>
                        <a href={info.link} className="inline-flex items-center text-blue-600 text-sm font-medium mt-3 hover:underline">
                          {info.action} <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Card */}
              <div className="relative group">
                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative">
                  <img 
                    src="https://img1.wsimg.com/isteam/getty/2159943683/:/cr=t:0%25,l:28.91%25,w:42.19%25,h:100%25/rs=w:1200,h:800,cg:true" 
                    alt="AI Innovation" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white text-left">
                    <p className="font-bold text-xl">Innovation at Heart</p>
                    <p className="text-gray-200 text-sm">Empowering your business with ProntoTech AI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                  <p className="text-gray-600 mb-8">
                    Thank you for reaching out. A member of our team will contact you shortly.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Send another message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Full Name</label>
                      <Input 
                        placeholder="John Doe" 
                        required 
                        className="bg-gray-50 border-gray-200 focus:ring-black rounded-xl p-6"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                      <Input 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        className="bg-gray-50 border-gray-200 focus:ring-black rounded-xl p-6"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Subject</label>
                    <Input 
                      placeholder="How can we help?" 
                      required 
                      className="bg-gray-50 border-gray-200 focus:ring-black rounded-xl p-6"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Your Message</label>
                    <textarea 
                      rows={6} 
                      className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-black outline-none rounded-xl p-6 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-6 text-lg font-bold">
                    <Send className="w-5 h-5 mr-2" /> Send Message
                  </Button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      </div>
    </Layout>
  );
}
