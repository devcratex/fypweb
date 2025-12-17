'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Playfair_Display, Montserrat, Great_Vibes } from 'next/font/google';

// English Fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: '700',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '800',
});
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
});

export default function ImageEditor() {
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [text, setText] = useState('Please Enter the Text');
  const [subtext, setSubtext] = useState('Enter sub headings');
  const [romanText, setRomanText] = useState('');
  const [romanSubtext, setRomanSubtext] = useState('');
  const [language, setLanguage] = useState<'english' | 'urdu'>('english');
  const [fontFamily, setFontFamily] = useState('Montserrat');
  const [textSize, setTextSize] = useState(36);
  const [textColor] = useState('#ffffff');
  const [textShadow, setTextShadow] = useState(true);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [aspectRatio, setAspectRatio] = useState<'4/5' | '1/1' | '9/16' | '16/9' | '4/3'>('4/5');

  // Background transform state
  const [bgPosition, setBgPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [bgScale, setBgScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef<{ x: number; y: number; scale: number }>({ x: 0, y: 0, scale: 1 });

  const previewRef = useRef<HTMLDivElement>(null);
  const prevRatioRef = useRef(aspectRatio);

  // Transliterate function using Google Input Tools
  const transliterate = async (input: string, targetStateSetter: (val: string) => void) => {
    if (!input.trim()) {
      targetStateSetter('');
      return;
    }
    try {
      const response = await fetch(
        `https://inputtools.google.com/request?text=${encodeURIComponent(input)}&ime=transliteration_en_ur&num=1&cp=0&cs=0&ie=utf-8&oe=utf-8`
      );
      const data = await response.json();
      if (data[0] === 'SUCCESS' && data[1]?.[0]?.[1]?.[0]) {
        targetStateSetter(data[1][0][1][0]);
      } else {
        targetStateSetter(input);
      }
    } catch (err) {
      targetStateSetter(input);
    }
  };

  // Debounced transliteration
  useEffect(() => {
    if (language !== 'urdu') return;
    const timeout = setTimeout(() => {
      transliterate(romanText, setText);
    }, 300);
    return () => clearTimeout(timeout);
  }, [romanText, language]);

  useEffect(() => {
    if (language !== 'urdu') return;
    const timeout = setTimeout(() => {
      transliterate(romanSubtext, setSubtext);
    }, 300);
    return () => clearTimeout(timeout);
  }, [romanSubtext, language]);

  // Preserve visible area when aspect ratio changes
  useEffect(() => {
    if (!backgroundUrl || !previewRef.current || prevRatioRef.current === aspectRatio) return;

    const container = previewRef.current;
    const prevWidth = container.offsetWidth;
    const prevHeight = container.offsetHeight;

    // Trigger reflow to get new dimensions
    void container.offsetWidth;

    const newWidth = container.offsetWidth;
    const newHeight = container.offsetHeight;

    if (prevWidth === 0 || newWidth === 0) return;

    const scaleX = prevWidth / newWidth;
    const scaleY = prevHeight / newHeight;
    const scaleFactor = Math.max(scaleX, scaleY); // Avoid empty space

    const newScale = bgScale * scaleFactor;

    // Adjust position to keep center aligned
    const offsetX = (newWidth - prevWidth * newScale) / 2;
    const offsetY = (newHeight - prevHeight * newScale) / 2;

    setBgScale(newScale);
    setBgPosition({
      x: bgPosition.x * scaleX + offsetX,
      y: bgPosition.y * scaleY + offsetY,
    });

    prevRatioRef.current = aspectRatio;
  }, [aspectRatio, backgroundUrl, bgScale, bgPosition]);

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setBackgroundUrl(URL.createObjectURL(e.target.files[0]));
      // Reset transform on new image
      setBgPosition({ x: 0, y: 0 });
      setBgScale(1);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setLogoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;
    const html2canvas = (await import('html2canvas-pro')).default;
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
    const link = document.createElement('a');
    link.download = `news-preview-${aspectRatio.replace('/', 'x')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const getFontClass = () => {
    if (language === 'english') {
      switch (fontFamily) {
        case 'Playfair':
          return playfair.className;
        case 'Great Vibes':
          return greatVibes.className;
        default:
          return montserrat.className;
      }
    }
    return '';
  };

  const getFontStyle = () => {
    if (language === 'urdu') {
      switch (fontFamily) {
        case 'Noto Nastaliq Urdu':
          return { fontFamily: "'Noto Nastaliq Urdu', serif" };
        case 'Gulzar':
          return { fontFamily: "'Gulzar', serif" };
        default:
          return { fontFamily: "'Noto Nastaliq Urdu', serif" };
      }
    }
    return {};
  };

  const getPreviewClass = () => {
    switch (aspectRatio) {
      case '1/1':
        return 'aspect-square w-full max-w-md';
      case '9/16':
        return 'aspect-[9/16] w-full max-w-xs';
      case '16/9':
        return 'aspect-[16/9] w-full max-w-3xl';
      case '4/3':
        return 'aspect-[4/3] w-full max-w-2xl';
      case '4/5':
      default:
        return 'aspect-[4/5] w-full max-w-md';
    }
  };

  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!backgroundUrl) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    dragStartPos.current = { x: clientX - bgPosition.x, y: clientY - bgPosition.y, scale: bgScale };
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const newX = clientX - dragStartPos.current.x;
    const newY = clientY - dragStartPos.current.y;

    setBgPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const resetBackground = () => {
    setBgPosition({ x: 0, y: 0 });
    setBgScale(1);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@700&family=Gulzar&display=swap');
      `}</style>
      <div className="min-h-screen py-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10 text-black">
            News Image Preview Generator
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white text-black">
            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <h2 className="text-2xl font-semibold">Editor Controls</h2>

              {/* Language Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => {
                    const newLang = e.target.value as 'english' | 'urdu';
                    setLanguage(newLang);
                    setFontFamily(newLang === 'english' ? 'Montserrat' : 'Noto Nastaliq Urdu');
                    if (newLang === 'english') {
                      setText('Please Enter the Text');
                      setSubtext('Enter sub headings');
                      setRomanText('');
                      setRomanSubtext('');
                    } else {
                      setRomanText('');
                      setRomanSubtext('');
                      setText('');
                      setSubtext('');
                    }
                  }}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="english">English</option>
                  <option value="urdu">Urdu (اردو)</option>
                </select>
              </div>

              {/* Aspect Ratio Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Image Ratio</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as any)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="4/5">4:5 (Portrait - Recommended for News)</option>
                  <option value="1/1">1:1 (Square - Instagram/Facebook Post)</option>
                  <option value="9/16">9:16 (Stories / Reels / TikTok / Shorts)</option>
                  <option value="16/9">16:9 (Landscape - YouTube / Banner)</option>
                  <option value="4/3">4:3 (Classic Photo Ratio)</option>
                </select>
                <p className="text-xs text-gray-600 mt-2">
                  {aspectRatio === '4/5' && 'Best for most news thumbnails and profiles'}
                  {aspectRatio === '1/1' && 'Perfect for square social media posts'}
                  {aspectRatio === '9/16' && 'Ideal for vertical video platforms & stories'}
                  {aspectRatio === '16/9' && 'Great for wide banners and covers'}
                  {aspectRatio === '4/3' && 'Traditional and balanced format'}
                </p>
              </div>

              {/* Background & Logo */}
              <div>
                <label className="block text-sm font-medium mb-2">Background Image</label>
                <input type="file" accept="image/*" onChange={handleBackgroundChange} className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-black file:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Logo</label>
                <input type="file" accept="image/*" onChange={handleLogoChange} className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-black file:text-white" />
              </div>

              {/* Zoom Controls */}
              {backgroundUrl && (
                <div>
                  <label className="block text-sm font-medium mb-2">Background Zoom</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setBgScale(Math.max(0.5, bgScale - 0.1))}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-16 text-center">
                      {(bgScale * 100).toFixed(0)}%
                    </span>
                    <button
                      onClick={() => setBgScale(bgScale + 0.1)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={resetBackground}
                      className="ml-auto text-xs px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Reset Zoom & Position
                    </button>
                  </div>
                </div>
              )}

              {/* Main Headline Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Main Headline</label>
                {language === 'urdu' ? (
                  <input
                    type="text"
                    value={romanText}
                    onChange={(e) => setRomanText(e.target.value)}
                    placeholder="Roman Urdu mein type karen (e.g. Pakistan ne jeet haasil ki)"
                    className="w-full px-4 py-2 border rounded-lg"
                    dir="ltr"
                  />
                ) : (
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter headline"
                    className="w-full px-4 py-2 border rounded-lg"
                    dir="ltr"
                  />
                )}
                {language === 'urdu' && (
                  <p className="text-xs text-green-600 mt-2">
                    Auto-converted: <strong dir="rtl">{text || 'خالی'}</strong>
                  </p>
                )}
              </div>

              {/* Subtext Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Subtext (Highlight Box)</label>
                {language === 'urdu' ? (
                  <input
                    type="text"
                    value={romanSubtext}
                    onChange={(e) => setRomanSubtext(e.target.value)}
                    placeholder="Roman mein type karen (e.g. Index 171,000 tak)"
                    className="w-full px-4 py-2 border rounded-lg"
                    dir="ltr"
                  />
                ) : (
                  <input
                    type="text"
                    value={subtext}
                    onChange={(e) => setSubtext(e.target.value)}
                    placeholder="Enter subtext"
                    className="w-full px-4 py-2 border rounded-lg"
                    dir="ltr"
                  />
                )}
                {language === 'urdu' && romanSubtext && (
                  <p className="text-xs text-green-600 mt-2">
                    Auto-converted: <strong dir="rtl">{subtext}</strong>
                  </p>
                )}
              </div>

              {/* Font, Size, Line Height, Shadow */}
              <div>
                <label className="block text-sm font-medium mb-2">Font (for Headline)</label>
                <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                  {language === 'english' ? (
                    <>
                      <option value="Montserrat">Montserrat (News)</option>
                      <option value="Playfair">Playfair Display (Elegant)</option>
                      <option value="Great Vibes">Great Vibes (Script)</option>
                    </>
                  ) : (
                    <>
                      <option value="Noto Nastaliq Urdu">Noto Nastaliq Urdu (Standard)</option>
                      <option value="Gulzar">Gulzar (Decorative Nastaliq)</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Headline Size: {textSize}px</label>
                <input
                  type="range"
                  min={24}
                  max={language === 'urdu' ? 80 : 60}
                  value={textSize}
                  onChange={(e) => setTextSize(+e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Line Spacing: {lineHeight.toFixed(2)}
                </label>
                <input
                  type="range"
                  min={0.9}
                  max={3}
                  step={0.05}
                  value={lineHeight}
                  onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Lower = tighter lines • Higher = more spaced out
                </p>
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" checked={textShadow} onChange={(e) => setTextShadow(e.target.checked)} />
                Text Shadow (Recommended)
              </label>

              <button
                onClick={downloadImage}
                disabled={!backgroundUrl}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
              >
                Download Image ({aspectRatio.replace('/', ':')})
              </button>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
              <div
                ref={previewRef}
                className={`relative ${getPreviewClass()} mx-auto rounded-xl overflow-hidden shadow-2xl`}
                dir={language === 'urdu' ? 'rtl' : 'ltr'}
              >
                {backgroundUrl ? (
                  <>
                    {/* Draggable Background */}
                    <div
                      className="absolute inset-0 cursor-move select-none"
                      onMouseDown={handleMouseDown}
                      onTouchStart={handleMouseDown}
                    >
                      <Image
                        src={backgroundUrl}
                        alt="background"
                        fill
                        className="object-contain pointer-events-none"
                        style={{
                          transform: `translate(${bgPosition.x}px, ${bgPosition.y}px) scale(${bgScale})`,
                          transformOrigin: 'center center',
                          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                        }}
                        crossOrigin="anonymous"
                      />
                    </div>

                    
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <p className="text-gray-600">Upload Background Image</p>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 pointer-events-none" />

                {/* Logo */}
                {logoUrl && (
                  <div className="absolute top-5 left-5 bg-white/70 px-3 py-2 rounded-lg flex items-center gap-2 z-10">
                    <Image src={logoUrl} alt="logo" width={40} height={40} className="rounded" />
                  </div>
                )}

                {/* Text Overlay */}
                <div className="absolute bottom-10 px-6 space-y-4 w-full pointer-events-none">
                  <div
  className={`${getFontClass()} font-extrabold`}
  style={{
    fontSize: `${textSize}px`,
    lineHeight: lineHeight,
    textShadow: textShadow ? '3px 3px 8px rgba(0,0,0,0.9)' : 'none',
    textAlign: language === 'urdu' ? 'right' : 'left',
    ...getFontStyle(),
  }}
>
  {text
    ? text.split(/\s+/).map((word, index) => (
        <span
          key={index}
          className={index % 3 === 2 ? 'text-yellow-400' : 'text-white'}
          style={{ display: 'inline-block' }} // Ensures spacing is preserved
        >
          {word}
          {index < text.split(/\s+/).length - 1 && '\u00A0'} {/* Non-breaking space */}
        </span>
      ))
    : (language === 'urdu' ? 'سرخی یہاں' : 'Enter headline here')}
</div>
                  <div className="inline-block bg-yellow-400 text-black px-5 py-3 rounded-md text-xl font-extrabold shadow-lg">
                    {subtext || (language === 'urdu' ? 'ذیلی متن' : 'Subtext here')}
                  </div>
                 {backgroundUrl && (
                <div className="mt-2">
                  <div className="flex flex-wrap justify-center gap-3">
                   
                    {/* WhatsApp */}
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                      </svg>
                   

                    {/* Facebook */}
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    

                    {/* X (Twitter) */}
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.222 17.532h2.078L9.28 5.46H6.945l10.077 14.322z"/>
                      </svg>

                    {/* Instagram */}
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.071 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                     

                    {/* Telegram */}
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18.31-.411.646-.622.938-.222.293-.47.591-.894.928-.426.338-.881.686-1.439.983-.557.297-1.212.581-1.882.748-.67.167-1.356.276-2.04.331-.685.056-1.368.03-2.04-.064-.67-.094-1.328-.258-1.952-.514a7.5 7.5 0 0 1-.98-.314c-.33-.13-.656-.292-.966-.466-.31-.175-.595-.368-.86-.544-.264-.176-.52-.352-.77-.51-.25-.159-.493-.318-.715-.467a10.5 10.5 0 0 1-.696-.358c-.23-.12-.45-.24-.67-.36-.22-.12-.435-.24-.65-.36-.215-.12-.425-.24-.63-.36l-.013-.003c-.2-.1-.39-.2-.57-.3-.18-.1-.35-.2-.52-.3-.17-.1-.33-.2-.49-.3-.16-.1-.31-.2-.46-.3-.15-.1-.3-.2-.45-.3-.14-.1-.27-.2-.41-.3-.13-.1-.26-.2-.39-.3-.12-.1-.23-.2-.35-.3-.11-.1-.22-.2-.33-.3-.1-.1-.2-.2-.3-.3-.09-.1-.18-.2-.27-.3-.09-.1-.17-.2-.26-.3-.08-.1-.16-.2-.25-.3-.07-.1-.14-.2-.22-.3-.07-.1-.14-.2-.21-.3-.07-.1-.13-.2-.2-.3-.06-.1-.12-.2-.19-.3-.06-.1-.12-.2-.18-.3-.06-.1-.11-.2-.17-.3-.05-.1-.1-.2-.16-.3-.05-.1-.1-.2-.15-.3-.04-.1-.08-.2-.13-.3-.04-.1-.08-.2-.12-.3-.04-.1-.07-.2-.11-.3-.03-.1-.06-.2-.1-.3-.03-.1-.05-.2-.09-.3-.02-.1-.04-.2-.08-.3-.02-.1-.04-.2-.07-.3-.02-.1-.03-.2-.06-.3-.01-.1-.03-.2-.05-.3-.01-.1-.02-.2-.04-.3z"/>
                      </svg>

                    {/* TikTok */}
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                        <path d="M19.69 7.491a5.712 5.712 0 0 1-3.332-1.063c-.314 0-.623.027-.925.08v4.59c-.302-.053-.611-.08-.925-.08-2.592 0-4.692 2.1-4.692 4.692 0 .314.027.623.08.925-.053.302-.08.611-.08.925 0 2.592 2.1 4.692 4.692 4.692 2.592 0 4.692-2.1 4.692-4.692v-5.872a8.633 8.633 0 0 0 4.692-1.55v-3.07a5.712 5.712 0 0 1-4.202.42z"/>
                      </svg>
                    
                  

                    {/* YouTube */}
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                     
                  </div>

                </div>
              )}
                </div>
                
              
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                Ratio: {aspectRatio.replace('/', ':')} • Downloaded as news-preview-{aspectRatio.replace('/', 'x')}.png
              </p>
           {/* Social Media Share Buttons */}
           
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}