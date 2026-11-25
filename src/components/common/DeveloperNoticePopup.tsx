import React, { useEffect } from 'react';
import { Lock, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '01884267928';
const WHATSAPP_URL = 'https://wa.me/8801884267928';

export function DeveloperNoticePopup() {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="developer-lock-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/55 px-4 py-6 backdrop-blur-md"
    >
      <div className="w-full max-w-[360px] sm:max-w-[390px] rounded-[26px] border border-rose-100 bg-white px-5 py-6 sm:px-6 sm:py-7 text-center shadow-[0_24px_60px_-12px_rgba(15,23,42,0.38)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
          <Lock className="h-6 w-6" strokeWidth={2.2} aria-hidden="true" />
        </div>

        <h2
          id="developer-lock-title"
          className="mt-4 text-[20px] sm:text-[21px] font-extrabold leading-snug tracking-tight text-slate-950"
        >
          অ্যাপটি সাময়িকভাবে বন্ধ করা হয়েছে!
        </h2>

        <div className="mt-4 rounded-2xl border border-rose-100 bg-[#FFF5F6] px-4 py-4">
          <p className="text-[13.5px] font-semibold leading-relaxed text-slate-900">
            Supartha Mondal আপনি ডেভেলপারের সঙ্গে প্রতারণা করে অ্যাপটি তৈরি করিয়ে নিয়েছেন, কিন্তু নির্ধারিত পেমেন্ট এখনো পরিশোধ করেননি। বারবার পেমেন্টের বিষয়টি জানানো সত্ত্বেও কোনো সমাধান না হওয়ায় বাধ্য হয়ে অ্যাপটি সাময়িকভাবে বন্ধ করা হয়েছে।
          </p>
          <p className="mt-3 text-[13.5px] font-bold leading-snug text-rose-600">
            বকেয়া পেমেন্ট পরিশোধ করা হলে অ্যাপটি পুনরায় চালু করা হবে।
          </p>
        </div>

        <p className="mt-4 text-[12px] font-medium text-slate-500">
          ডেভেলপারের সঙ্গে যোগাযোগ করুন (WhatsApp):
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0D9F58] px-4 text-[14px] font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-[#0B8B4C] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
          <span>{WHATSAPP_NUMBER}</span>
        </a>
      </div>
    </div>
  );
}
