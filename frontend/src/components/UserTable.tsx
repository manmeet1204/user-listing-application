import type { User } from "../types/user";

interface UserTableProps {
  users: User[];
}

function UserTable({ users }: UserTableProps) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Provider</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <span className={user.enabled ? "status-active" : "status-inactive"}>
                {user.enabled ? "Active" : "Inactive"}
              </span>
            </td>
            <td>{user.provider}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
