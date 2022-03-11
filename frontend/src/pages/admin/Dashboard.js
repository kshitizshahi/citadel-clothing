import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/dashboard.scss";
import { Admin_Page_Dashboard } from "../../utils/PageTitle";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/thunkApi/userApi";
import { logoutUser, validateUser } from "../../redux/thunkApi/authApi";
import { BASE_URL } from "../../utils/BaseUrl";
import { clearError, clearuserUpdate } from "../../redux/slice/userSlice";
import LoadingDots from "../../components/Loading";
import SideBar from "../../components/Admin/SideBar";

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userImage, setUserImage] = useState([]);

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
    dispatch(
      updateUser({ firstName, lastName, email, phoneNumber, userImage })
    );
    // dispatch(resetSuccess());
  };

  const changePasswordHandler = (e) => {
    navigate("/change-password");
  };

  // useEffect(() => {
  //   document.title = Profile_Page_Title;

  //success value is toggled after update success

  //   if (error && error.message) {
  //     dispatch(logoutUser({}));
  //     dispatch(clearError());
  //   } else if (userUpdate && userUpdate.data) {
  //     dispatch(validateUser({}));
  //     toast.success(userUpdate.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }

  //   if (userInfo && fetchSuccess) {
  //     setFirstName(userInfo.firstName);
  //     setLastName(userInfo.lastName);
  //     setEmail(userInfo.email);
  //     setPhoneNumber(userInfo.phoneNumber);
  //     setUserImage(userInfo.profileImage);
  //   }
  // }, [success, isValid, loaded]);

  useEffect(() => {
    document.title = Admin_Page_Dashboard;

    if (error && error.message) {
      dispatch(logoutUser({}));
      dispatch(clearError());
    } else if (userUpdate && userUpdate.data) {
      toast.success(userUpdate.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(clearuserUpdate());
    }
    if (userInfo && fetchSuccess) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
      setPhoneNumber(userInfo.phoneNumber);
      // setUserImage(userInfo.profileImage);
    }
  }, [isValid, fetchSuccess]);

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="admin-dashboard-container">
          <div className="side-bar">
            <SideBar dashboard="current" height="90vh" />
          </div>
          <div className="table-container">
            <div className="container">
              <p className="heading">Products</p>
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Sn</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Mark Price</th>
                      <th>Discount</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Adidas</td>
                      <td>Puma</td>
                      <td>Puma</td>
                      <td>Puma</td>
                      <td>Puma</td>
                      <td>Puma</td>
                    </tr>
                    <tr>
                      <td>Adidas</td>
                      <td>Puma</td>
                      <td>Puma</td>
                      <td>Puma</td>
                      <td>Puma</td>
                      <td>Puma</td>
                    </tr>
                    <tr>
                      <td>Adidas</td>
                      <td>Puma</td>
                      <td>Puma</td>
                      <td>Puma</td>
                      <td>Puma</td>
                      <td>Puma</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
