'use client';

import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const WHO_SAMPLE_DATA = [
  { ageMonths: '36m', weightKg: 14.3, heightCm: 96.1 },
  { ageMonths: '40m', weightKg: 15.1, heightCm: 98.4 },
  { ageMonths: '44m', weightKg: 15.8, heightCm: 100.2 },
  { ageMonths: '48m', weightKg: 16.2, heightCm: 101.8 },
  { ageMonths: '50m', weightKg: 16.8, heightCm: 103.0 },
];

export function WhoGrowthChart() {
  return (
    <div className="rounded-3xl bg-white border border-slate-ink/10 p-6 shadow-xs space-y-4">
      <div>
        <h3 className="font-serif text-xl text-slate-ink">
          Curva de Crecimiento OMS · Peso y Talla
        </h3>
        <p className="text-xs text-slate-ink/65">
          Seguimiento longitudinal (Peso/Edad y Talla/Edad)
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={WHO_SAMPLE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3D4A4515" />
            <XAxis
              dataKey="ageMonths"
              tick={{ fill: '#3D4A45', fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: '#3D4A45', fontSize: 12 }}
              domain={['auto', 'auto']}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: '#3D4A45', fontSize: 12 }}
              domain={['auto', 'auto']}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="weightKg"
              name="Peso (kg)"
              stroke="#C7D5B8"
              strokeWidth={3}
              dot={{ r: 4, fill: '#C7D5B8', stroke: '#3D4A45' }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="heightCm"
              name="Talla (cm)"
              stroke="#A1B9C0"
              strokeWidth={3}
              dot={{ r: 4, fill: '#A1B9C0', stroke: '#3D4A45' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
