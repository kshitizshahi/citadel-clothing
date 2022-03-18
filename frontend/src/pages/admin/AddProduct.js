import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Add_Product_Page } from "../../utils/PageTitle";
import Button from "../../components/Button";
import LoadingDots from "../../components/Loading";
import SideBar from "../../components/Admin/SideBar";
import { Icon } from "@iconify/react";
import DropZone from "../../components/DropZone";
import { toast } from "react-toastify";
import axios from "axios";
import TextEditor from "../../components/TextEditor";
import "../../styles/addProduct.scss";
import { getCategory } from "../../redux/thunkApi/categoryApi";
import SelectBox from "../../components/SelectBox";

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState([]);
  const [discount, setDiscount] = useState("");
  const [markPrice, setMarkPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [hideSideBar, setHideSideBar] = useState(false);
  const editorRef = useRef(null);

  let selectArray = [];
  let selectSubCatArray = [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, productCategory } = useSelector(
    (state) => state.Category
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    // if (selectSubCatArray.length === 0) {
    //   setSubCategory("");
    // }

    if (productImage.length > 4) {
      toast.error("Cannot upload more than 4 images", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const formdata = new FormData();
      formdata.append("name", productName);
      formdata.append("markPrice", markPrice);
      formdata.append("discount", discount);
      formdata.append("brand", brand);
      formdata.append("stock", stock);
      formdata.append("category", category);
      formdata.append("subCategory", subCategory);

      for (let i = 0; i < productImage.length; i++) {
        formdata.append("images", productImage[i]);
      }

      // dispatch();
      //   updateUser({ firstName, lastName, email, phoneNumber, userImage })

      if (editorRef.current) {
        formdata.append("description", editorRef.current.getContent());
        console.log(editorRef.current.getContent());
      }

      const res = await axios.post(`/api/products/create`, formdata);
      console.log(res);

      toast.success(res.data.message);

      if (res.data.message) {
        navigate("/admin/product");
      }
    }
  };

  useEffect(() => {
    document.title = Add_Product_Page;
  }, []);

  useEffect(() => {
    if (!productCategory) {
      dispatch(getCategory({}));
    } else {
      setCategories(productCategory.category);
    }
  }, [success]);

  useEffect(async () => {
    if (category !== "") {
      const res = await axios.get(`/api/sub-category/get/${category}`);
      setSubCategories(res.data.data);
    }
  }, [category]);

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  const onImagesChange = (dropDownImages) => {
    setProductImage(dropDownImages);
  };

  if (categories && categories.length > 0) {
    let name = "selected";
    categories.map((elem, index) => {
      selectArray.push({
        value: elem._id,
        label: elem.name,
      });
    });

    selectArray.push({
      value: "2",
      label: name,
      selected: true,
    });
  }

  if (subCategories && subCategories.length > 0) {
    subCategories.map((elem, index) => {
      selectSubCatArray.push({
        value: elem._id,
        label: elem.name,
      });
    });
  }

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="add-product-container">
          <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
            <SideBar current="addProduct" select="product" />
          </div>
          <div
            className={hideSideBar ? "form-container full" : "form-container"}
          >
            <div className="container">
              <div className="heading-container">
                <Icon
                  icon="charm:menu-hamburger"
                  onClick={toggleSideBar}
                  className="toggle-sidebar"
                />

                <p className="heading">Add Product</p>
              </div>

              <div className="form-wrapper">
                <form onSubmit={submitHandler} encType="multipart/form-data">
                  <div className="form-wrapper-container">
                    <div className="first-container">
                      <div>
                        <label htmlFor="productName">Product Name</label>
                        <input
                          type="text"
                          id="productName"
                          placeholder="Product Name"
                          value={productName}
                          // required
                          onChange={(e) => setProductName(e.target.value)}
                        ></input>
                      </div>

                      <div>
                        <label className="description-label">Description</label>
                        <div className="editor">
                          <TextEditor ref={editorRef} />
                        </div>
                      </div>
                      <div>
                        <label className="image-label">Images</label>
                        <DropZone
                          onImagesChange={onImagesChange}
                          showPreview={true}
                        />
                      </div>
                    </div>
                    <div className="second-container">
                      <div className="container">
                        <div>
                          <label htmlFor="productName">Category</label>
                          {/* <select
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                          >
                            <option placeholder="Select Category">
                              Select Category
                            </option>

                            {categories &&
                              categories.map((elem, index) => (
                                <option key={index} value={elem._id}>
                                  {elem.name}
                                </option>
                              ))}
                          </select> */}
                          <span className="select">
                            <SelectBox
                              // value={category}
                              change={setCategory}
                              placeholder="Select category"
                              data={selectArray}
                            />
                          </span>
                        </div>
                        <div>
                          <label htmlFor="productName">Sub Category</label>
                          <span className="select">
                            <SelectBox
                              value={selectSubCatArray.length === 0 && null}
                              change={
                                selectSubCatArray.length > 0
                                  ? setSubCategory
                                  : null
                              }
                              placeholder="Select sub category"
                              data={selectSubCatArray}
                            />
                          </span>
                        </div>
                        <div>
                          <label htmlFor="markPrice">Mark Price</label>
                          <input
                            type="number"
                            id="markPrice"
                            placeholder="0"
                            min="0"
                            value={markPrice}
                            // required
                            onChange={(e) => setMarkPrice(e.target.value)}
                          ></input>
                        </div>
                        <div>
                          <label htmlFor="discount">Discount</label>
                          <input
                            type="number"
                            id="discount"
                            min="0"
                            max="100"
                            value={discount}
                            placeholder="0"
                            onChange={(e) => setDiscount(e.target.value)}
                          ></input>
                        </div>
                        <div>
                          <label htmlFor="brand">Brand</label>
                          <input
                            type="text"
                            id="brand"
                            placeholder="Brand"
                            value={brand}
                            // required
                            onChange={(e) => setBrand(e.target.value)}
                          ></input>
                        </div>
                        <div>
                          <label htmlFor="stock">Stock</label>
                          <input
                            type="number"
                            id="stock"
                            placeholder="0"
                            min="0"
                            value={stock}
                            // required
                            onChange={(e) => setStock(e.target.value)}
                          ></input>
                        </div>
                        <div className="btn-container">
                          <Button
                            className="add-product-button"
                            text="Add Product"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
