import { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";
import type { User } from "../types/user";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  function loadUsers() {
    setLoading(true);
    setError(null);
    getUsers()
      .then((data) => setUsers(data))
      .catch(() => setError("Could not load users. Please try again."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const term = searchTerm.toLowerCase();
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term),
  );

  return (
    <div className="users-page">
      <h1>Users</h1>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {loading && <p>Loading users...</p>}

      {!loading && error && (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={loadUsers}>Retry</button>
        </div>
      )}

      {!loading && !error && users.length === 0 && <p>No users yet.</p>}

      {!loading && !error && users.length > 0 && filteredUsers.length === 0 && (
        <p>No users match your search.</p>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <div className="table-scroll">
          <UserTable users={filteredUsers} />
        </div>
      )}
    </div>
  );
}

export default UsersPage;
