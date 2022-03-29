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
import { getCategory } from "../../redux/thunkApi/categoryApi";
import SelectBox from "../../components/SelectBox";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../styles/addProduct.scss";

const addProductSchema = yup
  .object({
    productName: yup.string().required("Required"),
    markPrice: yup.number().required("Required"),
    category: yup.string().required("Required"),
    subCategory: yup.string().required("Required"),
    seller: yup.string().required("Required"),
    discount: yup.number().min(0).max(100).required("Required"),
    brand: yup.string().required("Required"),
    stock: yup.number().min(1).max(100).required("Required"),
    textEditor: yup.string().required("Required"),
  })
  .required();

const AddProduct = () => {
  const [productImage, setProductImage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sellers, setSellers] = useState([]);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductSchema),
  });
  const watchCategory = watch("category", "");
  const watchEditor = watch("textEditor", "");

  const [hideSideBar, setHideSideBar] = useState(false);
  const editorRef = useRef(null);

  let selectCatArray = [];
  let selectSubCatArray = [];
  let selectSellerArray = [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, productCategory } = useSelector(
    (state) => state.Category
  );

  const submitHandler = async (data) => {
    if (productImage.length > 4) {
      toast.error("Cannot upload more than 4 images");
    } else if (productImage.length === 0) {
      toast.error("Please upload product image");
    } else {
      const formdata = new FormData();
      formdata.append("name", data.productName);
      formdata.append("markPrice", data.markPrice);
      formdata.append("discount", data.discount);
      formdata.append("brand", data.brand);
      formdata.append("countInStock", data.stock);
      formdata.append("category", data.category);
      formdata.append("seller", data.seller);
      formdata.append("subCategory", data.subCategory);
      formdata.append("description", data.textEditor);

      for (let i = 0; i < productImage.length; i++) {
        formdata.append("images", productImage[i]);
      }

      // dispatch();
      //   updateUser({ firstName, lastName, email, phoneNumber, userImage })

      // if (editorRef.current) {
      //   formdata.append("description", editorRef.current.getContent());
      //   console.log(editorRef.current.getContent());
      // }

      const res = await axios.post(`/api/products/create`, formdata);
      console.log(data);

      toast.success(res.data.message);

      if (res.data.message) {
        navigate("/admin/product");
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    document.title = Add_Product_Page;
    (async function () {
      const res = await axios.get(`/api/sellers/get/seller`);
      if (mounted) {
        setSellers(res.data.data);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!productCategory) {
      dispatch(getCategory({}));
    } else {
      setCategories(productCategory.category);
      // reset({category:data})
    }
  }, [success]);

  useEffect(async () => {
    if (getValues("category") !== undefined) {
      const res = await axios.get(
        `/api/sub-category/get/${getValues("category")}`
      );
      setSubCategories(res.data.data);
    }
  }, [getValues("category")]);

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  const onImagesChange = (dropDownImages) => {
    setProductImage(dropDownImages);
  };

  if (categories && categories.length > 0) {
    categories.map((elem, index) => {
      selectCatArray.push({
        value: elem._id,
        label: elem.name,
      });
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

  if (sellers && sellers.length > 0) {
    sellers.map((elem, index) => {
      selectSellerArray.push({
        value: elem._id,
        label: elem.fullName,
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
            <SideBar select="product" />
          </div>
          <div className="form-container">
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
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  encType="multipart/form-data"
                >
                  <div className="form-wrapper-container">
                    <div className="first-container">
                      <div>
                        <label htmlFor="productName">Product Name</label>
                        <input
                          type="text"
                          id="productName"
                          placeholder="Product Name"
                          // required
                          {...register("productName")}
                        ></input>

                        <p className="error">
                          {errors.productName?.message || "\u00A0"}
                        </p>
                      </div>

                      <div>
                        <label className="description-label">Description</label>
                        <div className="editor">
                          <Controller
                            control={control}
                            name="textEditor"
                            render={({ field }) => (
                              <TextEditor ref={editorRef} {...field} />
                            )}
                          />
                          <p className="error">
                            {errors?.textEditor?.message || "\u00A0"}
                          </p>
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
                          <label htmlFor="category">Category</label>
                          <span className="select">
                            <Controller
                              control={control}
                              name="category"
                              render={({ field }) => (
                                <SelectBox
                                  // onChange={setCategory}
                                  placeholder="Select category"
                                  data={selectCatArray}
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setValue("subCategory", "");
                                  }}
                                  // error={errors.category?.message || "\u00A0"}
                                />
                              )}
                            />
                            <p className="error">
                              {errors?.category?.message || "\u00A0"}
                            </p>
                          </span>
                        </div>
                        <div>
                          <label htmlFor="subCategory">Sub Category</label>
                          <span className="select">
                            <Controller
                              control={control}
                              name="subCategory"
                              render={({ field }) => (
                                <SelectBox
                                  // value={selectSubCatArray.length === 0 && ""}

                                  placeholder="Select sub category"
                                  data={selectSubCatArray}
                                  {...field}
                                />
                              )}
                            />
                            <p className="error">
                              {errors?.subCategory?.message || "\u00A0"}
                            </p>
                          </span>
                        </div>
                        <div>
                          <label htmlFor="seller">Seller</label>
                          <span className="select">
                            <Controller
                              control={control}
                              name="seller"
                              render={({ field }) => (
                                <SelectBox
                                  placeholder="Select seller"
                                  data={selectSellerArray}
                                  {...field}
                                />
                              )}
                            />
                            <p className="error">
                              {errors?.seller?.message || "\u00A0"}
                            </p>
                          </span>
                        </div>
                        <div>
                          <label htmlFor="markPrice">Mark Price</label>
                          <input
                            type="number"
                            id="markPrice"
                            placeholder="0"
                            min="0"
                            // required
                            {...register("markPrice")}
                          ></input>
                          <p className="error">
                            {errors?.markPrice?.message || "\u00A0"}
                          </p>
                        </div>
                        <div>
                          <label htmlFor="discount">Discount</label>
                          <input
                            type="number"
                            id="discount"
                            // min="0"
                            // max="100"
                            placeholder="0"
                            {...register("discount")}
                          ></input>
                          <p className="error">
                            {errors?.discount?.message || "\u00A0"}
                          </p>
                        </div>
                        <div>
                          <label htmlFor="brand">Brand</label>
                          <input
                            type="text"
                            id="brand"
                            placeholder="Brand"
                            // required
                            {...register("brand")}
                          ></input>
                          <p className="error">
                            {errors?.brand?.message || "\u00A0"}
                          </p>
                        </div>
                        <div>
                          <label htmlFor="stock">Stock</label>
                          <input
                            type="number"
                            id="stock"
                            placeholder="0"
                            // min="1"
                            // required
                            {...register("stock")}
                          ></input>
                          <p className="error">
                            {errors?.stock?.message || "\u00A0"}
                          </p>
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
