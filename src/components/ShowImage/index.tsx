import { useEffect, useState } from "react"

const ShowImage = ({file}: {file: File}) => {
  const [preview, setPreview] = useState<string>('')
  
  useEffect(() => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const urlData = e.target?.result as string
      setPreview(urlData)
    }
    reader.readAsDataURL(file)
  },[])

  return(
    <>
      <img src={preview} alt='preview-product-img' width="200px" height="200px"/>
    </>
  )
}

export default ShowImage