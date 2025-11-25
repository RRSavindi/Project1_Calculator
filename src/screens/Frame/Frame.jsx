import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useCalculator } from '@/hooks/useCalculator';
import { useTheme } from '@/hooks/useTheme';

export const Frame = () => {
  const { 
    state,
    inputNumber,
    inputDecimal,
    clear,
    performOperation,
    calculateSquareRoot,
    calculatePercentage,
    formatDisplay,
  } = useCalculator();

  const { theme, toggleTheme } = useTheme();

  const buttonClass = (type) => {
    const baseClass = "h-16 rounded-2xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg";
    
    if (theme === 'light') {
      switch (type) {
        case 'number':
          return `${baseClass} bg-white/90 hover:bg-white text-gray-800 border border-white/20`;
        case 'operator':
          return `${baseClass} bg-orange-500 hover:bg-orange-600 text-white`;
        case 'equals':
          return `${baseClass} bg-orange-500 hover:bg-orange-600 text-white`;
        case 'clear':
          return `${baseClass} bg-red-500 hover:bg-red-600 text-white`;
      }
    } else {
      switch (type) {
        case 'number':
          return `${baseClass} bg-gray-700/90 hover:bg-gray-600 text-white border border-gray-600/20`;
        case 'operator':
          return `${baseClass} bg-blue-600 hover:bg-blue-700 text-white`;
        case 'equals':
          return `${baseClass} bg-green-600 hover:bg-green-700 text-white`;
        case 'clear':
          return `${baseClass} bg-red-600 hover:bg-red-700 text-white`;
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative transition-all duration-500 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100' 
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
    }`}>
      {/* Calculator Background Image */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className={`text-[800px] font-bold select-none transition-colors duration-500 ${
          theme === 'light' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <svg width="800" height="600" viewBox="0 0 800 600" className="opacity-20">
            {/* Calculator outline */}
            <rect x="200" y="50" width="400" height="500" rx="40" fill="none" stroke="currentColor" strokeWidth="4"/>
            
            {/* Display screen */}
            <rect x="240" y="90" width="320" height="80" rx="10" fill="currentColor" opacity="0.1"/>
            
            {/* Button grid */}
            {Array.from({ length: 5 }, (_, row) =>
              Array.from({ length: 4 }, (_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={260 + col * 70}
                  y={200 + row * 60}
                  width="50"
                  height="40"
                  rx="8"
                  fill="currentColor"
                  opacity="0.1"
                />
              ))
            )}
            
            {/* Calculator symbols */}
            <text x="400" y="140" textAnchor="middle" fontSize="24" fill="currentColor" opacity="0.3">123456</text>
            <text x="290" y="235" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">AC</text>
            <text x="360" y="235" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">√</text>
            <text x="430" y="235" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">%</text>
            <text x="500" y="235" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">÷</text>
            
            <text x="290" y="295" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">7</text>
            <text x="360" y="295" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">8</text>
            <text x="430" y="295" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">9</text>
            <text x="500" y="295" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">×</text>
            
            <text x="290" y="355" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">4</text>
            <text x="360" y="355" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">5</text>
            <text x="430" y="355" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">6</text>
            <text x="500" y="355" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">−</text>
            
            <text x="290" y="415" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">1</text>
            <text x="360" y="415" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">2</text>
            <text x="430" y="415" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">3</text>
            <text x="500" y="415" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">+</text>
            
            <text x="325" y="475" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">0</text>
            <text x="430" y="475" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">.</text>
            <text x="500" y="475" textAnchor="middle" fontSize="16" fill="currentColor" opacity="0.3">=</text>
          </svg>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md ${
            theme === 'light'
              ? 'bg-white/20 hover:bg-white/30 border border-white/30'
              : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30'
          }`}
        >
          {theme === 'light' ? (
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-32 h-32 rounded-full opacity-10 animate-pulse ${
          theme === 'light' ? 'bg-purple-300' : 'bg-gray-600'
        }`}></div>
        <div className={`absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-10 animate-pulse delay-1000 ${
          theme === 'light' ? 'bg-pink-300' : 'bg-gray-600'
        }`}></div>
        <div className={`absolute top-1/2 left-10 w-16 h-16 rounded-full opacity-10 animate-pulse delay-500 ${
          theme === 'light' ? 'bg-blue-300' : 'bg-gray-600'
        }`}></div>
      </div>

      <Card className={`w-full max-w-sm shadow-2xl backdrop-blur-md border-0 transition-all duration-500 relative z-10 ${
        theme === 'light' 
          ? 'bg-white/20' 
          : 'bg-gray-900/40'
      }`}>
        <CardContent className="p-8">
          {/* Display */}
          <div className={`mb-6 p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 ${
            theme === 'light' 
              ? 'bg-black/10 border border-white/20' 
              : 'bg-gray-800/50 border border-gray-600/20'
          }`}>
            {/* Expression Line */}
            <div className="h-10 flex items-center justify-end">
              <div className={`text-lg font-mono transition-colors duration-500 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {state.expression || '\u00A0'}
              </div>
            </div>
            
            {/* Answer Line */}
            <div className="h-12 flex items-center justify-end">
              <div className={`text-3xl font-bold font-mono transition-colors duration-500 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {formatDisplay(state.display)}
              </div>
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <button 
              onClick={clear}
              className={buttonClass('clear')}
            >
              AC
            </button>
            <button 
              onClick={calculateSquareRoot}
              className={buttonClass('operator')}
            >
              √
            </button>
            <button 
              onClick={calculatePercentage}
              className={buttonClass('operator')}
            >
              %
            </button>
            <button 
              onClick={() => performOperation('/')}
              className={buttonClass('operator')}
            >
              ÷
            </button>

            {/* Row 2 */}
            <button 
              onClick={() => inputNumber('7')}
              className={buttonClass('number')}
            >
              7
            </button>
            <button 
              onClick={() => inputNumber('8')}
              className={buttonClass('number')}
            >
              8
            </button>
            <button 
              onClick={() => inputNumber('9')}
              className={buttonClass('number')}
            >
              9
            </button>
            <button 
              onClick={() => performOperation('*')}
              className={buttonClass('operator')}
            >
              ×
            </button>

            {/* Row 3 */}
            <button 
              onClick={() => inputNumber('4')}
              className={buttonClass('number')}
            >
              4
            </button>
            <button 
              onClick={() => inputNumber('5')}
              className={buttonClass('number')}
            >
              5
            </button>
            <button 
              onClick={() => inputNumber('6')}
              className={buttonClass('number')}
            >
              6
            </button>
            <button 
              onClick={() => performOperation('-')}
              className={buttonClass('operator')}
            >
              −
            </button>

            {/* Row 4 */}
            <button 
              onClick={() => inputNumber('1')}
              className={buttonClass('number')}
            >
              1
            </button>
            <button 
              onClick={() => inputNumber('2')}
              className={buttonClass('number')}
            >
              2
            </button>
            <button 
              onClick={() => inputNumber('3')}
              className={buttonClass('number')}
            >
              3
            </button>
            <button 
              onClick={() => performOperation('+')}
              className={buttonClass('operator')}
            >
              +
            </button>

            {/* Row 5 */}
            <button 
              onClick={() => inputNumber('0')}
              className={`${buttonClass('number')} col-span-2`}
            >
              0
            </button>
            <button 
              onClick={inputDecimal}
              className={buttonClass('number')}
            >
              .
            </button>
            <button 
              onClick={() => performOperation('=')}
              className={buttonClass('equals')}
            >
              =
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};