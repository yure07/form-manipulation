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

  @media (max-width: 768px){
    justify-content: inherit;
    padding: 24px 0;
  }
`

const ContainerProducts = styled.section`
  display: flex;
  flex-direction: row;
  padding: 16px 16px;
  width: 700px;
  height: 150px;
  margin-bottom: 16px;
  border: 2px solid #FFF;
  border-radius: 8px;

  @media (max-width: 768px){
    width: 70%;
    height: 22%;
    justify-content: space-between;
  }

  @media (max-width: 600px){
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 500px;
  }
`

const ContainerInfoProduct = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 90%;
  margin-left: 16px;
  font-size: 18px;

  @media (max-width: 600px){
    margin-top: 16px;
    margin-left: 0;
    text-align: center;
  }
`

const ProductName = styled.p`
  font-weight: 600;
  font-size: 24px;
`

const PreviousValue = styled.p`
  margin-top: 8px;
  font-weight: 600;
  font-size: 16px;
  color: #FFF;
  text-decoration: line-through;

  @media (max-width: 600px){
    margin-top: 24px;
  }
`

const CurrentValue = styled.p`
  font-weight: 700;
`

const ProductBrand = styled(ProductName)`
  transform: translate(250px, 75px);

  @media (max-width: 768px){
    transform: translate(0px, 140px);
  }

  @media (max-width: 600px){
    transform: translate(72px, 0px);
  }
`

interface products{
  name?: string;
  brand?: string;
  value?: number;
  category?: string;
  file?: string;
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
          <ContainerInfoProduct>
            <ProductName>{product.name}</ProductName>
            <p>Categoria: {product.category}</p>
            <PreviousValue>De R$ {product.value && ((product.value) * 1.1).toFixed(2)}</PreviousValue>
            <CurrentValue>Por R$ {product.value}</CurrentValue>
          </ContainerInfoProduct>
          <ProductBrand>{product.brand}</ProductBrand>
        </ContainerProducts>
      ))}
    </Container>
  )
}
export default Produtos