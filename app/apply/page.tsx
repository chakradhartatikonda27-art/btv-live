'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building2, Trophy, Video, Phone, Mail, MapPin, Upload, ChevronRight, ChevronLeft, CheckCircle, ArrowRight, Star, Loader2 } from 'lucide-react';

const INDUSTRIES = [
  'Technology and Startups',
  'Healthcare and Medicine',
  'Finance and CA/CS',
  'Real Estate',
  'Manufacturing',
  'Legal and Judiciary',
  'Education and Academia',
  'Arts and Entertainment',
  'Sports',
  'Retail and E-commerce',
  'Social Impact and NGO',
  'Other',
];

const STEPS = [
  { id: 1, label: 'Identity', title: 'Who Are You?', subtitle: 'The world begins with a name.' },
  { id: 2, label: 'Professional', title: 'Your Work', subtitle: 'What you have built defines the story.' },
  { id: 3, label: 'Legacy', title: 'Your Story', subtitle: 'The moments that made you.' },
  { id: 4, label: 'Submit', title: 'Your Proof', subtitle: 'Show the world what you have done.' },
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', city: '',
    profession: '', company: '', industry: '',
    achievements: '', legacyStory: '', videoLink: '',
    mediaFiles: [], consent: false,
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validateStep(current) {
    const e = {};
    if (current === 1) {
      if (!form.fullName.trim()) e.fullName = 'Name is required';
      if (!form.email.includes('@')) e.email = 'Valid email required';
      if (!form.phone.trim()) e.phone = 'Phone is required';
      if (!form.city.trim()) e.city = 'City is required';
    }
    if (current === 2) {
      if (!form.profession.trim()) e.profession = 'Profession is required';
      if (!form.industry) e.industry = 'Select your industry';
    }
    if (current === 3) {
      if (form.achievements.length < 50) e.achievements = 'Please describe your achievements (min 50 chars)';
      if (form.legacyStory.length < 100) e.legacyStory = 'Tell your story (min 100 chars)';
    }
    if (current === 4) {
      if (!form.consent) e.consent = 'Please confirm your consent';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function nextStep() {
    if (validateStep(step) && step < 4) setStep((s) => s + 1);
  }

  function prevStep() {
    if (step > 1) setStep((s) => s - 1);
  }

  async function handleSubmit() {
    if (!validateStep(4)) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          city: form.city,
          profession: form.profession,
          company: form.company,
          industry: form.industry,
          achievements: form.achievements,
          legacyStory: form.legacyStory,
          videoLink: form.videoLink,
          mediaUrls: [],
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <main className='min-h-screen flex items-center justify-center px-4' style={{ background: '#08090B' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className='text-center max-w-lg'
        >
          <div className='w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8' style={{ background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.3)' }}>
            <CheckCircle size={36} className='text-gold-400' />
          </div>
          <h1 className='text-4xl text-white mb-4' style={{ fontFamily: 'var(--font-display)' }}>
            Nomination Received,
            <br />
            <span className='text-gold-gradient'>{form.fullName.split(' ')[0]}.</span>
          </h1>
          <p className='text-platinum-300 text-base mb-8 leading-relaxed'>
            Our editorial team will review your submission within 48 hours.
            If shortlisted, we will reach out at {form.email}.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <a href='/' className='inline-flex items-center justify-center font-semibold px-7 py-3 rounded-full text-sm' style={{ background: '#D4A832', color: '#08090B' }}>
              Back to BTV LIVE
            </a>
            <a href='/shows' className='inline-flex items-center justify-center font-medium px-7 py-3 rounded-full text-sm' style={{ color: '#D4D6DA', border: '1px solid #252830' }}>
              Explore Stories
            </a>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className='min-h-screen py-16 px-4 relative overflow-hidden' style={{ background: '#08090B' }}>
      <div className='absolute inset-0 pointer-events-none' style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,168,50,0.06) 0%, transparent 60%)' }} />

      <div className='relative max-w-2xl mx-auto'>
        <div className='text-center mb-12 pt-16'>
          <div className='inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border' style={{ background: 'rgba(212,168,50,0.05)', borderColor: 'rgba(212,168,50,0.3)' }}>
            <Star size={12} className='text-gold-500' />
            <span className='text-gold-400 font-mono text-xs tracking-widest uppercase'>Feature Nomination</span>
          </div>
          <h1 className='text-4xl md:text-5xl text-white mb-3' style={{ fontFamily: 'var(--font-display)' }}>
            Your Story Deserves
            <br />
            <span className='text-gold-gradient'>a Global Stage.</span>
          </h1>
          <p className='text-platinum-300 text-base max-w-md mx-auto'>
            Join 500+ visionaries featured on BTV LIVE. Our editorial team reviews every submission personally.
          </p>
        </div>

        <div className='flex items-center gap-0 mb-10'>
          {STEPS.map((s, i) => (
            <div key={s.id} className='flex items-center flex-1'>
              <div className='flex flex-col items-center gap-1.5'>
                <div
                  className='w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-mono transition-all'
                  style={{
                    background: step >= s.id ? '#D4A832' : 'transparent',
                    borderColor: step >= s.id ? '#D4A832' : '#252830',
                    color: step >= s.id ? '#08090B' : '#7A7D85',
                  }}
                >
                  {step > s.id ? <CheckCircle size={16} /> : s.id}
                </div>
                <span className='text-[10px] font-mono tracking-wide hidden sm:block' style={{ color: step >= s.id ? '#E8C35A' : '#7A7D85' }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className='flex-1 h-[1px] mx-2 mb-4' style={{ background: step > s.id ? '#D4A832' : '#252830' }} />
              )}
            </div>
          ))}
        </div>

        <div className='rounded-xl p-8' style={{ background: '#141619', border: '1px solid #252830' }}>
          <div className='mb-8'>
            <p className='text-gold-600 font-mono text-xs tracking-widest uppercase mb-1'>
              Step {step} of {STEPS.length}
            </p>
            <h2 className='text-2xl text-platinum-50' style={{ fontFamily: 'var(--font-display)' }}>
              {STEPS[step - 1].title}
            </h2>
            <p className='text-platinum-400 text-sm mt-1'>{STEPS[step - 1].subtitle}</p>
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <div className='space-y-5'>
                  <Field label='Full Name' required error={errors.fullName}>
                    <input type='text' value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder='Rajiv Nair' className='w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors' style={{ background: '#1C1E23', border: errors.fullName ? '1px solid #E0304F' : '1px solid #252830', color: '#EDEEF0' }} />
                  </Field>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                    <Field label='Email' required error={errors.email}>
                      <input type='email' value={form.email} onChange={(e) => update('email', e.target.value)} placeholder='you@company.com' className='w-full px-4 py-3 rounded-xl text-sm outline-none' style={{ background: '#1C1E23', border: errors.email ? '1px solid #E0304F' : '1px solid #252830', color: '#EDEEF0' }} />
                    </Field>
                    <Field label='Phone' required error={errors.phone}>
                      <input type='tel' value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder='+91 98765 43210' className='w-full px-4 py-3 rounded-xl text-sm outline-none' style={{ background: '#1C1E23', border: errors.phone ? '1px solid #E0304F' : '1px solid #252830', color: '#EDEEF0' }} />
                    </Field>
                  </div>
                  <Field label='City' required error={errors.city}>
                    <input type='text' value={form.city} onChange={(e) => update('city', e.target.value)} placeholder='Hyderabad, Telangana' className='w-full px-4 py-3 rounded-xl text-sm outline-none' style={{ background: '#1C1E23', border: errors.city ? '1px solid #E0304F' : '1px solid #252830', color: '#EDEEF0' }} />
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className='space-y-5'>
                  <Field label='Profession / Title' required error={errors.profession}>
                    <input type='text' value={form.profession} onChange={(e) => update('profession', e.target.value)} placeholder='Founder and CEO / Senior Cardiologist / CA' className='w-full px-4 py-3 rounded-xl text-sm outline-none' style={{ background: '#1C1E23', border: errors.profession ? '1px solid #E0304F' : '1px solid #252830', color: '#EDEEF0' }} />
                  </Field>
                  <Field label='Company / Organization'>
                    <input type='text' value={form.company} onChange={(e) => update('company', e.target.value)} placeholder='Acme Industries Pvt. Ltd.' className='w-full px-4 py-3 rounded-xl text-sm outline-none' style={{ background: '#1C1E23', border: '1px solid #252830', color: '#EDEEF0' }} />
                  </Field>
                  <Field label='Industry' required error={errors.industry}>
                    <select value={form.industry} onChange={(e) => update('industry', e.target.value)} className='w-full px-4 py-3 rounded-xl text-sm outline-none cursor-pointer' style={{ background: '#1C1E23', border: errors.industry ? '1px solid #E0304F' : '1px solid #252830', color: form.industry ? '#EDEEF0' : '#7A7D85' }}>
                      <option value=''>Select your industry</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div className='space-y-5'>
                  <Field label='Key Achievements' required error={errors.achievements} hint='Awards, milestones, revenue growth, patents, lives impacted...'>
                    <textarea value={form.achievements} onChange={(e) => update('achievements', e.target.value)} rows={4} placeholder='Founded the company in 2018. Scaled to 120 Cr revenue in 5 years...' className='w-full px-4 py-3 rounded-xl text-sm outline-none resize-none' style={{ background: '#1C1E23', border: errors.achievements ? '1px solid #E0304F' : '1px solid #252830', color: '#EDEEF0' }} />
                    <p className='text-xs mt-1 font-mono' style={{ color: form.achievements.length >= 50 ? '#D4A832' : '#7A7D85' }}>
                      {form.achievements.length} / 50 min chars {form.achievements.length >= 50 ? '✓' : ''}
                    </p>
                  </Field>
                  <Field label='Your Legacy Story' required error={errors.legacyStory} hint='Your journey, struggles, turning points, and what drives you.'>
                    <textarea value={form.legacyStory} onChange={(e) => update('legacyStory', e.target.value)} rows={6} placeholder='I grew up in a small town...' className='w-full px-4 py-3 rounded-xl text-sm outline-none resize-none' style={{ background: '#1C1E23', border: errors.legacyStory ? '1px solid #E0304F' : '1px solid #252830', color: '#EDEEF0' }} />
                    <p className='text-xs mt-1 font-mono' style={{ color: form.legacyStory.length >= 100 ? '#D4A832' : '#7A7D85' }}>
                      {form.legacyStory.length} / 100 min chars {form.legacyStory.length >= 100 ? '✓' : ''}
                    </p>
                  </Field>
                </div>
              )}

              {step === 4 && (
                <div className='space-y-5'>
                  <Field label='Video / Reel Link' hint='YouTube, Instagram, or any public URL. Optional but recommended.'>
                    <input type='url' value={form.videoLink} onChange={(e) => update('videoLink', e.target.value)} placeholder='https://youtube.com/watch?v=...' className='w-full px-4 py-3 rounded-xl text-sm outline-none' style={{ background: '#1C1E23', border: '1px solid #252830', color: '#EDEEF0' }} />
                  </Field>

                  <div className='rounded-xl p-5 space-y-2 text-sm' style={{ background: '#1C1E23', border: '1px solid #252830' }}>
                    <p className='text-gold-500 font-semibold text-xs tracking-wide uppercase mb-3'>Submission Summary</p>
                    <SummaryRow label='Name' value={form.fullName} />
                    <SummaryRow label='Email' value={form.email} />
                    <SummaryRow label='Profession' value={form.profession} />
                    <SummaryRow label='Company' value={form.company || 'Not provided'} />
                    <SummaryRow label='Industry' value={form.industry || 'Not selected'} />
                    <SummaryRow label='City' value={form.city} />
                  </div>

                  <label className='flex items-start gap-3 cursor-pointer'>
                    <div
                      className='w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors'
                      style={{ background: form.consent ? '#D4A832' : 'transparent', borderColor: form.consent ? '#D4A832' : '#252830' }}
                      onClick={() => update('consent', !form.consent)}
                    >
                      {form.consent && <CheckCircle size={12} color='#08090B' />}
                    </div>
                    <span className='text-platinum-400 text-sm leading-relaxed'>
                      I confirm all information is accurate and consent to BTV LIVE featuring my story across digital and broadcast platforms.
                    </span>
                  </label>
                  {errors.consent && <p className='text-crimson-500 text-xs'>{errors.consent}</p>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className='flex items-center justify-between mt-8 pt-6' style={{ borderTop: '1px solid #252830' }}>
            <button onClick={prevStep} disabled={step === 1} className='flex items-center gap-2 text-sm font-medium px-4 py-2 transition-colors' style={{ color: step === 1 ? '#5C6070' : '#9A9DA5', cursor: step === 1 ? 'not-allowed' : 'pointer' }}>
              <ChevronLeft size={16} />
              Back
            </button>

            {step < 4 ? (
              <button onClick={nextStep} className='flex items-center gap-2 font-semibold px-7 py-3 rounded-full text-sm shadow-gold' style={{ background: '#D4A832', color: '#08090B' }}>
                Continue
                <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={status === 'loading'} className='flex items-center gap-2 font-semibold px-8 py-3 rounded-full text-sm shadow-gold disabled:opacity-60' style={{ background: '#D4A832', color: '#08090B' }}>
                {status === 'loading' ? (
                  <><Loader2 size={16} className='animate-spin' />Submitting...</>
                ) : (
                  <>Submit Nomination<ArrowRight size={16} /></>
                )}
              </button>
            )}
          </div>

          {status === 'error' && (
            <p className='text-crimson-500 text-xs text-center mt-4'>
              Something went wrong. Please try again.
            </p>
          )}
        </div>

        <div className='mt-8 flex items-center justify-center gap-6 text-xs' style={{ color: '#5C6070' }}>
          <span>SSL Encrypted</span>
          <span>·</span>
          <span>Reviewed within 48 hours</span>
          <span>·</span>
          <span>500+ Stories Featured</span>
        </div>
      </div>
    </main>
  );
}

function Field({ label, required, hint, error, children }) {
  return (
    <div>
      <label className='block mb-1.5'>
        <span className='text-platinum-200 text-sm font-medium'>
          {label}
          {required && <span className='text-crimson-500 ml-0.5'>*</span>}
        </span>
        {hint && <span className='block text-platinum-500 text-xs mt-0.5'>{hint}</span>}
      </label>
      {children}
      {error && <p className='text-crimson-500 text-xs mt-1.5'>{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className='flex justify-between text-xs'>
      <span className='text-platinum-500'>{label}</span>
      <span className='text-platinum-200 font-medium'>{value}</span>
    </div>
  );
}
