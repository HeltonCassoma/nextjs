'use client'

import React from 'react'
import {Product} from '../models/interfaces'
import useSWR from 'swr'
import ProductsCard from '@/components/Card/ProductsCard'

export default function produtos(){
  const fetcher = (url: string ) => fetch(url).then(res => res.json())
  const {data, error, isLoading} = useSWR<Product[], Error>('api/products', fetcher)

  if(error) return <div>Error loading data</div>
  if(isLoading) return <div>Loading...</div>
  if(!data) return <div> No data!</div>


return<section className='overflow-auto h-full'>
{ data.map(m =>( 
  <ProductsCard
  id= {m.id}
  title = {m.title}
  price = {m.price}
  description={m.description}
  
  />
))}
</section>
}

