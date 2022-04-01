import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Add_Category_Page } from "../../../utils/PageTitle";
import Button from "../../../components/Button";
import LoadingDots from "../../../components/Loading";
import SideBar from "../../../components/Admin/SideBar";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import axios from "axios";
import { getCategory } from "../../../redux/thunkApi/categoryApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../styles/addCategory.scss";
import { PUBLIC_URL } from "../../../utils/BaseUrl";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  let catNameArray = [];

  const addCategorySchema = yup
    .object({
      categoryName: yup
        .string()
        .required("Required")
        .test("existingCategory", "Category already exists", (value) => {
          if (value && catNameArray.includes(value)) {
            return false;
          } else {
            return true;
          }
        }),
      categoryImage: yup
        .mixed()
        .required("Image is required")
        .test("required", "Required", (value) => {
          return value && value.length > 0;
        })
        .test("fileType", "Images Only", (value) => {
          if (value && value.length > 0) {
            if (SUPPORTED_FORMATS.includes(value[0].type)) {
              return true;
            } else {
              return false;
            }
          }
        }),
    })
    .required();

  const {
    register,
    handleSubmit,
    getValues,
    watch,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCategorySchema),
  });

  const [hideSideBar, setHideSideBar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.Category);

  const watchImage = watch("categoryImage", "");

  const submitHandler = async (data) => {
    const formdata = new FormData();
    formdata.append("name", data.categoryName);
    formdata.append("categoryImage", data.categoryImage[0]);

    try {
      const res = await axios.post(`/api/category/create`, formdata);
      toast.success(res.data.message);
      if (res.data.message) {
        navigate("/admin/category");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    let mounted = true;
    document.title = Add_Category_Page;

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

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  if (categories && categories.length > 0) {
    categories.map((elem) => {
      catNameArray.push(elem.name);
    });
  }

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="add-category-container">
          <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
            <SideBar select="category" />
          </div>
          <div className="form-container">
            <div className="container">
              <div className="heading-container">
                <Icon
                  icon="charm:menu-hamburger"
                  onClick={toggleSideBar}
                  className="toggle-sidebar"
                />

                <p className="heading">Add Category</p>
              </div>

              <div className="form-wrapper">
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  encType="multipart/form-data"
                >
                  <div className="form-wrapper-container">
                    <div className="category-image">
                      {getValues("categoryImage") &&
                      getValues("categoryImage").length > 0 ? (
                        <img
                          src={URL.createObjectURL(
                            getValues("categoryImage")[0]
                          )}
                          alt=""
                          className="img"
                        />
                      ) : (
                        <img
                          src={`${PUBLIC_URL}/images/default-profile.png`}
                          alt=""
                          className="img"
                        />
                      )}

                      <label htmlFor="imageChange" className="image-label">
                        Category Image
                      </label>
                      <p className="error">
                        {errors.categoryImage?.message || "\u00A0"}
                      </p>
                      <input
                        type="file"
                        id="imageChange"
                        accept=".png, .jpg, .jpeg"
                        className="category-image-input"
                        {...register("categoryImage")}
                      ></input>
                    </div>

                    <div className="category-name">
                      <label htmlFor="categoryName">Category Name</label>
                      <input
                        type="text"
                        id="categoryName"
                        placeholder="Category Name"
                        // required
                        {...register("categoryName")}
                      ></input>

                      <p className="error">
                        {errors.categoryName?.message || "\u00A0"}
                      </p>

                      <div className="btn-container">
                        <Button
                          className="add-category-button"
                          text="Add Category"
                        />
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

export default AddCategory;
