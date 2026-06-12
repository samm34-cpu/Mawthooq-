'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Stars } from '@/components/ui/Stars';
import { Monogram } from '@/components/ui/Monogram';
import { Icon } from '@/components/ui/Icon';
import { useLanguage } from '@/contexts/LanguageContext';
import { getScoreLabel } from '@/lib/data';
import type { Brand } from '@/lib/data';

interface WriteReviewFlowProps {
  brand: Brand;
  invitedBy?: string; // For shareable link page
}

const TOTAL_STEPS = 5;

export function WriteReviewFlow({ brand, invitedBy }: WriteReviewFlowProps) {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const stepLabels = lang === 'ar'
    ? ['التقييم', 'المراجعة', 'الوسائط', 'الهوية', 'النجاح']
    : ['Note', 'Avis', 'Médias', 'Identité', 'Succès'];

  const canNext = () => {
    if (step === 1) return rating > 0;
    if (step === 2) return text.length >= 50;
    if (step === 3) return true;
    if (step === 4) return name.trim().length > 0 && email.includes('@') && confirmed;
    return true;
  };

  const handleNext = () => {
    if (canNext() && step < TOTAL_STEPS) setStep(s => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Invited by header */}
        {invitedBy && (
          <div
            style={{
              background: 'var(--trust-soft)',
              border: '1px solid rgba(30,158,106,0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Monogram letter={brand.mono} color={brand.color} ink={brand.ink} size={40} radius={10} />
            <div>
              <div style={{ fontSize: 13, color: 'var(--trust)', fontWeight: 700, marginBottom: 2 }}>
                {lang === 'ar'
                  ? `${lang === 'ar' ? brand.ar : brand.fr} يدعوك لكتابة مراجعة`
                  : `${brand.fr} vous invite à laisser un avis`}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                {lang === 'ar'
                  ? 'شاركنا تجربتك مع هذه الشركة'
                  : 'Partagez votre expérience avec cette marque'}
              </div>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div style={{ marginBottom: 32 }}>
          {/* Steps */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(s => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background: s <= step ? 'var(--accent)' : 'var(--star-empty)',
                  transition: 'background 0.3s ease',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {stepLabels.map((label, i) => (
              <span
                key={label}
                style={{
                  fontSize: 11,
                  color: i + 1 <= step ? 'var(--accent)' : 'var(--muted-2)',
                  fontWeight: i + 1 === step ? 600 : 400,
                  flex: 1,
                  textAlign: 'center',
                  transition: 'color 0.3s',
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Brand header */}
        {step < 5 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <Monogram letter={brand.mono} color={brand.color} ink={brand.ink} size={48} radius={12} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>
                {lang === 'ar' ? brand.ar : brand.fr}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                {lang === 'ar' ? brand.tag_ar : brand.tag_fr}
              </div>
            </div>
          </div>
        )}

        {/* Step content */}
        <div className="glass-card" style={{ padding: 32 }}>
          {/* Step 1: Rating */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                {lang === 'ar' ? 'كيف كانت تجربتك؟' : 'Comment était votre expérience ?'}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 32 }}>
                {lang === 'ar' ? 'اختر عدد النجوم التي تعبر عن تجربتك' : 'Sélectionnez le nombre d\'étoiles qui reflète votre expérience'}
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <button
                    key={i}
                    onClick={() => setRating(i)}
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 4,
                      transform: (hoverRating || rating) >= i ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <svg width={48} height={48} viewBox="0 0 24 24">
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                        fill={(hoverRating || rating) >= i ? 'var(--star)' : 'var(--star-empty)'}
                        stroke="none"
                      />
                    </svg>
                  </button>
                ))}
              </div>
              {(hoverRating || rating) > 0 && (
                <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 700, color: 'var(--trust)', minHeight: 28 }}>
                  {getScoreLabel(hoverRating || rating, lang)}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Text */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                {lang === 'ar' ? 'اكتب مراجعتك' : 'Rédigez votre avis'}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>
                {lang === 'ar' ? 'الحد الأدنى ٥٠ حرفاً' : 'Minimum 50 caractères'}
              </p>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={lang === 'ar' ? 'عنوان المراجعة (اختياري)' : 'Titre de l\'avis (optionnel)'}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1.5px solid var(--line)',
                  borderRadius: 10,
                  fontSize: 14,
                  color: 'var(--ink)',
                  background: 'rgba(238,241,247,0.5)',
                  marginBottom: 12,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--line)'; }}
              />
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={lang === 'ar' ? 'شاركنا تجربتك التفصيلية...' : 'Partagez votre expérience en détail...'}
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1.5px solid ${text.length < 50 && text.length > 0 ? '#E07000' : 'var(--line)'}`,
                  borderRadius: 10,
                  fontSize: 14,
                  color: 'var(--ink)',
                  background: 'rgba(238,241,247,0.5)',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  outline: 'none',
                  lineHeight: 1.6,
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                onBlur={e => { e.target.style.borderColor = text.length < 50 && text.length > 0 ? '#E07000' : 'var(--line)'; }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 12, color: text.length < 50 && text.length > 0 ? '#E07000' : 'var(--muted)' }}>
                  {text.length < 50 && text.length > 0
                    ? (lang === 'ar' ? `${50 - text.length} حرف متبقٍ` : `${50 - text.length} caractères restants`)
                    : ''}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{text.length}</span>
              </div>
            </div>
          )}

          {/* Step 3: Media */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                {lang === 'ar' ? 'أضف صور أو فيديو' : 'Ajoutez des photos ou vidéos'}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>
                {lang === 'ar' ? 'اختياري — تساعد الوسائط على تعزيز مصداقية مراجعتك' : 'Optionnel — les médias renforcent la crédibilité de votre avis'}
              </p>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); }}
                style={{
                  border: `2px dashed ${dragOver ? 'var(--accent)' : 'var(--line)'}`,
                  borderRadius: 16,
                  padding: '48px 24px',
                  textAlign: 'center',
                  background: dragOver ? 'rgba(61,130,222,0.05)' : 'rgba(238,241,247,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ marginBottom: 16, color: 'var(--muted)' }}>
                  <Icon name="Upload" size={40} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
                  {lang === 'ar' ? 'اسحب الملفات هنا أو انقر للاختيار' : 'Glissez vos fichiers ou cliquez pour choisir'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
                  {lang === 'ar' ? 'JPG, PNG, MP4 حتى 20MB' : 'JPG, PNG, MP4 jusqu\'à 20MB'}
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 16px',
                      border: '1px solid var(--line)',
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.8)',
                      cursor: 'pointer',
                      fontSize: 13,
                      color: 'var(--ink)',
                    }}
                  >
                    <Icon name="Camera" size={14} />
                    {lang === 'ar' ? 'صورة' : 'Photo'}
                  </button>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 16px',
                      border: '1px solid var(--line)',
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.8)',
                      cursor: 'pointer',
                      fontSize: 13,
                      color: 'var(--ink)',
                    }}
                  >
                    <Icon name="Play" size={14} />
                    {lang === 'ar' ? 'فيديو' : 'Vidéo'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Identity */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                {lang === 'ar' ? 'معلوماتك' : 'Vos informations'}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>
                {lang === 'ar' ? 'لن يتم نشر بريدك الإلكتروني' : 'Votre email ne sera pas publié'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
                    {lang === 'ar' ? 'الاسم' : 'Nom'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={lang === 'ar' ? 'اسمك' : 'Votre nom'}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--line)', borderRadius: 10, fontSize: 14, color: 'var(--ink)', background: 'rgba(238,241,247,0.5)', fontFamily: 'inherit', outline: 'none' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--line)'; }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={lang === 'ar' ? 'بريدك الإلكتروني' : 'Votre email'}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--line)', borderRadius: 10, fontSize: 14, color: 'var(--ink)', background: 'rgba(238,241,247,0.5)', fontFamily: 'inherit', outline: 'none' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--line)'; }}
                  />
                </div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    cursor: 'pointer',
                    padding: '12px 16px',
                    background: 'rgba(238,241,247,0.5)',
                    borderRadius: 10,
                    border: '1px solid var(--line)',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={e => setConfirmed(e.target.checked)}
                    style={{ marginTop: 2, accentColor: 'var(--accent)', width: 16, height: 16, flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
                    {lang === 'ar'
                      ? 'أؤكد أن هذه المراجعة مبنية على تجربة حقيقية وشخصية مع هذه العلامة التجارية'
                      : 'Je certifie que cet avis est basé sur ma propre expérience réelle avec cette marque'}
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ marginBottom: 24 }}>
                <svg width={80} height={80} viewBox="0 0 80 80" style={{ margin: '0 auto' }}>
                  <circle
                    cx="40" cy="40" r="36"
                    fill="none"
                    stroke="var(--trust)"
                    strokeWidth="4"
                    className="circle-draw"
                  />
                  <polyline
                    points="24,42 35,53 56,30"
                    fill="none"
                    stroke="var(--trust)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="check-draw"
                  />
                </svg>
              </div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
                {lang === 'ar' ? 'شكراً لك! 🎉' : 'Merci beaucoup ! 🎉'}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 32 }}>
                {lang === 'ar'
                  ? 'مراجعتك قيد المراجعة والتحقق. سيتم نشرها خلال 24 ساعة بعد التأكد من صحتها.'
                  : 'Votre avis est en cours de vérification. Il sera publié dans les 24h après validation.'}
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  href={`/brands/${brand.id}`}
                  className="btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '12px 24px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    fontSize: 14,
                  }}
                >
                  <Icon name="ArrowLeft" size={16} />
                  {lang === 'ar' ? 'العودة إلى الصفحة' : 'Retour au profil'}
                </Link>
                <Link
                  href="/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '12px 24px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    fontSize: 14,
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                  }}
                >
                  {lang === 'ar' ? 'اكتشف علامات أخرى' : 'Découvrir d\'autres marques'}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step < 5 && (
          <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'space-between' }}>
            {step > 1 ? (
              <button
                onClick={handleBack}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '12px 20px',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.72)',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: 'var(--ink)',
                }}
              >
                <Icon name="ArrowLeft" size={16} />
                {lang === 'ar' ? 'السابق' : 'Précédent'}
              </button>
            ) : <div />}
            <button
              onClick={handleNext}
              disabled={!canNext()}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '12px 24px',
                borderRadius: 12,
                fontSize: 14,
                opacity: canNext() ? 1 : 0.5,
                cursor: canNext() ? 'pointer' : 'not-allowed',
              }}
            >
              {step === 4
                ? (lang === 'ar' ? 'إرسال المراجعة' : 'Envoyer l\'avis')
                : (lang === 'ar' ? 'التالي' : 'Suivant')}
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
