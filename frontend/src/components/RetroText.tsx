import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define props interface
interface RetroTextProps {
  words: string[];
  className?: string;
  onWordClick?: (word: string) => void;
}

export const RetroText: React.FC<RetroTextProps> = ({ words, className = '', onWordClick }) => {
  // Procesar las líneas para convertirlas en un array de arrays de palabras
  const processedWords = words.map((line, lineIndex) => {
    // Dividir la línea en palabras, preservando los caracteres especiales
    const parts = line.split(/(\s+)/g).filter(part => part.length > 0);
    return {
      line,
      parts: parts.map(part => ({ 
        text: part, 
        visible: true,
        canBlink: lineIndex >= 2,
        isClickable: lineIndex === 0 || // pcf es clickeable
                    lineIndex === 1 || // línea del asterisco es clickeable
                    (lineIndex >= 2 && !part.match(/^\s+$/)), // resto de palabras clickeables excepto espacios
        isControlDataLine: lineIndex === 1 // identificar si es parte de la línea "* control data"
      }))
    };
  });

  const [wordStates, setWordStates] = useState(processedWords);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordStates(prev => {
        const newStates = [...prev];
        // Solo seleccionar líneas que pueden parpadear (desde la tercera en adelante)
        const blinkableLines = newStates.slice(2);
        if (blinkableLines.length === 0) return newStates;

        // Seleccionar una línea aleatoria de las que pueden parpadear
        const randomLineIndex = Math.floor(Math.random() * blinkableLines.length) + 2;
        const line = newStates[randomLineIndex];
        
        // Seleccionar una palabra aleatoria de esa línea (excluyendo espacios y caracteres especiales)
        const validParts = line.parts.filter(part => !part.text.match(/^\s+|\*$/) && part.canBlink);
        if (validParts.length > 0) {
          const randomPartIndex = Math.floor(Math.random() * validParts.length);
          const targetIndex = line.parts.indexOf(validParts[randomPartIndex]);
          
          // Cambiar la visibilidad de la palabra seleccionada
          line.parts[targetIndex] = {
            ...line.parts[targetIndex],
            visible: !line.parts[targetIndex].visible
          };
        }
        
        return newStates;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Efecto para restaurar la visibilidad después de un tiempo
  useEffect(() => {
    const restoreInterval = setInterval(() => {
      setWordStates(prev => 
        prev.map((line, lineIndex) => ({
          ...line,
          parts: line.parts.map(part => ({
            ...part,
            visible: true
          }))
        }))
      );
    }, 2000);

    return () => clearInterval(restoreInterval);
  }, []);

  return (
    <div className={`space-y-1 font-mono ${className}`}>
      {wordStates.map((line, lineIndex) => (
        <div key={lineIndex} className="whitespace-pre flex flex-wrap items-center group">
          {line.parts.map((part, partIndex) => (
            <motion.span
              key={`${lineIndex}-${partIndex}`}
              initial={{ opacity: 1 }}
              animate={{
                opacity: part.visible ? 1 : 0.5,
                scale: part.visible ? 1 : 0.98,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut"
              }}
              className={`
                transition-all duration-200
                ${part.visible && part.canBlink
                  ? 'text-white brightness-125 text-shadow-glow' 
                  : 'text-[#C8C8C9]'}
                ${part.isClickable ? 'cursor-pointer' : ''}
                ${part.isControlDataLine ? 'group-hover:text-purple-400 hover:text-purple-400' : 'hover:text-purple-400'}
              `}
              onClick={() => {
                if (part.isClickable && onWordClick) {
                  // Si es parte de la línea de control data, enviar el texto completo
                  const textToSend = part.isControlDataLine ? '* control data' : part.text.trim();
                  onWordClick(textToSend);
                }
              }}
            >
              {part.text}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

// Agregar estilos globales en tu archivo CSS global
// .text-shadow-glow {
//   text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
// } 