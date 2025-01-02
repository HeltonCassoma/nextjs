'use client'

import React, {useEffect, useInsertionEffect, useState}from 'react';
import {Product} from '../models/interfaces'
import useSWR from 'swr'
import ProductsCard from '@/components/Card/ProductsCard'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';


const fetcher = (url: string ) => fetch(url).then(res => res.json())

export default function produtos(){

  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [cart, setCart] =useState<Product[]>([]);


  const{data, error} = useSWR<Product[]>('/api/products', fetcher);

//Adicionar um tem ao carrinho
  const addItemToCart=(product : Product ) =>{
    setCart((prevCart) => [...prevCart, product]);
  }

  //Realiza a compra
  const buy = () => {
    fetch("/api/deisishop/buy", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map(product => product.id),
        name: "",
        student: false,
        coupon:""
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response =>{
      if(!response.ok){
        throw new Error(response.statusText);
      }
      return response.json();
    }).then((response)=>{
      setCart([])

    }).catch(()=>{
      console.log("error ao comprar")
    })
  }
  
  //Sincronizar o carrinho com o localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  //Atualiza o local storage sempre que o carrinho é alterado
  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart]);
   

   // Filtra os produtos com base na pesquisa
useEffect(() => {
if(data){
    const newFilteredData= data.filter(produto => 
    produto.title.toLowerCase().includes(search.toLowerCase())
    ); 
    setFilteredData(newFilteredData);
  }

}, [search, data]);
  
// Tratamento de estados
if (error) return <div>Error loading data</div>;
if (!data) return <div>Loading...</div>;
  

return <section className="overflow-auto h-full">
<div>
  <input
    type="text"
    placeholder="Pesquisar"
    value={search}
    onChange={e => setSearch(e.target.value)}
    className="border p-2 mb-4 w-full"
  />
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredData.map(produto => (
    <ProductsCard
      key={produto.id}
      id={produto.id}
      title={produto.title}
      price={produto.price}
      description={produto.description}
      onAddToCart={() => addItemToCart(produto)} // Passa a função para o botão
    />
  ))}
</div>
<div className="mt-4">
  <h2 className="text-lg font-semibold mb-2">Carrinho</h2>
  {cart.length === 0 ? (
    <p>O carrinho está vazio.</p>
  ) : (
    <ul>
      {cart.map((item, index) => (
        <li key={index} className="flex justify-between items-center border-b py-2">
          <span>{item.title}</span>
          <span>{item.price.toFixed(2)} €</span>
        </li>
      ))}
    </ul>
  )}
  <button
    onClick={buy}
    className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
    disabled={cart.length === 0} // Desabilita o botão se o carrinho estiver vazio
  >
    Finalizar Compra
  </button>
</div>
</section>
}
