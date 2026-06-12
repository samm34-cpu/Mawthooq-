'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Monogram } from '@/components/ui/Monogram';
import { Icon } from '@/components/ui/Icon';
import { useLanguage } from '@/contexts/LanguageContext';
import { CATEGORIES } from '@/lib/data';
import { t } from '@/lib/translations';

const TOTAL_STEPS = 3;

export function SignupFlow() {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  // Step 1
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  // Step 2
  const [nameAr, setNameAr] = useState('');
  const [nameFr, setNameFr] = useState('');
  const [cat, setCat] = useState('');
  const [website, setWebsite] = useState('');
  const [descAr, setDescAr] = useState('');
  const [descFr, setDescFr] = useState('');
  const [logoOver, setLogoOver] = useState(false);

  const canNext = () => {
    if (step === 1) return email.includes('@') && password.length >= 8 && password === confirm;
    if (step === 2) return nameAr.trim() && nameFr.trim() && cat;
    return true;
  };

  const handleNext = () => {
    if (canNext() && step < TOTAL_STEPS) setStep(s => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid var(--line)',
    borderRadius: 10,
    fontSize: 14,
    color: 'var(--ink)',
    background: 'rgba(238,241,247,0.5)',
    fontFamily: 'inherit',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--ink)',
    marginBottom: 6,
  };

  const mockBrand = {
    mono: nameAr ? nameAr[0] : '?',
    ar: nameAr || 'علامتك',
    fr: nameFr || 'Votre marque',
    color: '#3D82DE',
    ink: '#fff',
    tag_ar: descAr || 'وصف علامتك التجارية',
    tag_fr: descFr || 'Description de votre marque',
  };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.02em' }}>
            {t('BRAND_SIGNUP_TITLE', lang)}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--muted)' }}>
            {lang === 'ar'
              ? 'انضم إلى أكثر من ١٢٠٠ علامة تجارية مغربية موثوقة'
              : 'Rejoignez plus de 1200 marques marocaines de confiance'}
          </p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            {[1, 2, 3].map(s => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 5,
                  borderRadius: 3,
                  background: s <= step ? 'var(--accent)' : 'var(--star-empty)',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)' }}>
            <span style={{ color: step >= 1 ? 'var(--accent)' : undefined }}>
              {lang === 'ar' ? 'الحساب' : 'Compte'}
            </span>
            <span style={{ color: step >= 2 ? 'var(--accent)' : undefined }}>
              {lang === 'ar' ? 'الملف التجاري' : 'Profil marque'}
            </span>
            <span style={{ color: step >= 3 ? 'var(--accent)' : undefined }}>
              {lang === 'ar' ? 'النجاح' : 'Succès'}
            </span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: 32 }}>
          {/* Step 1: Account info */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 24 }}>
                {lang === 'ar' ? 'معلومات الحساب' : 'Informations du compte'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={lang === 'ar' ? 'business@example.ma' : 'business@example.ma'}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(61,130,222,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--line)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    {lang === 'ar' ? 'كلمة المرور' : 'Mot de passe'}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={lang === 'ar' ? '٨ أحرف على الأقل' : '8 caractères minimum'}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(61,130,222,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--line)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    {lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirmer le mot de passe'}
                  </label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder={lang === 'ar' ? 'أعد كتابة كلمة المرور' : 'Répétez le mot de passe'}
                    style={{
                      ...inputStyle,
                      borderColor: confirm && confirm !== password ? '#E07000' : 'var(--line)',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(61,130,222,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = confirm && confirm !== password ? '#E07000' : 'var(--line)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {confirm && confirm !== password && (
                    <p style={{ fontSize: 12, color: '#E07000', marginTop: 4 }}>
                      {lang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Les mots de passe ne correspondent pas'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Brand profile */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 24 }}>
                {lang === 'ar' ? 'ملف علامتك التجارية' : 'Profil de votre marque'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={labelStyle}>
                      {lang === 'ar' ? 'اسم العلامة (عربي)' : 'Nom de la marque (AR)'}
                    </label>
                    <input
                      type="text"
                      value={nameAr}
                      onChange={e => setNameAr(e.target.value)}
                      placeholder="مثال: جوميا"
                      style={inputStyle}
                      dir="rtl"
                      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--line)'; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>
                      {lang === 'ar' ? 'اسم العلامة (فرنسي)' : 'Nom de la marque (FR)'}
                    </label>
                    <input
                      type="text"
                      value={nameFr}
                      onChange={e => setNameFr(e.target.value)}
                      placeholder="Ex: Jumia Maroc"
                      style={inputStyle}
                      dir="ltr"
                      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--line)'; }}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>
                    {lang === 'ar' ? 'القطاع' : 'Catégorie'}
                  </label>
                  <select
                    value={cat}
                    onChange={e => setCat(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--line)'; }}
                  >
                    <option value="">{lang === 'ar' ? 'اختر قطاعاً...' : 'Choisir une catégorie...'}</option>
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>
                        {lang === 'ar' ? c.ar : c.fr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>
                    {lang === 'ar' ? 'الموقع الإلكتروني' : 'Site web'}
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    placeholder="https://www.example.ma"
                    style={inputStyle}
                    dir="ltr"
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--line)'; }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    {lang === 'ar' ? 'وصف (عربي)' : 'Description (AR)'}
                  </label>
                  <textarea
                    value={descAr}
                    onChange={e => setDescAr(e.target.value)}
                    placeholder={lang === 'ar' ? 'اكتب وصفاً لعلامتك بالعربية...' : 'Décrivez votre marque en arabe...'}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                    dir="rtl"
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--line)'; }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    {lang === 'ar' ? 'وصف (فرنسي)' : 'Description (FR)'}
                  </label>
                  <textarea
                    value={descFr}
                    onChange={e => setDescFr(e.target.value)}
                    placeholder={lang === 'ar' ? 'اكتب وصفاً لعلامتك بالفرنسية...' : 'Décrivez votre marque en français...'}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                    dir="ltr"
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--line)'; }}
                  />
                </div>

                {/* Logo upload */}
                <div>
                  <label style={labelStyle}>
                    {lang === 'ar' ? 'شعار العلامة' : 'Logo de la marque'}
                  </label>
                  <div
                    onDragOver={e => { e.preventDefault(); setLogoOver(true); }}
                    onDragLeave={() => setLogoOver(false)}
                    onDrop={e => { e.preventDefault(); setLogoOver(false); }}
                    style={{
                      border: `2px dashed ${logoOver ? 'var(--accent)' : 'var(--line)'}`,
                      borderRadius: 12,
                      padding: '24px',
                      textAlign: 'center',
                      background: logoOver ? 'rgba(61,130,222,0.05)' : 'rgba(238,241,247,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon name="Upload" size={28} className="mx-auto mb-2" style={{ color: 'var(--muted)', display: 'block', marginBottom: 8 }} />
                    <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                      {lang === 'ar' ? 'اسحب الشعار هنا أو انقر للاختيار' : 'Glissez le logo ou cliquez pour choisir'}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 4 }}>PNG, JPG, SVG</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: 24 }}>
                <svg width={72} height={72} viewBox="0 0 80 80" style={{ margin: '0 auto' }}>
                  <circle cx="40" cy="40" r="36" fill="none" stroke="var(--trust)" strokeWidth="4" className="circle-draw" />
                  <polyline points="24,42 35,53 56,30" fill="none" stroke="var(--trust)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="check-draw" />
                </svg>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>
                {lang === 'ar' ? 'تم إنشاء حسابك!' : 'Votre compte est créé !'}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>
                {lang === 'ar'
                  ? 'ملفك التجاري قيد المراجعة. سيتم إخطارك عبر البريد الإلكتروني بعد الموافقة خلال ٤٨ ساعة.'
                  : 'Votre profil marque est en cours de révision. Vous serez notifié par email après approbation sous 48h.'}
              </p>

              {/* Preview card */}
              <div
                style={{
                  background: 'rgba(238,241,247,0.8)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  padding: 20,
                  marginBottom: 28,
                  textAlign: 'start',
                }}
              >
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
                  {lang === 'ar' ? 'معاينة ملفك التجاري' : 'Aperçu de votre profil'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Monogram letter={mockBrand.mono} color={mockBrand.color} ink={mockBrand.ink} size={48} radius={12} />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
                      {lang === 'ar' ? mockBrand.ar : mockBrand.fr}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                      {lang === 'ar' ? mockBrand.tag_ar : mockBrand.tag_fr}
                    </div>
                    <div style={{ marginTop: 4, fontSize: 12, color: 'var(--muted-2)' }}>
                      {lang === 'ar' ? 'لا توجد مراجعات بعد' : 'Aucun avis encore'}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link
                  href="/dashboard"
                  className="btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '12px 24px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    fontSize: 14,
                  }}
                >
                  <Icon name="LayoutGrid" size={16} />
                  {t('DASHBOARD_TITLE', lang)}
                </Link>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '12px 24px',
                    borderRadius: 12,
                    fontSize: 14,
                    border: '1px solid var(--line)',
                    background: 'rgba(255,255,255,0.72)',
                    cursor: 'pointer',
                    color: 'var(--ink)',
                  }}
                >
                  <Icon name="Share2" size={16} />
                  {lang === 'ar' ? 'احصل على رابط المراجعة' : 'Obtenir le lien d\'avis'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step < 3 && (
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
              {step === 2
                ? (lang === 'ar' ? 'إنشاء الحساب' : 'Créer le compte')
                : (lang === 'ar' ? 'متابعة' : 'Continuer')}
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
