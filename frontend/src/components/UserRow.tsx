import { useState } from "react";
import type { User } from "../types/user";

interface UserRowProps {
  user: User;
  onSave: (id: number, name: string, enabled: boolean) => void;
  onDelete: (id: number) => void;
}

function UserRow({ user, onSave, onDelete }: UserRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEnabled, setEditEnabled] = useState(user.enabled);

  function handleSave() {
    onSave(user.id, editName, editEnabled);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditName(user.name);
    setEditEnabled(user.enabled);
    setIsEditing(false);
  }

  function handleDelete() {
    if (window.confirm(`Delete ${user.name}? This cannot be undone.`)) {
      onDelete(user.id);
    }
  }

  if (isEditing) {
    return (
      <tr>
        <td>
          <input value={editName} onChange={(e) => setEditName(e.target.value)} />
        </td>
        <td>{user.email}</td>
        <td>
          <input
            type="checkbox"
            checked={editEnabled}
            onChange={(e) => setEditEnabled(e.target.checked)}
          />
        </td>
        <td>{user.provider}</td>
        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
        <td>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <span className={user.enabled ? "status-active" : "status-inactive"}>
          {user.enabled ? "Active" : "Inactive"}
        </span>
      </td>
      <td>{user.provider}</td>
      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
      <td>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default UserRow;
