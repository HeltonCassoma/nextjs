import { Product } from '@/app/models/interfaces'
import React from 'react'

/*export default function ProductsCard({id, title, price, description}: Product) {
  return <article className="m-2 p-2 bg-orange-300 hover:bg-orange-400">
    {title}({description})
  </article>
}*/

interface ProductsCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  onAddToCart: () => void; // Função passada como propriedade
}

const ProductsCard: React.FC<ProductsCardProps> = ({
  id,
  title,
  price,
  description,
  onAddToCart,
}) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-green-600 font-semibold">€{price}</p>
      <button
        onClick={onAddToCart}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductsCard;

