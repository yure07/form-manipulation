import styled from 'styled-components';
import photoProduct from '../../assets/photo-product.png'
import FormFormik from '../../components/Form';

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #D3D3D3;
`

const FormContainer = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 750px;
  padding: 0 40px;
  height: 500px;
  background-color: #0ABAB5;
  box-shadow: 5px 5px 10px #000;

  @media (max-width: 768px){
    flex-direction: column;
    width: 80%;
    height: auto;
    padding: 40px 0;
  }

  @media (max-width: 600px){
    padding: 20px 0;
  }
`

const SectionImgText = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 200px;
`

const ImgProduct = styled.img`
  width: 100%;
  height: 200px;

  @media (max-width: 600px){
    height: 150px;
    width: 150px;
    align-self: center;
  }
`

const TextRegisterProduct = styled.h1`
  font-size: 36px;
  line-height: 150%;
  color: #FFF;
  font-weight: 900;

  @media (max-width: 600px){
    font-size: 24px;
  }
`

const Home:React.FC = () => {
  return (
    <Container>
      <FormContainer>
        <SectionImgText>
          <TextRegisterProduct>Cadastre seus produtos!</TextRegisterProduct>
          <ImgProduct src={photoProduct} alt='product-png'/>
        </SectionImgText>
        <FormFormik/>
      </FormContainer>
    </Container>
  );
}

export default Home;