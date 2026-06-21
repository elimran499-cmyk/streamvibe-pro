import { useState } from 'react';
import { COMPAT_DEVICES } from '../data';
import { Smartphone, MonitorPlay, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function DeviceGuides() {
  const [selectedDevice, setSelectedDevice] = useState(COMPAT_DEVICES[0].id);
  const currentDevice = COMPAT_DEVICES.find(d => d.id === selectedDevice) || COMPAT_DEVICES[0];

  return (
    <div className="space-y-6" id="device-guide-container">
      {/* HEADER INTRO */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[10px] text-cyan-400 font-mono tracking-widest font-bold uppercase block">COMPATIBLE APPLICATIONS</span>
        <h2 className="text-white font-display font-bold text-2xl tracking-tight leading-normal">Setup IPTV on All Your Screens</h2>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          Aura IPTV subscription provides pristine, adaptive stream feeds across 100% of major client players and digital television ecosystems without extra license hardware.
        </p>
      </div>

      {/* COMPAT VISUAL CHIPS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 max-w-4xl mx-auto" id="device-selection-grid">
        {COMPAT_DEVICES.map((device) => (
          <button
            key={device.id}
            onClick={() => setSelectedDevice(device.id)}
            className={`p-3 rounded-xl border text-center flex flex-col items-center gap-2 cursor-pointer transition-all ${selectedDevice === device.id ? 'bg-slate-900 border-cyan-500/40 text-white shadow-lg' : 'bg-slate-950/20 border-slate-900 text-slate-400 hover:text-white'}`}
          >
            <span className="text-xl leading-none">{device.logo}</span>
            <span className="text-xs font-semibold block truncate w-full">{device.name}</span>
          </button>
        ))}
      </div>

      {/* DETAIL SPECS ACTION CARD */}
      <div className="max-w-3xl mx-auto bg-slate-950 border border-slate-900 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Side steps list */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wide">
              <span>DEVICE SELECT: {currentDevice.name}</span>
              <span className="text-emerald-400">● 100% Works</span>
            </div>
            <h4 className="text-white font-display font-semibold text-lg mt-1">{currentDevice.name} Installation Instructions</h4>
            <p className="text-xs text-slate-400 mt-1">{currentDevice.description}</p>
          </div>

          <div className="border-t border-slate-900 pt-3.5 space-y-3">
            {currentDevice.steps.map((step, idx) => (
              <div key={idx} className="flex gap-3 text-xs leading-relaxed text-slate-300">
                <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="flex-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side visual prompt mockup screen */}
        <div className="md:col-span-5 relative rounded-xl border border-slate-850/80 p-4 bg-slate-900/40 select-none overflow-hidden aspect-video flex flex-col justify-between">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-radial-gradient from-transparent via-transparent to-slate-950/60 pointer-events-none" />
          
          <div className="flex items-center justify-between z-10">
            <span className="text-[8px] text-cyan-400 font-mono tracking-wider font-bold">PORTAL CHECK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="text-center py-2 z-10">
            <span className="text-2xl leading-none block">{currentDevice.logo}</span>
            <span className="text-[10px] font-bold text-white mt-1.5 block uppercase tracking-tight">{currentDevice.name} App Configured</span>
            <p className="text-[8px] text-slate-400 font-sans mt-0.5 max-w-[150px] mx-auto">Input Server lines and subscription active credentials.</p>
          </div>

          <div className="flex gap-1 justify-center z-10">
            <span className="text-[7px] text-slate-500 font-mono bg-slate-950/80 rounded px-1.5 py-0.5">M3U</span>
            <span className="text-[7px] text-slate-500 font-mono bg-slate-950/80 rounded px-1.5 py-0.5">XTREAM API</span>
            <span className="text-[7px] text-slate-500 font-mono bg-slate-950/80 rounded px-1.5 py-0.5">PORTAL</span>
          </div>
        </div>

      </div>

      {/* QUICK TROUBLESHOOTING CARD */}
      <div className="max-w-3xl mx-auto glass border border-slate-900 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center text-sm font-semibold shrink-0">?</div>
          <div>
            <h5 className="text-xs font-semibold text-white">Need help setting up your active codecs?</h5>
            <p className="text-[10px] text-slate-400">Our customer care engineers are available 24/7 to configure your smart IPTV app via Whatsapp live chat.</p>
          </div>
        </div>

        <a 
          href="https://wa.me/something"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] font-sans font-bold py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors cursor-pointer shrink-0"
        >
          WhatsApp Live Support
        </a>
      </div>
    </div>
  );
}
