
import { Button } from "@/components/ui/button";
import { Sparkles, Play } from "lucide-react";

export const CallToActionSection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Showcase Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-300 to-purple-300">
            Mastery
          </span>
          ?
        </h2>
        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
          Join thousands of master artisans who have elevated their craft and grown their business with Jackle. 
          Your expertise deserves a platform as exceptional as your work.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl px-8 py-4 text-lg font-semibold border-0"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Start Your Portfolio
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 px-8 py-4 text-lg backdrop-blur-sm"
          >
            <Play className="h-5 w-5 mr-2" />
            Watch Demo
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="group">
            <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent">Free</div>
            <div className="text-slate-300">Portfolio Setup</div>
          </div>
          <div className="group">
            <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent">24/7</div>
            <div className="text-slate-300">Client Discovery</div>
          </div>
          <div className="group">
            <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent">∞</div>
            <div className="text-slate-300">Growth Potential</div>
          </div>
        </div>
      </div>
    </section>
  );
};
