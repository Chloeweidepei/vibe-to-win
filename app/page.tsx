'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Gift, RefreshCw } from 'lucide-react';

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);

  const playRaffle = () => {
    setIsSpinning(true);
    setResult(null);
    
    // Random number of full rotations (3-5) plus a random ending position
    const rotations = (Math.floor(Math.random() * 3) + 3) * 360;
    const endPosition = Math.random() * 360;
    const totalRotation = rotations + endPosition;
    
    setWheelRotation(totalRotation);
    
    setTimeout(() => {
      const isWinner = Math.random() > 0.5;
      setResult(isWinner ? "Yay congrats you win!" : "Oh no maybe next time");
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-24">
        <div className="text-center space-y-6">
          <div className="inline-block p-4 bg-primary/10 rounded-full">
            <Ticket className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-primary">
            Lucky Raffle
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            🎁 This one's just for you—tap the button and let the luck spin!
          </p>

          <div className="relative mt-12">
            <motion.div
              className="relative w-64 h-64 mx-auto mb-8"
              style={{
                rotate: wheelRotation,
                transition: isSpinning ? "all 3s cubic-bezier(0.3, 0.1, 0.3, 1)" : "none"
              }}
            >
              <div className="absolute inset-0 rounded-full border-8 border-primary/20">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${i * 45}deg)`,
                    }}
                  >
                    <div className="w-1 h-1/2 bg-primary/40 mx-auto rounded-full" />
                  </div>
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gift className={`w-12 h-12 ${isSpinning ? 'text-primary animate-bounce' : 'text-primary/60'}`} />
                </div>
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-8 bg-primary rounded-t-full" />
              </div>
            </motion.div>

            <button
              onClick={playRaffle}
              disabled={isSpinning}
              className="relative group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 disabled:opacity-50"
            >
              <span className="flex items-center gap-2">
                {isSpinning ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Gift className="w-5 h-5" />
                )}
                {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
              </span>
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-8 p-6 rounded-lg ${
                  result.includes('win') 
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                } text-xl font-semibold`}
              >
                {result}
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: '🎯',
              title: 'Simple to Play',
              description: 'Just one click to try your luck!'
            },
            {
              icon: '⚡',
              title: 'Instant Results',
              description: 'Know your fortune in seconds'
            },
            {
              icon: '🎉',
              title: 'Win Big',
              description: 'Exciting prizes await the lucky winners'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}