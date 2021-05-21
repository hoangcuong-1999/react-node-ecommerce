import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../title/Title";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import Swal from "sweetalert2";
import { USER_DELETE_RESET } from "../../constants/userConstants";
import UserTable from "./UserTable";

function UserShow() {
  const [query, setQuery] = useState("");
  const searchColumns = ["name", "email"];
  const userList = useSelector((state) => state.userList);
  const { users, loading: userListLoading, error: userListError } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const { deletedUser } = userDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  useEffect(() => {
    if (deletedUser) {
      Swal.fire("Success!", "User has ben deleted.", "success");
      dispatch({ type: USER_DELETE_RESET });
      dispatch(listUser());
    }
  }, [deletedUser, dispatch]);

  const search = (users) => {
    return users.filter((user) =>
      searchColumns.some(
        (column) => user[column].toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );
  };

  return (
    <>
      <section className="user-show" id="user-show">
        <Title>Users</Title>
        <div className="_breadcrumb">
          <Link to="/">Home</Link> / Users
        </div>
        <div className="product-table">
          <div className="product-table__options">
            <div className="options options__search">
              <form>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">
                  <i class="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>

          {userListLoading ? (
            <LoadingBox />
          ) : userListError ? (
            <ErrorBox>{userListError}</ErrorBox>
          ) : (
            <UserTable users={search(users)} />
          )}
        </div>
      </section>
    </>
  );
}

export default UserShow;
