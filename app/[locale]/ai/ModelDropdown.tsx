import { motion } from 'motion/react';
import { useState } from 'react';


const models = [
  {
    id: 'google/gemma-3n-e4b-it:free',
    label: 'Google Gemma 3N 4B (Aug 2024)',
    colors: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'], // Google colors
  },
  {
    id: 'nvidia/nemotron-nano-12b-v2-vl:free',
    label: 'NVIDIA Nemotron Nano 12B 2 VL (Sep 2024)',
    color: '#76B900', // Google colors
  },
  {
    id: 'mistralai/mistral-small-3.1-24b-instruct:free',
    label: 'Mistral AI Small 3.1 (Oct 2023)',
    color: '#FF5C5C',
  }
];

export default function ModelDropdown({ model, setModel }: any) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div className="relative w-full max-w-xl mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-3 border rounded bg-white text-left"
      >
        {models.find((m) => m.id === model)?.label || 'Select a model'}
      </button>

      {open && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow mt-1">
          {models.map((m: any) => {
            const isGoogle = Array.isArray(m.colors);

            return (
              <li
                key={m.id}
                onClick={() => {
                  setModel(m.id);
                  setOpen(false);
                }}
                className="p-3 hover:bg-gray-100 cursor-pointer font-bold"
                style={{ color: isGoogle ? undefined : m.color }}
              >
                {isGoogle ? (
                  <span>
                    <span style={{ color: m.colors[0] }}>G</span>
                    <span style={{ color: m.colors[1] }}>o</span>
                    <span style={{ color: m.colors[2] }}>o</span>
                    <span style={{ color: m.colors[0] }}>g</span>
                    <span style={{ color: m.colors[3] }}>l</span>
                    <span style={{ color: m.colors[1] }}>e</span> {m.label.replace("Google ", "")}
                  </span>
                ) : (
                  <span style={{color: m.color}}>{m.label}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
}