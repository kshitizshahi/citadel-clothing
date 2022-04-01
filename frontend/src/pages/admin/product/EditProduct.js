import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Edit_Product_Page } from "../../../utils/PageTitle";
import Button from "../../../components/Button";
import LoadingDots from "../../../components/Loading";
import SideBar from "../../../components/Admin/SideBar";
import { Icon } from "@iconify/react";
import DropZone from "../../../components/DropZone";
import { toast } from "react-toastify";
import axios from "axios";
import TextEditor from "../../../components/TextEditor";
import { getCategory } from "../../../redux/thunkApi/categoryApi";
import SelectBox from "../../../components/SelectBox";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_URL } from "../../../utils/BaseUrl";
import "../../../styles/editProduct.scss";

const editProductSchema = yup
  .object({
    productName: yup.string().required("Required"),
    markPrice: yup.number().required("Required"),
    category: yup.string().required("Required"),
    subCategory: yup.string().required("Required"),
    seller: yup.string().required("Required"),
    discount: yup.number().required("Required"),
    brand: yup.string().required("Required"),
    stock: yup.string().required("Required"),
    textEditor: yup.string().required("Required"),
  })
  .required();

const EditProduct = () => {
  const [productImage, setProductImage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [images, setImages] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [imageRemove, setImageRemove] = useState([]);
  const childDropZoneRef = useRef();

  let { id } = useParams();

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
    resolver: yupResolver(editProductSchema),
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

  const { loading } = useSelector((state) => state.Category);

  const submitHandler = async (data) => {
    if (images.length + productImage.length > 4) {
      toast.error("Cannot upload more than 4 images");
    } else if (images.length + productImage.length === 0) {
      toast.error("Please upload product image");
    } else {
      const formdata = new FormData();
      formdata.append("name", data.productName);
      formdata.append("markPrice", data.markPrice);
      formdata.append("discount", data.discount);
      formdata.append("brand", data.brand);
      formdata.append("countInStock", data.stock);
      formdata.append("category", data.category);
      formdata.append("subCategory", data.subCategory);
      formdata.append("seller", data.seller);
      formdata.append("description", data.textEditor);

      for (let i = 0; i < productImage.length; i++) {
        formdata.append("images", productImage[i]);
      }

      if (imageRemove.length > 0) {
        try {
          const response = await axios.put(`/api/products/delete/image/${id}`, {
            removeDBImages: imageRemove,
          });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }

      // if (editorRef.current) {
      //   formdata.append("description", editorRef.current.getContent());
      //   console.log(editorRef.current.getContent());
      // }

      try {
        const res = await axios.put(`/api/products/update/${id}`, formdata);
        toast.success(res.data.message);

        if (res.data.message) {
          navigate("/admin/product");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    document.title = Edit_Product_Page;
    (async function () {
      try {
        const res = await axios.get(`/api/sellers/get/seller`);
        if (mounted) {
          setSellers(res.data.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`/api/products/get/${id}`);
        const product = response.data.product;

        setProductDetails(product);
        setValue("productName", product.name);
        setValue("textEditor", product.description);
        setValue("markPrice", product.markPrice);
        setValue("discount", product.discount);
        setValue("brand", product.brand);
        setValue("stock", product.countInStock);
        setValue("category", product.category?._id);
        setValue("subCategory", product.subCategory?._id);
        setValue("seller", product.seller?._id);
        setImages(product.images);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();

    return () => {
      setProductDetails({});
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async function () {
      const response = await dispatch(getCategory({}));
      if (mounted) {
        setCategories(response.payload.category);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  useEffect(async () => {
    if (getValues("category") !== undefined) {
      try {
        const res = await axios.get(
          `/api/sub-category/get/category/${getValues("category")}`
        );
        setSubCategories(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
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

  const previewImages = productImage.map((previewFile, index) => (
    <div key={index} className="preview-single-image">
      <img src={URL.createObjectURL(previewFile)} className="image-style" />

      <Icon
        icon="ci:close-big"
        className="preview-close"
        onClick={() => childDropZoneRef.current.deleteImage(previewFile, index)}
      />
    </div>
  ));

  const deleteImage = (image, index) => {
    const filterImage = images.filter((elem, ind) => {
      return ind !== index;
    });

    setImageRemove([...imageRemove, image]);
    setImages(filterImage);
  };

  return (
    <div>
      <div>
        {loading ? (
          <LoadingDots />
        ) : (
          <div className="edit-product-container">
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

                  <p className="heading">Edit Product</p>
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
                            // value={productName}
                            // required
                            {...register("productName")}
                          ></input>

                          <p className="error">
                            {errors.productName?.message || "\u00A0"}
                          </p>
                        </div>

                        <div>
                          <label className="description-label">
                            Description
                          </label>
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
                            showPreview={false}
                            ref={childDropZoneRef}
                          />
                        </div>
                        <div className="preview">
                          {images.map((image, index) => (
                            <div key={index} className="preview-single-image">
                              <img
                                src={`${BASE_URL}/${image}`}
                                className="image-style"
                              />

                              <Icon
                                icon="ci:close-big"
                                className="preview-close"
                                onClick={() => deleteImage(image, index)}
                              />
                            </div>
                          ))}
                          <div className="preview-drop-zone">
                            {previewImages}
                          </div>
                        </div>
                      </div>
                      <div className="second-container">
                        <div className="container">
                          <div>
                            <label htmlFor="category">Category</label>
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
                                    value={selectSubCatArray.length === 0 && ""}
                                    // onChange={
                                    //   selectSubCatArray.length > 0
                                    //     ? setSubCategory
                                    //     : null
                                    // }
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
                              min="0"
                              max="100"
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
                              {...register("brand")}
                              // required
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
                              min="0"
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
                              text="Update Product"
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
    </div>
  );
};

export default EditProduct;
