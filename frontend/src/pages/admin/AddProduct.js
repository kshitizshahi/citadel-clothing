import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/addProduct.scss";
import { Add_Product_Page } from "../../utils/PageTitle";
import Button from "../../components/Button";
import { BASE_URL } from "../../utils/BaseUrl";
import LoadingDots from "../../components/Loading";
import { Editor } from "@tinymce/tinymce-react";
import SideBar from "../../components/Admin/SideBar";
import { Icon } from "@iconify/react";
import DropZone from "../../components/DropZone";

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState([]);
  const [discount, setDiscount] = useState("");

  const [hideSideBar, setHideSideBar] = useState(false);
  const editorRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userUpdate, loading, error, isValid } = useSelector(
    (state) => state.User
  );
  const {
    userInfo,
    fetchSuccess,
    loading: loadingUser,
  } = useSelector((state) => state.authUser);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    // dispatch();
    //   updateUser({ firstName, lastName, email, phoneNumber, userImage })
    // dispatch(resetSuccess());

    if (editorRef.current) {
      // formdata.append("description", editorRef.current.getContent());
      console.log(editorRef.current.getContent());
    }
  };

  const changePasswordHandler = (e) => {
    navigate("/change-password");
  };

  useEffect(() => {
    document.title = Add_Product_Page;
  }, []);

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  const onImagesChange = (dropDownImages) => {
    setProductImage(dropDownImages);

    // if(dropDownImages.length <=3){
    //   console.log(dropDownImages);
    //   setimages(dropDownImages);
    // }  if ((dropDownImages.length >3)){
    //   for(let i = 3; i < dropDownImages.length; i++){
    //     // setMaxFiles(dropDownImages.splice(3, dropDownImages.length));
    //     childRef.current.deleteImage(dropDownImages[i])
    //   }
    //   Toast.fire({
    //     icon: "info",
    //     title: "Cannot upload more than 3 images"
    //   })
    // }
  };

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="add-product-container">
          <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
            <SideBar product="current" />
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
                          <Editor
                            apiKey={process.env.REACT_APP_TINYMCE}
                            onInit={(evt, editor) =>
                              (editorRef.current = editor)
                            }
                            // initialValue="<p>Initial content.</p>"
                            init={{
                              min_height: 175,
                              height: 210,
                              menubar: false,
                              placeholder: "Product description",
                              max_height: 225,
                              skin: "material-outline",
                              icons: "small",
                              // skin: "oxide-dark",

                              content_css: ["/tinyMce.css"],

                              plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                              ],
                              toolbar:
                                "undo redo | formatselect | " +
                                "bold italic backcolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                              // content_style:
                              //   "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                          />
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
                      <div>
                        <label htmlFor="productName">Category</label>
                        <select
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        >
                          <option>Select Category</option>
                          <option>name</option>
                          <option>name</option>
                          <option>name</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="productName">Sub-Category</label>
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
                        <label htmlFor="productName">Mark Price</label>
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
                        <label htmlFor="discount">Discount</label>
                        <input
                          type="number"
                          id="discount"
                          min="0"
                          max="100"
                          value={discount}
                          placeholder="Discount"
                          onChange={(e) => setDiscount(e.target.value)}
                        ></input>
                      </div>
                      <div>
                        <label htmlFor="productName">Brand</label>
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
                        <label htmlFor="productName">Stock</label>
                        <input
                          type="text"
                          id="productName"
                          placeholder="Product Name"
                          value={productName}
                          // required
                          onChange={(e) => setProductName(e.target.value)}
                        ></input>
                      </div>
                      <div className="btn-container">
                        <Button
                          className="update-button"
                          text="Update Profile"
                        />
                        <Button
                          className="change-password-button"
                          text="Change Password"
                          onClick={changePasswordHandler}
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

export default AddProduct;
