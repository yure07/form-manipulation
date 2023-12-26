import axios from "axios"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ShowImage from "../../components/ShowImage"

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #D3D3D3;
`

const ContainerProducts = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 120px;
  margin-bottom: 16px;
  border: 1px solid red;
`

interface products{
  name?: string;
  brand?: string;
  value?: string;
  category?: string;
  file?: File;
  id?: number
}

interface productsType extends products{
  map?: any;
}

const Produtos:React.FC = () => {
  const [products, setProducts] = useState<productsType>([])

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get('https://apigenerator.dronahq.com/api/Kxyz66cp/products_exercise')
        console.log(response.data)
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi()
  },[])

  return(
    <Container>
      {products.map((product: products) => (
        <ContainerProducts key={product.id}>
          {product.file && <ShowImage file={product.file}/>}
        </ContainerProducts>
      ))}
    </Container>
  )
}
export default Produtos