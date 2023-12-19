import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';
import photoProduct from './assets/photo-product.png'
import './App.css';

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
`

const TextRegisterProduct = styled.h1`
  font-size: 36px;
  line-height: 150%;
  color: #FFF;
  font-weight: 900;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
`

const Input = styled.input`
  width: 400px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 0 8px;
  font-family: 'Montserrat';
  font-size: 16px;
`
const InputImg = styled(Input)`
  border: 0;
  margin-left: -6px;
  
  &:focus{
    color: initial;
  }
`

const LabelInput = styled.p`
  margin-bottom: 5px;
  margin-left: 5px;
  font-weight: 600;
`

const ButtonForm = styled.button`
  height: 45px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  background-color: #00EFD1;
  border: 1px solid #000;
  cursor: pointer;
  transition: all 0.4s;

  &:hover{
    transform: scale(1.02);
    background-color: #0ABAB5
  }
`

interface FormValueType{
  name: string;
  brand: string;
  value: string | undefined;
  category: string;
  image: string | undefined
}

const App:React.FC = () => {
  const [formValues, setFormValues] = useState<FormValueType>({
    name: '', 
    brand: '', 
    value: undefined,
    category: '',
    image: undefined
  })

  const initialFormValues:FormValueType = {
    name: '', 
    brand: '', 
    value: undefined,
    category: '',
    image: undefined
  }

  const updateValueForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const checkInfoEmpty = () => {
    if (formValues.name === '' || formValues.brand === '' || 
       formValues.value === undefined || formValues.category === '' || 
       formValues.image === undefined) return false
    else return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const infoComplete:boolean = checkInfoEmpty()

    if(infoComplete){
      axios.post('https://apigenerator.dronahq.com/api/Kxyz66cp/products_exercise', {
        name: formValues.name,
        brand: formValues.brand,
        value: formValues.value,
        category: formValues.category,
        image: formValues.image
      })
      .then((response) => {
        setFormValues(initialFormValues)
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    } else {
      alert("Por favor preencha todos os campos")
    }
  }

  return (
    <Container>
      <FormContainer>
        <SectionImgText>
          <TextRegisterProduct>Cadastre seus produtos!</TextRegisterProduct>
          <ImgProduct src={photoProduct} alt='product-png'/>
        </SectionImgText>
        <Form onSubmit={handleSubmit}>
          <label>
            <LabelInput>Nome</LabelInput>
            <Input 
              type='text' placeholder='Ex: Perfume Essencial' name='name' 
              value={formValues.name} onChange={updateValueForm}
            />
          </label>
          <label>
            <LabelInput>Marca</LabelInput>
            <Input 
              type='text' placeholder='Ex: Natura' name='brand' 
              value={formValues.brand} onChange={updateValueForm}
            />
          </label>
          <label>
            <LabelInput>Valor</LabelInput>
            <Input 
              type='number' placeholder='Ex: 229.99' name='value' 
              value={formValues.value} onChange={updateValueForm}
            />
          </label>
          <label>
            <LabelInput>Categoria</LabelInput>
            <Input 
              type='text' placeholder='Ex: Moda' name='category' 
              value={formValues.category} onChange={updateValueForm}
            />
          </label>
          <label>
            <LabelInput>Imagem</LabelInput>
            <InputImg 
              type='file' accept="image/*" name='image' 
              value={formValues.image} onChange={updateValueForm}
            />
          </label>
          <ButtonForm type='submit'>Cadastrar</ButtonForm>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default App;