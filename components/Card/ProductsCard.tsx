import { Product } from '@/app/models/interfaces'
import React from 'react'

export default function ProductsCard({id, title, price, description}: Product) {
  return <article className="m-2 p-2 bg-orange-300 hover:bg-orange-400">
    {title}({description})
  </article>
}
