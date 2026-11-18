import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { resolveBrandLogoUrl, resolveBrandName } from '../../config/app.config';
import { useApp } from '../../context/AppContext';
import { SHOWCASE_SLIDES, type ShowcaseTargetAction } from '../../data/showcaseSlides';

export function LandingShowcaseSlider() {
  const { systemSettings, openAuthModal, navigateProtected } = useApp();
  const brandName = resolveBrandName(systemSettings?.websiteName);
  const logoUrl = resolveBrandLogoUrl(systemSettings?.logo);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [brokenSlides, setBrokenSlides] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const totalSlides = SHOWCASE_SLIDES.length;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || totalSlides <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, totalSlides]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  const handleSlideAction = (action: ShowcaseTargetAction) => {
    if (action === 'services') {
      navigateProtected('services');
      return;
    }
    if (action === 'funds') {
      navigateProtected('funds');
      return;
    }
    if (action === 'api') {
      navigateProtected('api');
      return;
    }
    openAuthModal('register');
  };

  const currentSlide = SHOWCASE_SLIDES[activeIndex] ?? SHOWCASE_SLIDES[0];

  return (
    <section
      aria-label="Platform highlights showcase"
      className="py-6 sm:py-8 bg-[#F6F5FB]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Compact Header & Chapter Switcher */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 text-balance">
              Social Growth Highlights
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Showcase slides"
            className="flex items-center gap-1 overflow-x-auto rounded-xl border border-slate-200/90 bg-white p-1"
          >
            {SHOWCASE_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-8 rounded-lg px-3 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                >
                  {slide.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Widescreen Slider Frame */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative mt-4 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-slate-950 shadow-lg shadow-violet-950/10"
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {SHOWCASE_SLIDES.map((slide, idx) => {
              const isBroken = Boolean(brokenSlides[slide.id]);
              return (
                <div
                  key={slide.id}
                  className="relative h-[225px] sm:h-[250px] lg:h-[272px] w-full shrink-0 overflow-hidden"
                >
                  {isBroken ? (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${slide.fallbackGradient}`}
                    />
                  ) : (
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      referrerPolicy="no-referrer"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      onError={() =>
                        setBrokenSlides((prev) => ({ ...prev, [slide.id]: true }))
                      }
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  )}

                  {/* Measured Contrast Scrim */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-[#080414]/95 via-[#12082B]/80 to-[#080414]/20"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#080414]/70 via-transparent to-transparent"
                  />

                  {/* Compact Slide Content */}
                  <div className="relative z-10 flex h-full flex-col justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={logoUrl}
                          alt={brandName}
                          className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full object-cover bg-slate-950 ring-1 ring-sky-400/60"
                        />
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-300 truncate">
                          <span className="font-semibold text-amber-300">{brandName}</span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{slide.kicker}</span>
                        </div>
                      </div>

                      <span className="hidden sm:inline-block font-mono text-xs font-semibold text-slate-300 tabular-nums shrink-0">
                        {String(idx + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex items-end justify-between gap-6">
                      <div className="max-w-xl min-w-0">
                        <h3 className="line-clamp-2 font-display text-lg sm:text-2xl lg:text-[28px] font-extrabold tracking-tight text-white leading-tight text-balance">
                          {slide.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-200/90">
                          {slide.subtitle}
                        </p>

                        <div className="mt-3 sm:mt-4 flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleSlideAction(slide.targetAction)}
                            className="inline-flex h-9 sm:h-10 items-center gap-1.5 rounded-xl bg-amber-400 px-4 text-xs sm:text-sm font-bold text-slate-950 shadow-md transition-colors hover:bg-amber-300 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                          >
                            <span>{slide.ctaLabel}</span>
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="hidden lg:flex shrink-0 items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/65 px-4 py-2.5 backdrop-blur-md">
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1.5 text-[11px] font-medium text-slate-300">
                            <Layers className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                            <span>{slide.metricLabel}</span>
                          </div>
                          <p className="font-display text-2xl font-extrabold text-white tabular-nums leading-tight">
                            {slide.metricValue}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Controls Strip */}
                    <div className="flex items-center justify-between gap-4 pt-1">
                      <div className="flex items-center gap-1.5">
                        {SHOWCASE_SLIDES.map((item, dotIdx) => {
                          const isCurrent = dotIdx === activeIndex;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setActiveIndex(dotIdx)}
                              aria-label={`View slide ${dotIdx + 1}: ${item.tabLabel}`}
                              aria-current={isCurrent ? 'true' : undefined}
                              className={`h-1.5 rounded-full transition-all duration-200 ${
                                isCurrent
                                  ? 'w-7 bg-amber-400'
                                  : 'w-2 bg-white/35 hover:bg-white/65'
                              }`}
                            />
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="hidden md:inline text-[11px] font-medium text-slate-300 mr-1.5 truncate max-w-[180px]">
                          {currentSlide.kicker}
                        </span>
                        <button
                          type="button"
                          onClick={goPrev}
                          aria-label="Previous showcase slide"
                          className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={goNext}
                          aria-label="Next showcase slide"
                          className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
