import styled from "styled-components"

const ContainerImg = styled.div`
  display: flex;
  max-width: 300px;

  @media (max-width: 600px){
    height: 150px;
  }
`

const Img = styled.img`
  width: auto;
  height: 90%;
  border-radius: 8px;

  @media (max-width: 768px){
    height: 70%;
  }

  @media (max-width: 600px){
    width: 100%;
    height: 100%;
  }
`

const ShowImage = ({file}: {file: string}) => {
  return(
    <ContainerImg>
      <Img src={file} alt='preview-product-img'/>
    </ContainerImg>
  )
}
export default ShowImage