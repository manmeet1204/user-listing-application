import type { User } from "../types/user";
import UserRow from "./UserRow";

interface UserTableProps {
  users: User[];
  onSave: (id: number, name: string, enabled: boolean) => void;
  onDelete: (id: number) => void;
}

function UserTable({ users, onSave, onDelete }: UserTableProps) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Provider</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} onSave={onSave} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
