import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import PaymentWizard from './components/PaymentWizard';
import PlaylistPortal from './components/PlaylistPortal';
import DeviceGuides from './components/DeviceGuides';
import { IPTV_PLANS, MEDIA_ITEMS, MOCK_IPTV_CHANNELS, MOCK_GENRES } from './data';
import { MediaItem, Plan, Subscription, PlaylistChannel, PaymentMethod } from './types';
import { 
  Play, 
  Tv, 
  HelpCircle, 
  Plus, 
  ShieldCheck, 
  Copy, 
  ExternalLink, 
  SlidersHorizontal,
  Flame, 
  Sparkles, 
  Wifi, 
  Check, 
  Bookmark, 
  Heart,
  Grid2X2,
  Trash2,
  Cpu,
  MonitorCheck
} from 'lucide-react';

export default function App() {
  // Navigation & Searches
  const [activeTab, setActiveTab] = useState<'catalog' | 'dashboard' | 'pricing' | 'guide'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  
  // Streaming Player State
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  // Lists & Persistence (via localStorage)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [channels, setChannels] = useState<PlaylistChannel[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedSubscriptionId, setCopiedSubscriptionId] = useState<string | null>(null);

  // Modals
  const [showPlaylistPortal, setShowPlaylistPortal] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);

  // Load initial simulated subscriptions and channels from localStorage
  useEffect(() => {
    const savedSubs = localStorage.getItem('aura_iptv_subs');
    const savedChannels = localStorage.getItem('aura_iptv_channels');
    const savedFavs = localStorage.getItem('aura_iptv_favs');

    if (savedSubs) {
      setSubscriptions(JSON.parse(savedSubs));
    } else {
      // Create initial starter active subscription
      const starterSub: Subscription = {
        id: 'sub-init-948',
        planId: 'starter',
        planName: 'Starter Demo Package',
        price: 29.99,
        periodMonths: 3,
        status: 'active',
        startDate: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString().split('T')[0], // 30 days ago
        nextBillingDate: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString().split('T')[0], // 60 days left
        paymentMethod: 'card',
        transactionId: 'TX-SECURE-938210-AURA',
        devicesConnected: 2,
        maxDevices: 2
      };
      setSubscriptions([starterSub]);
      localStorage.setItem('aura_iptv_subs', JSON.stringify([starterSub]));
    }

    if (savedChannels) {
      setChannels(JSON.parse(savedChannels));
    } else {
      const formatted: PlaylistChannel[] = MOCK_IPTV_CHANNELS.map(ch => ({
        id: ch.id,
        name: ch.name,
        logo: ch.logo,
        category: ch.category,
        streamUrl: ch.streamUrl,
        quality: ch.quality as '4K' | '1080p' | '720p',
        online: ch.online
      }));
      setChannels(formatted);
      localStorage.setItem('aura_iptv_channels', JSON.stringify(formatted));
    }

    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  // Sync favorites helper
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(fId => fId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('aura_iptv_favs', JSON.stringify(updated));
  };

  // Import playlist callback handler
  const handleImportPlaylistChannels = (newChannels: any[]) => {
    const formatted: PlaylistChannel[] = newChannels.map(ch => ({
      id: ch.id,
      name: ch.name,
      logo: ch.logo,
      category: ch.category,
      streamUrl: ch.streamUrl,
      quality: ch.quality,
      online: ch.online
    }));

    const merged = [...formatted, ...channels];
    setChannels(merged);
    localStorage.setItem('aura_iptv_channels', JSON.stringify(merged));
  };

  // Payment wizard success callback handler
  const handlePaymentSuccess = (method: PaymentMethod, durationMonths: number, finalPrice: number) => {
    const newSub: Subscription = {
      id: `sub-active-${Math.floor(1000 + Math.random() * 9000)}`,
      planId: checkoutPlan?.id || 'premium',
      planName: checkoutPlan?.name || 'Premium Stream Deal',
      price: finalPrice,
      periodMonths: durationMonths,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date(Date.now() + durationMonths * 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
      paymentMethod: method,
      transactionId: `TX-AURA-${Math.floor(100000 + Math.random() * 900000)}`,
      devicesConnected: 0,
      maxDevices: checkoutPlan?.id === 'pack2' ? 4 : 2
    };

    const updatedSubs = [newSub, ...subscriptions];
    setSubscriptions(updatedSubs);
    localStorage.setItem('aura_iptv_subs', JSON.stringify(updatedSubs));
    
    // Automatically switch to dashboard tab
    setActiveTab('dashboard');
  };

  // Delete subscription handler
  const handleDeleteSub = (id: string) => {
    if (confirm('Are you sure you want to terminate this subscription line code? Access to live streams will stop immediately.')) {
      const filtered = subscriptions.filter(s => s.id !== id);
      setSubscriptions(filtered);
      localStorage.setItem('aura_iptv_subs', JSON.stringify(filtered));
    }
  };

  // Filter media based on search query or selected genre
  const filteredMedia = MEDIA_ITEMS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === 'All' || item.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const featuredMedia = MEDIA_ITEMS.find(item => item.isFeatured) || MEDIA_ITEMS[0];

  // Copy streaming credentials helper
  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSubscriptionId(id);
    setTimeout(() => setCopiedSubscriptionId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* HEADER SECTION */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAddPlaylist={() => setShowPlaylistPortal(true)}
        subscriptionCount={subscriptions.length}
      />

      <main className="flex-1 py-6 px-4 lg:px-8 max-w-7xl w-full mx-auto space-y-8">

        {/* 1. TOP LIVE PLAYER SHELF (If active media selected) */}
        {activeMedia && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <VideoPlayer 
              media={activeMedia} 
              onClose={() => setActiveMedia(null)} 
            />
          </div>
        )}

        {/* 2. CATALOG BROWSER VIEW */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            
            {/* HEROBANNER HERO SECTION (Only when no query is filtered) */}
            {searchQuery === '' && selectedGenre === 'All' && !activeMedia && (
              <div 
                className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-900 group aspect-video md:aspect-[2.39/1] flex flex-col justify-end p-6 md:p-12 shadow-2xl"
                id="hero-banner"
              >
                {/* Backdrop visuals */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={featuredMedia.backdropUrl}
                    alt={featuredMedia.title}
                    className="w-full h-full object-cover opacity-35 group-hover:scale-102 transition-transform duration-[4000ms]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-transparent" />
                </div>

                {/* Hero information content */}
                <div className="relative z-10 max-w-xl space-y-3.5">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                      <Flame className="w-3 h-3 animate-pulse" /> FEATURED IMMERSIVE HDR
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Decoded in 4K UHD</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
                    {featuredMedia.title}
                  </h2>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-md font-sans">
                    {featuredMedia.description}
                  </p>

                  <div className="flex items-center gap-3.5 text-xs text-slate-400">
                    <span className="text-cyan-400 font-bold font-mono">★ {featuredMedia.score} / 10 Score</span>
                    <span>•</span>
                    <span>{featuredMedia.year}</span>
                    <span>•</span>
                    <span className="bg-slate-900 px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 font-semibold">{featuredMedia.rating}</span>
                    <span>•</span>
                    <span>{featuredMedia.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-1.5" id="hero-actions">
                    <button
                      onClick={() => setActiveMedia(featuredMedia)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-display font-bold text-xs tracking-wide shadow-lg shadow-indigo-500/10 cursor-pointer flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>STREAM IN 4K NOW</span>
                    </button>

                    <button
                      onClick={(e) => handleToggleFavorite(featuredMedia.id, e)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-semibold hover:text-white cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(featuredMedia.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{favorites.includes(featuredMedia.id) ? 'Bookmarked' : 'Add to My List'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* GENRE SEARCH BAR CONTROLS SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1.5 sm:pb-0" id="genre-pills">
                {MOCK_GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all shrink-0 ${
                      selectedGenre === genre
                        ? 'bg-cyan-500 text-slate-950 font-semibold shadow shadow-cyan-500/20'
                        : 'bg-slate-900/40 text-slate-400 hover:text-white border border-slate-850 hover:bg-slate-850'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span>Showing {filteredMedia.length} matching films & series</span>
              </div>
            </div>

            {/* FILMS & SERIES BROWSER GRID */}
            <div className="space-y-4">
              <h3 className="text-white font-display font-semibold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span>Recommended For You</span>
              </h3>

              {filteredMedia.length === 0 ? (
                <div className="text-center p-12 bg-slate-950/30 border border-slate-900 rounded-2xl">
                  <span className="text-3xl">🍿</span>
                  <h4 className="text-white font-display font-medium text-sm mt-3">No matching streaming titles found</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">Try refining your genre query filters or search letters inside the top navigation console.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4" id="movies-catalog-grid">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveMedia(item)}
                      className="group bg-slate-950 border border-slate-900 hover:border-cyan-500/30 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all flex flex-col justify-between"
                      id={`vod-card-${item.id}`}
                    >
                      <div className="relative aspect-[2/3] bg-slate-900">
                        {/* Stream image poster */}
                        <img
                          src={item.posterUrl}
                          alt={item.title}
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        {/* Overlay with subtle visual details */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
                        
                        {/* Score and rating badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                          <span className="bg-slate-950/80 backdrop-blur-md text-[9px] font-mono font-bold text-cyan-400 border border-cyan-800/40 px-1.5 py-0.5 rounded leading-none flex items-center gap-0.5">
                            ★ {item.score}
                          </span>
                          <span className="bg-slate-950/80 backdrop-blur-md text-[9px] font-mono text-slate-300 px-1.5 py-0.5 rounded leading-none w-max border border-white/5">
                            {item.rating}
                          </span>
                        </div>

                        {/* Favorite button icon */}
                        <button
                          onClick={(e) => handleToggleFavorite(item.id, e)}
                          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/5 flex items-center justify-center text-slate-400 hover:text-rose-500 cursor-pointer"
                          title="Favorite"
                        >
                          <Heart className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>

                        {/* Play hover trigger icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[1px]">
                          <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/20 scale-90 group-hover:scale-100 transition-transform">
                            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-3 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                          <span>{item.genre[0]} • {item.year}</span>
                          <span className="text-slate-400">{item.duration}</span>
                        </div>
                        <h4 className="text-xs font-semibold text-white tracking-tight group-hover:text-cyan-400 transition-colors truncate">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECURE COMPATIBILITY BANNER */}
            <div className="bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-slate-950 border border-slate-900 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] text-cyan-400 font-mono uppercase font-bold tracking-wider">
                  <MonitorCheck className="w-3.5 h-3.5" /> Fast Secure Provisioning System
                </div>
                <h4 className="text-white font-display font-semibold text-lg">Includes full live channels & cinema guides VOD!</h4>
                <p className="text-xs text-slate-400 max-w-xl">
                  Aura Streaming provides over 115,000 live channels worldwide and 120,000 VOD movies and series series. Fully encrypted codes with safe localized CDN servers prevent buffering.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('pricing')}
                  className="px-4.5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-xs cursor-pointer transition-colors"
                >
                  Get VIP Code
                </button>
                <button
                  onClick={() => setActiveTab('guide')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-850 text-xs font-semibold cursor-pointer transition-colors"
                >
                  App Setup steps
                </button>
              </div>
            </div>

          </div>
        )}

        {/* 3. DYNAMIC IP-TV SUBSCRIPTIONS USER DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest font-bold uppercase block">SECURE CONTROL HUB</span>
                <h2 className="text-white font-display font-bold text-2xl tracking-tight leading-normal">Your Active IPTV Streams</h2>
              </div>

              <div className="flex gap-2" id="dashboard-meta-actions">
                <button
                  onClick={() => setShowPlaylistPortal(true)}
                  className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-850 text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>Load Custom Playlist</span>
                </button>

                <button
                  onClick={() => setActiveTab('pricing')}
                  className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer transition-colors shadow shadow-cyan-500/10"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Order Another Connection Code</span>
                </button>
              </div>
            </div>

            {/* DASHBOARD STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5" id="dashboard-main-row">
              
              {/* CURRENT CODES / ACTIVE SUBSCRIPTIONS COLUMN */}
              <div className="md:col-span-8 space-y-4">
                <h3 className="text-xs text-slate-400 font-mono uppercase tracking-wide">Active IPTV Subscriptions</h3>

                {subscriptions.length === 0 ? (
                  <div className="p-8 text-center bg-slate-950 border border-slate-900 rounded-2xl space-y-3.5">
                    <span className="text-3xl block">🔑</span>
                    <div>
                      <h4 className="text-white font-semibold text-sm">No active IPTV connections found</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">Please select an IPTV package bundle from our pricing portal to instantly activate your high speed 4K credentials.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('pricing')}
                      className="px-4 py-2 border border-cyan-800/60 bg-cyan-950/20 text-cyan-400 hover:text-cyan-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Browse IPTV Packages
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4" id="subs-cards-list">
                    {subscriptions.map((sub) => (
                      <div 
                        key={sub.id} 
                        className="bg-slate-950 border border-slate-900 rounded-2xl p-5 md:p-6 shadow-xl space-y-4 hover:border-slate-850 transition-all relative overflow-hidden"
                      >
                        {/* Top banner info */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/5">
                              🔑
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-semibold text-white">{sub.planName}</h4>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-mono leading-none font-bold uppercase ${sub.status === 'active' ? 'bg-emerald-950/80 text-emerald-400' : 'bg-rose-950/80 text-rose-400'}`}>
                                  {sub.status}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-sans mt-0.5">Secure ID Line: {sub.id}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs font-mono">
                            <span className="text-slate-500">Transaction Ref:</span>
                            <span className="text-slate-300 truncate max-w-[150px]">{sub.transactionId}</span>
                          </div>
                        </div>

                        {/* Secure active streaming credentials details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/40 p-4 border border-slate-900 rounded-xl relative z-10" id="credentials-box">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-semibold font-mono tracking-wider">XTREAM CODES API ACCESS LINK</p>
                            <div className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-900 mt-1">
                              <span className="text-xs font-mono text-cyan-400 select-all font-semibold">http://aura-iptv.net:3000</span>
                              <button 
                                onClick={() => handleCopyCode('http://aura-iptv.net:3000', `${sub.id}-url`)} 
                                className="text-slate-400 hover:text-white shrink-0 cursor-pointer"
                              >
                                {copiedSubscriptionId === `${sub.id}-url` ? <span className="text-[9px] text-emerald-400 font-mono font-bold">Copied</span> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-semibold font-mono tracking-wider">CREDS USERNAME</p>
                            <div className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-900 mt-1">
                              <span className="text-xs font-mono text-white select-all">aura_user_{sub.id.split('-').pop()}</span>
                              <button 
                                onClick={() => handleCopyCode(`aura_user_${sub.id.split('-').pop()}`, `${sub.id}-user`)} 
                                className="text-slate-400 hover:text-white shrink-0 cursor-pointer"
                              >
                                {copiedSubscriptionId === `${sub.id}-user` ? <span className="text-[9px] text-emerald-400 font-mono">Copied</span> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Terms metrics row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs relative z-10">
                          <div>
                            <span className="text-slate-500 block">Pricing Plan:</span>
                            <span className="font-semibold text-white font-mono">€{sub.price} / {sub.periodMonths} Mo</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Devices:</span>
                            <span className="font-semibold text-slate-300 font-mono">{sub.devicesConnected} / {sub.maxDevices} Active</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Renew Date:</span>
                            <span className="font-semibold text-emerald-400 font-mono">{sub.nextBillingDate}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Payment Method:</span>
                            <span className="font-semibold text-white uppercase font-mono">{sub.paymentMethod}</span>
                          </div>
                        </div>

                        {/* Actions line */}
                        <div className="border-t border-slate-900 pt-3.5 flex items-center justify-between text-xs relative z-10">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>Auto-billing security link active</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                alert(`Simulated diagnostic command. System logs: IPTV streaming node is responding from server host http://aura-iptv.net:3000. Decrypt keys verified successfully.`);
                              }}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:text-white text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Line Diagnosis
                            </button>
                            <button
                              onClick={() => handleDeleteSub(sub.id)}
                              className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/40 rounded-lg cursor-pointer"
                              title="Delete sub code"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* STAT DIAGRAM & PLAYLIST SIDEBAR COLUMN */}
              <div className="md:col-span-4 space-y-6">
                
                {/* 1. DATA BANDWIDTH CAPACITY DIAGRAM */}
                <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 shadow-xl space-y-4">
                  <h4 className="text-xs text-slate-400 font-mono uppercase tracking-wide">Live Stream Bandwidth</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400 font-medium">Monthly streaming data used</span>
                      <span className="text-cyan-400 font-bold">394 GB / 1000 GB</span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full" style={{ width: '39.4%' }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1 text-center">
                    <div className="bg-slate-900/40 p-2 border border-slate-900 rounded-lg">
                      <span className="text-[10px] text-slate-500 font-mono block">LIVE CHANNELS DELAY</span>
                      <span className="text-xs font-bold font-mono text-emerald-400">~0.4s (Ultra Fast)</span>
                    </div>
                    <div className="bg-slate-900/40 p-2 border border-slate-900 rounded-lg">
                      <span className="text-[10px] text-slate-500 font-mono block">FPS REFRESH RATE</span>
                      <span className="text-xs font-bold font-mono text-white">60 FPS HDR</span>
                    </div>
                  </div>
                </div>

                {/* 2. CHANNELS PLAYLIST PREVIEW GRID */}
                <div className="bg-slate-950 border border-[#161a29] rounded-2xl p-5 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs text-white font-semibold font-display tracking-tight flex items-center gap-1.5">
                      <Tv className="w-4 h-4 text-cyan-400" /> Loaded TV Channels ({channels.length})
                    </h4>
                    <span className="text-[9px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded">ONLINE</span>
                  </div>

                  <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1" id="channels-list">
                    {channels.map((channel) => (
                      <div
                        key={channel.id}
                        onClick={() => {
                          // Wrap as media for player
                          const wrapped: MediaItem = {
                            id: channel.id,
                            title: channel.name,
                            type: 'live',
                            posterUrl: '',
                            backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200',
                            genre: ['Broadcasting Live', channel.category],
                            rating: 'PG-13',
                            score: 9.9,
                            duration: 'Live',
                            year: 2026,
                            description: `Live transmission decoding from secure server node. Stream channel quality ${channel.quality}. Anti-Buffer system working.`,
                            cast: [],
                            category: channel.category
                          };
                          setActiveMedia(wrapped);
                        }}
                        className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 border border-slate-900 hover:border-cyan-500/30 cursor-pointer transition-all hover:bg-slate-900"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-xs text-white">
                            {channel.logo}
                          </div>
                          <div className="min-w-0">
                            <h5 className="text-xs font-medium text-slate-200 group-hover:text-cyan-400 transition-colors truncate">
                              {channel.name}
                            </h5>
                            <span className="text-[10px] text-slate-500 font-mono">{channel.category} • {channel.quality}</span>
                          </div>
                        </div>

                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* 4. PRICING OFFERS PLATFORM BLOCK */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] text-indigo-400 font-mono tracking-widest font-bold uppercase block">SECURE PAYMENTS CHANNELS</span>
              <h2 className="text-white font-display font-extrabold text-2xl tracking-tight leading-normal uppercase">Choose Your Access License</h2>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Simple automated checkout. Pay securely via credit cards, bank gateways, PayPal, or crypto. Start streaming VOD films and live events in less than 5 minutes.
              </p>
            </div>

            {/* PRICING GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto" id="plans-grid">
              {IPTV_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-6.5 flex flex-col justify-between shadow-2xl transition-all ${
                    plan.isPopular
                      ? 'bg-gradient-to-b from-slate-950 via-slate-950 to-indigo-950/20 border-2 border-cyan-500/50 scale-102 hover:scale-103'
                      : 'bg-slate-950 border border-slate-900 hover:border-slate-800'
                  }`}
                  id={`plan-card-${plan.id}`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 font-display font-bold text-[9px] tracking-widest px-3 py-1 rounded-full uppercase leading-none shadow shadow-cyan-500/20">
                      BEST VALUE CHOICE
                    </span>
                  )}

                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-200">{plan.name}</h4>
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-900/50 rounded-md px-1.5 py-0.5 leading-none">
                          -{plan.discountPercent}% OFF
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase font-mono tracking-wider">{plan.periodMonths} Months IPTV License Access</p>
                    </div>

                    <div className="flex items-baseline gap-1 pt-1 border-t border-slate-900">
                      <span className="text-3xl font-display font-bold text-white font-mono">€{plan.price}</span>
                      <span className="text-xs text-slate-500 font-mono">/ {plan.periodMonths} Months single-payment</span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex gap-2 items-start leading-snug">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setCheckoutPlan(plan)}
                    className={`w-full rounded-xl py-3 text-xs font-display font-bold tracking-wide transition-all uppercase cursor-pointer mt-6 flex items-center justify-center gap-1 ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 shadow shadow-cyan-500/15 hover:from-cyan-400 hover:to-indigo-400'
                        : 'bg-slate-900 hover:bg-slate-850 text-white border border-slate-850 hover:text-white'
                    }`}
                  >
                    <span>Securely Order Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* FAQ BOTTOM SECTION */}
            <div className="max-w-4xl mx-auto glass border border-slate-900 rounded-3xl p-6 md:p-8 space-y-4">
              <h4 className="text-white font-display font-bold text-base text-center">Frequently Answered Questions</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1">
                  <h5 className="text-xs font-semibold text-white">How fast will I receive my streaming active links?</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Instantly! Our checkout portal parses database rules on the fly and allocates credentials immediately in your Secure Dashboard cabinet. No human activation delay is required.
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="text-xs font-semibold text-white">Can I configure custom m3u files or edit playlists?</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Yes! Our dashboard allows uploading `.m3u` file URLs or integrating Xtream Codes APIs. Custom channel nodes render inside our secure playback viewer automatically.
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="text-xs font-semibold text-white">What is "Anti-Buffer Pro Active Tech"?</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    It is an automated packet recovery firewall. If stream bandwidth drops or networks congest, our system fetches alternative H.265 transport links in less than 400 milliseconds.
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="text-xs font-semibold text-white">How does "Secure automated billing control" operate?</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    You can toggle automated billing off at any interval of your active subscriptions without complex support inquiries. Absolutely zero contracts or cancellation penalties.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 5. APP INSTALLATION INSTRUCTIONS WORKTHROUGHS */}
        {activeTab === 'guide' && (
          <div className="animate-in fade-in duration-300">
            <DeviceGuides />
          </div>
        )}

      </main>

      {/* FOOTER BRUTAL COPY */}
      <footer className="border-t border-slate-950 bg-slate-950 py-8 px-4 lg:px-8 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-display font-bold text-white tracking-wide text-sm flex items-center justify-center md:justify-start gap-1">
              AURA<span className="text-cyan-400 text-[10px] font-mono tracking-widest bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">IPTV</span>
            </p>
            <p className="text-[10px]">Pristine 4K UHD encrypted IPTV streaming systems. Powered by AI Studio Sandbox.</p>
          </div>

          <div className="flex gap-4 text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1"><Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Decryptor Node: 3000 Active</span>
            <span>•</span>
            <span>Security Status: 100% OK</span>
            <span>•</span>
            <span>All Channels Online</span>
          </div>
        </div>
      </footer>

      {/* PORTAL OVERLAYS MODALS */}
      {showPlaylistPortal && (
        <PlaylistPortal 
          onClose={() => setShowPlaylistPortal(false)} 
          onImportSuccess={(newChans) => {
            handleImportPlaylistChannels(newChans);
            setShowPlaylistPortal(false);
          }} 
        />
      )}

      {checkoutPlan && (
        <PaymentWizard
          plan={checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
          onSuccess={(method, dur, price) => {
            handlePaymentSuccess(method, dur, price);
            setCheckoutPlan(null);
          }}
        />
      )}

    </div>
  );
}
