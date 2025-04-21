import React, { useState } from 'react'

const items = [
  { id: 1, category_name: 'Category 1' },
  { id: 2, category_name: 'Category 2' },
  { id: 3, category_name: 'Category 3' },
  { id: 4, category_name: 'Category 4' },
  { id: 5, category_name: 'Category 5' },
  { id: 6, category_name: 'Category 6' }
];

function ProductDelete() {
  const [products,setProducts]=useState(items)

  
  return (
    <div>
      <h1>product delete admin</h1>
      {products.map((item)=>
      <h1>{item.category_name}</h1>
      )}
    </div>
  )
}

export default ProductDelete
