'use client'

import React from 'react'
import {Product} from '../models/interfaces'
import useSWR from 'swr'

export default function produtos(){
  const fetcher = (url: string ) => fetch(url).then(res => res.json())
  const {data, error, isLoading} = useSWR<Product[], Error>('api/products', fetcher)

  if(error) return <div>Error loading data</div>
  if(isLoading) return <div>Loading...</div>
  if(!data) return <div> No data!</div>
return<>
{ data.map(m => <p> {m.title} </p> ) }
</>
}

