import "../../../css/product/product.css";
import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { v4 } from "uuid";
import { createProduct } from "../../../api/productAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { storage } from '../../../config/firebaseConfig'

function NewProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    subCategory: "",
    size: "",
    color: "",
    stock: "",
    image: null,
  });

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [image, setImage] = useState();
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isDescriptionLengthValid, setIsDescriptionLengthValid] =
    useState(true);
  const [isSizeValid, setIsSizeValid] = useState(true);
  const [isCategoryValid, setIsCategoryValid] = useState(true);
  const [isSubCategoryValid, setIsSubCategoryValid] = useState(true);
  const [isColorValid, setIsColorValid] = useState(true);
  const [isStockValid, setIsStockValid] = useState(true);

  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleChangeName = (event) => {
    const productName = event.target.value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      name: productName,
    }));

    const isValid =
      /^[a-zA-Z]+$/.test(productName) &&
      productName.length <= 50 &&
      !/\d/.test(productName) &&
      !/[!@#$%^&*(),.?":{}|<>]/.test(productName);
    setIsNameValid(isValid);
  };

  const handleChangePrice = (event) => {
    const enteredPrice = event.target.value;

    if (isNaN(enteredPrice) || enteredPrice <= 0) {
      setIsPriceValid(false);
      console.error("Price should be a positive number");
      return;
    }

    setIsPriceValid(true);
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: enteredPrice,
    }));
  };

  const handleDescriptionChange = (event) => {
    const descriptionValue = event.target.value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      description: descriptionValue,
    }));

    if (descriptionValue.trim() !== "") {
      setIsDescriptionValid(true);
    } else {
      setIsDescriptionValid(false);
    }

    if (descriptionValue.length <= 100) {
      setIsDescriptionLengthValid(true);
    } else {
      setIsDescriptionLengthValid(false);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      category: categoryValue,
    }));

    if (categoryValue.trim() !== "") {
      setIsCategoryValid(true);
    } else {
      setIsCategoryValid(false);
    }
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryValue = e.target.value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      subCategory: subCategoryValue,
    }));

    if (subCategoryValue.trim() !== "") {
      setIsSubCategoryValid(true);
    } else {
      setIsSubCategoryValid(false);
    }
  };

  const handleColorChange = (event) => {

    const colorValue = event.target.value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      color: colorValue,
    }));

    if (colorValue.trim() !== "") {
      setIsColorValid(true);
    } else {
      setIsColorValid(false);
    }
  };

  const handleChangeSize = (event) => {
    const sizeValue = event.target.value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      size: sizeValue,
    }));

    if (sizeValue.trim() !== "") {
      setIsSizeValid(true);
    } else {
      setIsSizeValid(false);
    }
  };

  const handleStockChange = (e) => {
    const { id, value } = e.target;

    setProduct((prevData) => ({ ...prevData, [id]: value }));

    if (value.trim() !== "" && parseInt(value) > 0) {
      setIsStockValid(true);
    } else {
      setIsStockValid(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {
        setCategories(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/subCategories")
      .then((response) => {
        setSubCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/sizes")
      .then((response) => {
        setSizes(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching sizes:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/colors")
      .then((response) => {
        setColors(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
      });
  }, []);

  //firebase upload image

  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  const handleChangeImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (imageFile === null) {
      return;
    }
    let imageName = imageFile.name + v4();
    const imageRef = ref(storage, `product-images/${imageName}`);

    try {
      await uploadBytes(imageRef, imageFile);
      console.log("Upload image success");
      setIsImageUploaded(true);
    } catch (error) {
      setError(error);
      console.error("Error uploading image:", error.message);
      setIsImageUploaded(false);
    }

    if (isImageUploaded) {
      const imageUrl = await getDownloadURL(
        ref(storage, `product-images/${imageName}`)
      );
      setImage(imageUrl);
    } else {
      console.error("Error getting image URL:", error.message);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    await uploadImage();

    const productData = {
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      subCategory: product.subCategory,
      size: product.size,
      color: product.color,
      stock: Number(product.stock),
      images: image,
    };

    console.log(productData);
    const isCreateSuccess = await createProduct(productData);

    if (isCreateSuccess) {
      toast.success("Create Product Successfully!");
      navigate("/products");
    } else {
      toast.error("Create Product Failed. Please try again.");
      setTimeout(() => {
        navigate("/products");
      }, 1000);
    }
  };

  return (
    <div className="container container-fluid">
      <div className="wrapper my-5">
        <form
          className="shadow-lg"
          encType="multipart/form-data"
          onSubmit={handleCreateProduct}
        >
          <h1 className="mb-4">New Product</h1>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className={`form-control ${!isNameValid ? "is-invalid" : ""}`}
              value={product.name}
              onChange={handleChangeName}
            />
            {!isNameValid && (
              <div className="invalid-feedback">
                {product.name.length <= 50 ? (
                  ""
                ) : (
                  <div>Name should not exceed 50 characters</div>
                )}
                {!/\d/.test(product.name) ? (
                  ""
                ) : (
                  <div>Name should not contain numbers</div>
                )}
                {!/[!@#$%^&*(),.?":{}|<>]/.test(product.name) ? (
                  ""
                ) : (
                  <div>Name should not contain special characters</div>
                )}
              </div>
            )}
          </div>

          {!isPriceValid && (
            <div style={{ color: "red" }}>
              Price should be a positive number
            </div>
          )}

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              className={`form-control ${!isPriceValid ? "is-invalid" : ""}`}
              value={product.price}
              onChange={handleChangePrice}
            />
            {!isPriceValid && (
              <div className="invalid-feedback">Please enter a valid price</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className={`form-control ${
                !isDescriptionValid ? "is-invalid" : ""
              }`}
              id="description"
              value={product.description}
              onChange={handleDescriptionChange}
            />
            {!isDescriptionValid && (
              <div className="invalid-feedback">
                {!isDescriptionLengthValid && (
                  <div>Description should not exceed 1000 characters</div>
                )}
                {isDescriptionLengthValid && (
                  <div>Description should not be empty</div>
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <select
              className={`form-control ${!isCategoryValid ? "is-invalid" : ""}`}
              id="category"
              value={product.category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {!isCategoryValid && (
              <div className="invalid-feedback">
                <div>Category should not be empty</div>
              </div>
            )}
          </div>

          <div className="form-group">
            <select
              className={`form-control ${
                !isSubCategoryValid ? "is-invalid" : ""
              }`}
              id="subCategory"
              value={product.subCategory}
              onChange={handleSubCategoryChange}
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.name}>
                  {subcategory.name}
                </option>
              ))}
            </select>
            {!isSubCategoryValid && (
              <div className="invalid-feedback">
                <div>Subcategory should not be empty</div>
              </div>
            )}
          </div>

          <div className="form-group">
            <select
              className={`form-control ${!isSizeValid ? "is-invalid" : ""}`}
              id="size"
              value={product.size}
              onChange={handleChangeSize}
            >
              <option value="">Select Size</option>
              {sizes?.map((size) => (
                <option key={size.id} value={size.name}>
                  {size.name}
                </option>
              ))}
            </select>
            {!isSizeValid && (
              <div className="invalid-feedback">
                <div>Size should not be empty</div>
              </div>
            )}
          </div>

          <div className="form-group">
            <select
              className={`form-control ${!isColorValid ? "is-invalid" : ""}`}
              id="color"
              value={product.color}
              onChange={handleColorChange}
            >
              <option value="">Select Color</option>
              {colors.map((color) => (
                <option key={color.id} value={color.name}>
                  {color.name}
                </option>
              ))}
            </select>
            {!isColorValid && (
              <div className="invalid-feedback">
                <div>Color should not be empty</div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              className={`form-control ${!isStockValid ? "is-invalid" : ""}`}
              value={product.stock}
              onChange={handleStockChange}
            />
            {!isStockValid && (
              <div className="invalid-feedback">
                <div>
                  Stock should not be empty and must be a non-negative number
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Images</label>
            <div className="custom-file">
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="product_images"
                className="custom-file-input"
                id="customFile"
                onChange={handleChangeImage}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose Images
              </label>
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>

          <button type="submit" className="btn btn-block py-3">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
