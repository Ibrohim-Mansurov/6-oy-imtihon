import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { instance } from "../../api";
// import axios from "axios";

const Product = () => {
  const {id} = useParams();
  const [product , setProduct] = useState(null)
  const [category , setCategory] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        try{
            const response = await instance(`/api/posts/${id}`);
            const cetegory = await instance(`/api/categories/${response.data.category}`);
        setProduct(response.data);
        setCategory(cetegory.data);
        }catch(error){
            console.log(error);
        }
    }
    fetchData()
    console.log(product);
  }, [])

  return (
    <>
    {
        product &&
        <div className="product">
            <div className="product__header">
                <h1 className="product__title">{product.title}</h1>
                <p className="product__category">{category.data.title}</p>
            </div>
            <img className="product__img" src={product.image} alt="" />
            <p className="product__description">{product.description}</p>
            <div className="product__info">
            </div>
        </div>
    }
    </>
  )
}

export default Product