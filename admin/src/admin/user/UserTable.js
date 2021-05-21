import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserModal from "../modal/UserModal";
import { deleteUser } from "../../actions/userActions";
import { useDispatch } from "react-redux";

function UserTable({ users }) {
  const dispatch = useDispatch();

  const deleteUserHandler = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteUser(userId));
      }
    });
  };

  return (
    <>
      {users.length ? (
        <table>
          <tr>
            <th className="user__count">#</th>
            <th className="user__name">Shop name</th>
            <th className="user__email">Email</th>
            <th className="user__actions">Actions</th>
          </tr>

          {users.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <UserModal profile={user.profile} />
                <Link to="#" onClick={() => deleteUserHandler(user._id)}>
                  <i class="far fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <table className="table__no__data">
          <tr>
            <th className="user__count">#</th>
            <th className="user__name">Shop name</th>
            <th className="user__email">Email</th>
            <th className="user__actions">Actions</th>
          </tr>
          <div className="table__no__data__img">
            <div className="table__no__data__img__wrapper">
              <img src="/assets/img/icon/not-found.png" alt="" />
            </div>
          </div>
          <div className="table__no__data__title">
            <h4>No Data</h4>
          </div>
        </table>
      )}
    </>
  );
}

export default UserTable;
