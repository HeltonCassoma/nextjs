// app/tecnologias/CardTecnologia.tsx
import React from 'react';

interface Tecnologia {
  title: string;
  image: string;
  description: string;
  rating: number;
}

const CardTecnologia: React.FC<{ tecnologia: Tecnologia }> = ({ tecnologia }) => {
  return (
    <div className="card">
      <img src={tecnologia.image} alt={tecnologia.title} className="card-image" />
      <h2>{tecnologia.title}</h2>
      <p>{tecnologia.description}</p>
      <p>Rating: {'⭐'.repeat(tecnologia.rating)}</p>
    </div>
  );
};

export default CardTecnologia;
