import axios from "axios";
import { Formik, Form, Field, FormikProps, FieldProps, ErrorMessage, useField } from "formik";
import { read } from "fs";
import React, { useState } from "react";
import styled from "styled-components";

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;

  @media (max-width: 600px){
    align-items: center;
  }
`

const LabelInput = styled.p`
    margin-bottom: 5px;
  margin-left: 5px;
  font-weight: 600;
`

const FieldStyled = styled(Field)`
  width: 400px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 0 8px;
  font-family: 'Montserrat';
  font-size: 16px;

  @media (max-width: 600px){
    width: 280px;
  }
`

const FieldImg = styled(FieldStyled)`
  border: 0;
  margin-left: -6px;
  
  &:focus{
    color: initial;
  }
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

  @media (max-width: 600px){
    width: 200px;
  }
`

interface FormValues{
  name?: string;
  brand?: string;
  value?: string;
  category?: string;
  file?: File | Object;
}

const FormFormik:React.FC = () => {
  const [filebase64,setFileBase64] = useState<string>('')

  const convertFile = (files: FileList|null) => {
    if (files) {
      const fileRef = files[0] || ""
      const fileType: string= fileRef.type || ""
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload=(ev: any) => {
        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
      }
    }
  }

    return(
        <Formik 
          initialValues={{name: '', brand: '', value: '', category: '', file: ''}}
          onSubmit={async (values, {resetForm, setSubmitting }) => {
            try{
              const response = await axios.post('https://apigenerator.dronahq.com/api/Kxyz66cp/products_exercise', {
                name: values.name,
                brand: values.brand,
                value: values.value,
                category: values.category,
                file: filebase64,
              })
              resetForm()
              setSubmitting(false)
            } catch (error) {
              console.log(error)
            }
          }} 
          validate={(values) => {
            const errors:FormValues = {}
            const regex:RegExp = /[!@#$%^&*()_+{}\[\]:;<>,.?~\/-]|\s/
            const value:number = Number(values.value)

            if(regex.test(values.name)) errors.name = 'Nome não pode incluir caracteres especiais.'
            else if(value <= 0) errors.value = 'O produto deve custar mais que 0.'
            //else if(!values.file) errors.file = 'Necessário imagem.'

            return errors
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <FormStyled>
              <label>
                <LabelInput>Nome</LabelInput>
                <FieldStyled
                  name='name'
                  type='text'
                  placeholder="Ex: Perfume"
                />
                <ErrorMessage name='name' component='p'/>
              </label>
              <label>
                <LabelInput>Marca</LabelInput>
                <FieldStyled
                  name='brand'
                  type="text"
                  placeholder="Ex: Natura"
                />
                <ErrorMessage name='brand' component='p'/>
              </label>
              <label>
                <LabelInput>Valor</LabelInput>
                <FieldStyled 
                  name='value'
                  type="number"
                  placeholder="Ex: 299.99"
                />
                <ErrorMessage name="value" component='p'/>
              </label>
              <label>
                <LabelInput>Categoria</LabelInput>
                <FieldStyled 
                  name='category'
                  type="text"
                  placeholder="Ex: Moda"
                />
                <ErrorMessage name="category" component='p'/>
              </label>
              <label>
                <LabelInput>Imagem</LabelInput>
                <input
                  name="file"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      const fileRef = e.target.files[0] || ""
                      const fileType: string= fileRef.type || ""
                      const reader = new FileReader()
                      reader.readAsBinaryString(fileRef)
                      reader.onload=(ev: any) => {
                        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
                      }
                    }
                  }
                  }
                />
                <ErrorMessage name="file" component='p'/>
              </label>
              <ButtonForm type='submit' disabled={isSubmitting}>Cadastrar</ButtonForm>
            </FormStyled>
          )}
        </Formik>
    )
}
export default FormFormik