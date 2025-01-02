// app/tecnologias/page.tsx
'use client'; // Habilita o uso de hooks

import tecnologias from '@/app/data/tecnologias.json';
import React from 'react';
import TecnologiasCard from '@/components/Card/TecnologiasCard'

const TecnologiasPage: React.FC = () => {
  return (
    <div>
      <h1>Tecnologias Aprendidas</h1>
      <div className="cards-container">
        {tecnologias.map((tecnologia, index) => (
          <TecnologiasCard key={index} tecnologia={tecnologia} />
        ))}
      </div>
    </div>
  );
};

export default TecnologiasPage;
