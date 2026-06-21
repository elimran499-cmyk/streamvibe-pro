import { useState } from 'react';
import { Tv, Search, User, CreditCard, Play, Grid2X2, ShieldCheck, Wifi } from 'lucide-react';

interface HeaderProps {
  activeTab: 'catalog' | 'dashboard' | 'pricing' | 'guide';
  setActiveTab: (tab: 'catalog' | 'dashboard' | 'pricing' | 'guide') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAddPlaylist: () => void;
  subscriptionCount: number;
}

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenAddPlaylist,
  subscriptionCount
}: HeaderProps) {
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-4 py-3 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* LOGO */}
        <div 
          onClick={() => setActiveTab('catalog')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="hdr-logo"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Tv className="w-5.5 h-5.5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950 pulse-led" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-1.5 leading-none">
              AURA<span className="text-cyan-400 text-[10px] font-mono tracking-widest bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-800/40">IPTV</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-sans tracking-wide">ULTRA STREAMING SYSTEMS</p>
          </div>
        </div>

        {/* SEARCH BAR (Only visible on Catalog mode) */}
        <div className="hidden md:flex relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search channels, VOD films or series series..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'catalog') setActiveTab('catalog');
            }}
            className="w-full text-slate-200 placeholder-slate-500 bg-slate-900/60 border border-slate-800 focus:border-cyan-500/50 rounded-xl py-2 pl-10 pr-4 text-xs font-sans outline-none focus:ring-2 focus:ring-cyan-500/10 transition-all"
            id="hdr-search-input"
          />
        </div>

        {/* NAVIGATION MENUS */}
        <nav className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'catalog' 
                ? 'bg-slate-900 text-white border border-slate-800/80 shadow-inner' 
                : 'text-slate-400 hover:text-white'
            }`}
            id="nav-catalog"
          >
            Browse Shows
          </button>
          
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'pricing' 
                ? 'bg-slate-900 text-white border border-slate-800/80 shadow-inner' 
                : 'text-slate-400 hover:text-white'
            }`}
            id="nav-plans"
          >
            Pricing & Plans
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'guide' 
                ? 'bg-slate-900 text-white border border-slate-800/80 shadow-inner' 
                : 'text-slate-400 hover:text-white'
            }`}
            id="nav-setup"
          >
            Setup Guide
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1.5 hidden sm:block" />

          {/* DASHBOARD TOGGLE */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900/60 text-slate-300 hover:text-white border border-slate-800'
            }`}
            id="nav-dashboard"
          >
            <Grid2X2 className="w-3.5 h-3.5" />
            <span>Dashboard</span>
            {subscriptionCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-[9px] font-bold text-slate-950 ring-2 ring-slate-950">
                {subscriptionCount}
              </span>
            )}
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1.5 hidden sm:block" />

          {/* DYNAMIC PROFILE */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center gap-1.5 p-1 rounded-full bg-slate-900 hover:bg-slate-850 cursor-pointer border border-slate-800 transition-colors"
              id="hdr-profile-btn"
            >
              <div className="w-7 h-7 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 flex items-center justify-center text-xs font-bold font-display">
                EM
              </div>
            </button>

            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-950 border border-slate-800 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1.5 border-b border-slate-900">
                  <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Client Account</p>
                  <p className="text-xs font-semibold text-slate-200">elimran499@gmail.com</p>
                </div>
                <div className="py-2 space-y-1">
                  <button 
                    onClick={() => { setActiveTab('dashboard'); setProfileDropdown(false); }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                  >
                    <Grid2X2 className="w-3.5 h-3.5 text-cyan-400" />
                    Subscription Active codes
                  </button>
                  <button 
                    onClick={() => { setActiveTab('pricing'); setProfileDropdown(false); }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                    Secure Billing
                  </button>
                  <button 
                    onClick={() => { onOpenAddPlaylist(); setProfileDropdown(false); }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    Load IPTV playlist
                  </button>
                </div>
                <div className="border-t border-slate-900 mt-1 pt-2 px-2.5 pb-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1"><Wifi className="w-2.5 h-2.5 text-emerald-500 animate-pulse" /> Live server</span>
                  <span>v2.4.9</span>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
