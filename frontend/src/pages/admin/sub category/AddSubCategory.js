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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectBox from "../../../components/SelectBox";
import "../../../styles/addSubCategory.scss";
import {
  CREATE_SUBCATEGORY,
  GET_ALL_SUBCATEGORY,
} from "../../../utils/BaseUrl";

const AddSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  let selectCategoryArray = [];
  let subCatNameArray = [];

  const addSubCategorySchema = yup
    .object({
      subCategoryName: yup
        .string()
        .required("This field is required.")
        .test("existingSubCategory", "Sub category already exists", (value) => {
          if (value && subCatNameArray.includes(value)) {
            return false;
          } else {
            return true;
          }
        }),
      category: yup.string().required("This field is required."),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(addSubCategorySchema),
  });

  const [hideSideBar, setHideSideBar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.Category);
  const { mobileDevice } = useSelector((state) => state.Media);

  const submitHandler = async (data) => {
    try {
      const res = await axios.post(CREATE_SUBCATEGORY, {
        name: data.subCategoryName,
        category: data.category,
      });
      toast.success(res.data.message);
      if (res.data.message) {
        navigate("/admin/sub-category");
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

  useEffect(() => {
    let mounted = true;
    (async function () {
      try {
        const response = await axios.get(GET_ALL_SUBCATEGORY);
        if (mounted) {
          setSubCategories(response.data.subCategory);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  if (categories && categories.length > 0) {
    categories.map((elem) => {
      selectCategoryArray.push({
        value: elem._id,
        label: elem.name,
      });
    });
  }

  if (subCategories && subCategories.length > 0) {
    subCategories.map((elem) => {
      subCatNameArray.push(elem.name);
    });
  }

  if (mobileDevice && hideSideBar) {
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.height = "";
    document.body.style.overflow = "";
  }

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="add-subCategory-container">
          {!mobileDevice ? (
            <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
              <SideBar select="sub-category" />
            </div>
          ) : (
            <div
              className={hideSideBar ? "admin-side-bar" : "admin-side-bar none"}
              style={{ width: hideSideBar ? "26rem" : "0" }}
            >
              <div className="close">
                <Icon
                  icon="ci:close-big"
                  className="cancel-btn"
                  onClick={toggleSideBar}
                />
              </div>
              <SideBar select="sub-category" />
            </div>
          )}
          <div className="form-container">
            <div className="container">
              <div className="heading-container">
                <Icon
                  icon="charm:menu-hamburger"
                  onClick={toggleSideBar}
                  className="toggle-sidebar"
                />

                <p className="heading">Add Sub Category</p>
              </div>

              <div className="form-wrapper">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="form-wrapper-container">
                    <div className="sub-category-name">
                      <label htmlFor="subCategoryName">Sub Category Name</label>
                      <input
                        type="text"
                        id="subCategoryName"
                        placeholder="Sub Category Name"
                        {...register("subCategoryName")}
                      ></input>

                      <p className="error">
                        {errors.subCategoryName?.message || "\u00A0"}
                      </p>
                    </div>
                    <div className="select">
                      <label htmlFor="category">Category</label>
                      <span>
                        <Controller
                          control={control}
                          name="category"
                          render={({ field }) => (
                            <SelectBox
                              placeholder="Select category"
                              data={selectCategoryArray}
                              {...field}
                            />
                          )}
                        />
                        <p className="error">
                          {errors?.category?.message || "\u00A0"}
                        </p>
                      </span>
                    </div>

                    <div className="btn-container">
                      <Button
                        className="add-sub-category-button"
                        text="Add Sub Category"
                      />
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

export default AddSubCategory;
