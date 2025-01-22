import React from 'react'
import { useParams } from 'react-router-dom'

const CatagoryProduct = () => {

    const params = useParams()


  return (
    <div>
      {params?.catagoryName}
    </div>
  )
}

export default CatagoryProduct