import React, { useState, useEffect } from 'react';
import { Panel } from './components/Panel';
import { Gauge } from './components/Gauge';
import { ChartWidget } from './components/ChartWidget';
import { SimulatorView } from './components/SimulatorView';
import { 
  Wifi, 
  Bluetooth, 
  Volume2, 
  Move, 
  Signal, 
  Upload, 
  Battery, 
  Zap, 
  Settings, 
  LogOut,
  Play,
  Pause,
  FastForward,
  Square
} from 'lucide-react';

// Mock Data Generators
const generateChartData = (length: number) => {
  return Array.from({ length }, (_, i) => ({
    name: i,
    value: 40 + Math.random() * 40 + Math.sin(i * 0.5) * 20
  }));
};

export default function App() {
  const [time, setTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Simulation State
  const [jointAngles, setJointAngles] = useState({ j1: 90, j2: -49, j3: 130 });
  const [forceData, setForceData] = useState(generateChartData(20));
  const [velocityData, setVelocityData] = useState(generateChartData(20));
  const [speed, setSpeed] = useState(0.85);
  const [logs, setLogs] = useState([
    ">> Payload released",
    ">> Reposition",
    ">> Standby",
    ">> System Check OK",
    ">> Initializing sequence"
  ]);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulation Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Update Angles slightly
      setJointAngles(prev => ({
        j1: Math.min(180, Math.max(-180, prev.j1 + (Math.random() - 0.5) * 5)),
        j2: Math.min(180, Math.max(-180, prev.j2 + (Math.random() - 0.5) * 5)),
        j3: Math.min(180, Math.max(-180, prev.j3 + (Math.random() - 0.5) * 5)),
      }));

      // Update Charts
      setForceData(prev => [...prev.slice(1), { name: prev.length, value: 40 + Math.random() * 40 }]);
      setVelocityData(prev => [...prev.slice(1), { name: prev.length, value: 30 + Math.random() * 50 }]);
      
      // Update Speed
      setSpeed(prev => Math.max(0, Math.min(120, prev + (Math.random() - 0.5) * 0.1)));

    }, 100); // 10Hz update

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-screen h-screen bg-[#E4E3E0] flex flex-col p-2 gap-2 overflow-hidden text-[#333]">
      {/* HEADER */}
      <header className="h-16 bg-[#F0F0F0] border border-[#B0B0B0] rounded-sm flex items-center justify-between px-4 shadow-sm relative">
        {/* Left: User & Status */}
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center overflow-hidden">
             {/* Simple Avatar Placeholder */}
             <div className="w-8 h-8 bg-gray-500 rounded-full opacity-50"></div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-gray-500">
              <Move size={14} />
              <Volume2 size={14} />
              <Bluetooth size={14} />
              <Wifi size={14} />
              <Signal size={14} />
              <Upload size={14} />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold text-gray-700">GREEN CONNECTED</span>
              <Battery size={16} className="text-orange-500 ml-2" />
            </div>
          </div>
        </div>

        {/* Center: System Info */}
        <div className="flex flex-col items-center">
          <div className="flex gap-4 text-[10px] font-bold text-orange-500 tracking-widest mb-1">
            <span>SIMULATION RUNNING</span>
            <span className="text-gray-500">STATUS: OPTIMAL</span>
            <span className="text-gray-500">SYSTEM LOAD: 39%</span>
          </div>
          <div className="flex items-center gap-8 bg-[#E8E8E8] px-8 py-1 rounded-full border border-gray-300 shadow-inner">
             <div className="text-center">
               <div className="text-[9px] text-gray-500 font-bold">TIME:</div>
               <div className="text-xl font-mono font-bold text-gray-800 leading-none">
                 {time.toLocaleTimeString('en-US', { hour12: false })}
               </div>
             </div>
             <div className="text-center">
               <div className="text-[9px] text-gray-500 font-bold">DATE:</div>
               <div className="text-sm font-mono font-bold text-gray-600 leading-none">
                 {time.toLocaleDateString('en-CA').replace(/-/g, '.')}
               </div>
             </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex gap-3">
          <button className="bg-[#FF7A00] hover:bg-[#E66E00] text-white px-4 py-2 rounded-sm font-bold text-xs flex items-center gap-2 shadow-sm transition-colors">
            SETTINGS <Settings size={14} />
          </button>
          <button className="bg-[#FF7A00] hover:bg-[#E66E00] text-white px-4 py-2 rounded-sm font-bold text-xs flex items-center gap-2 shadow-sm transition-colors">
            LOGOUT <LogOut size={14} />
          </button>
        </div>
        
        {/* Decorative Lines */}
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[2px] bg-gray-300"></div>
        <div className="absolute top-0 right-10 w-20 h-[2px] bg-gray-300"></div>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="flex-1 grid grid-cols-[300px_1fr_300px] gap-2 min-h-0">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-2 min-h-0">
          <Panel title="JOINT ANGLES" className="flex-[2]">
            <div className="grid grid-cols-1 gap-2 p-2 justify-items-center">
              <div className="flex items-center w-full">
                <Gauge value={Math.round(jointAngles.j1)} label="Joint 1" />
                <div className="w-12 h-12 opacity-50 bg-[url('https://cdn-icons-png.flaticon.com/512/2083/2083234.png')] bg-contain bg-no-repeat bg-center"></div>
              </div>
              <div className="flex justify-between w-full px-2">
                <Gauge value={Math.round(jointAngles.j2)} label="Joint 2" min={-180} max={180} />
                <Gauge value={Math.round(jointAngles.j3)} label="Joint 3" min={0} max={180} />
              </div>
            </div>
          </Panel>
          
          <Panel title="FORCE READOUT" className="flex-1">
            <ChartWidget data={forceData} dataKey="value" />
          </Panel>
          
          <Panel title="MANUAL CONTROL" className="flex-1">
             <div className="flex flex-col gap-4 p-4">
               {['Joint 1', 'Joint 2', 'Joint 3'].map((label, i) => (
                 <div key={label} className="flex items-center gap-2">
                   <span className="text-xs font-bold w-12">{label}</span>
                   <input 
                     type="range" 
                     className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#FF7A00]" 
                     defaultValue={[45, 75, 20][i]}
                   />
                   <span className="text-xs font-mono w-8 text-right">{[45, 75, 20][i]}%</span>
                 </div>
               ))}
             </div>
          </Panel>
        </div>

        {/* CENTER COLUMN */}
        <Panel title="3D SIMULATOR AREA" className="flex-1 p-0 overflow-hidden bg-gray-200">
          <div className="w-full h-full relative">
             <SimulatorView jointAngles={jointAngles} />
             {/* Overlay Cursor */}
             <div className="absolute top-1/4 right-1/4 pointer-events-none z-10">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="black" className="opacity-50">
                 <path d="M12 2L2 22L12 18L22 22L12 2Z" />
               </svg>
             </div>
          </div>
        </Panel>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-2 min-h-0">
          <Panel title="VELOCITY METRICS" className="flex-[1.5]">
            <div className="p-4 bg-gradient-to-b from-gray-200 to-gray-100 rounded mb-2 border border-gray-300 shadow-inner">
               <div className="flex justify-between items-end">
                 <div>
                   <span className="text-xs font-bold text-gray-500">SPEED</span>
                   <div className="text-4xl font-bold font-mono text-gray-800">
                     {speed.toFixed(2)} <span className="text-sm text-gray-500 font-sans">m/s</span>
                   </div>
                 </div>
                 <div className="text-right text-[10px] text-gray-600 font-mono">
                   <div>Max: 120 m/s</div>
                   <div>AVB: 8.4 m/s</div>
                 </div>
               </div>
            </div>
            <div className="flex-1 h-32">
              <ChartWidget data={velocityData} dataKey="value" color="#FF7A00" />
            </div>
          </Panel>

          <Panel title="TIME CONTROL" className="flex-1">
             <div className="flex flex-col items-center justify-center h-full gap-4">
               <div className="text-4xl font-mono font-bold text-gray-800">
                 {time.getMinutes().toString().padStart(2, '0')}:
                 {time.getSeconds().toString().padStart(2, '0')}.
                 {Math.floor(time.getMilliseconds() / 10).toString().padStart(2, '0')}
               </div>
               <div className="text-xs font-bold tracking-widest text-gray-500">PLAYBACK</div>
               
               <div className="flex gap-2">
                 <button 
                   onClick={() => setIsPlaying(true)}
                   className={`p-2 rounded ${isPlaying ? 'bg-[#FF7A00] text-white' : 'bg-gray-300 text-gray-600'}`}
                 >
                   <Play size={20} fill="currentColor" />
                 </button>
                 <button 
                   onClick={() => setIsPlaying(false)}
                   className={`p-2 rounded ${!isPlaying ? 'bg-[#FF7A00] text-white' : 'bg-gray-300 text-gray-600'}`}
                 >
                   <Pause size={20} fill="currentColor" />
                 </button>
                 <button className="p-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400">
                   <FastForward size={20} fill="currentColor" />
                 </button>
                 <button className="p-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400">
                   <Square size={20} fill="currentColor" />
                 </button>
               </div>
               
               <div className="w-full px-8 mt-2">
                 <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap">DIM SPEED: 14</span>
                   <input type="range" className="w-full h-1 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-[#FF7A00]" />
                 </div>
               </div>
             </div>
          </Panel>

          <Panel title="COMMAND TERMINAL" className="flex-1 bg-[#D0D0D0]">
            <div className="font-mono text-xs p-2 flex flex-col gap-1 h-full overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="text-gray-700 border-b border-gray-300 pb-1 last:border-0">
                  {log}
                </div>
              ))}
            </div>
          </Panel>
        </div>

      </div>
    </div>
  );
}
