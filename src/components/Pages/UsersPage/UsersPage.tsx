import { useLoaderData } from "react-router-dom";
import { instance } from "../../../api/api";
import { IUser } from "../../../types/types";
import Moment from "react-moment";
import s from "./UsersPage.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

export const userLoader = async () => {
  const { data } = await instance.get<IUser>("/user/all");
  return data;
};

const UsersPage: React.FC = () => {
  const users = useLoaderData() as IUser[];

  return (
    <div className={s.usersPageWrapper}>
      <table>
        <thead className={s.tableHeader}>
          <tr>
            <td>
              <div className={s.inputSearchWrapper}>
                <div className={s.iconSearch}>
                  <AiOutlineSearch className={s.iconSearch} />
                </div>
                <input type="search" placeholder="Search for users" />
              </div>
            </td>
            <td>Name</td>
            <td>Status</td>
            <td>Registered</td>
          </tr>
        </thead>
        <tbody className={s.tableBody}>
          {users?.length
            ? users.map((user: IUser) => (
                <tr key={user.id}>
                  <td> {user.avatarUrl}</td>
                  <td> {user.fullName}</td>
                  <td> {user.role}</td>
                  <td>
                    <Moment fromNow>{user.createAt}</Moment>
                  </td>
                  <td>
                    <button>Subscrip</button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};
export default UsersPage;
