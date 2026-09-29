import { useState } from "react";
import { createUser, getErrorMessage } from "../api/userApi";

interface CreateUserFormProps {
  onCreated: () => void;
}

function CreateUserForm({ onCreated }: CreateUserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    createUser({ name, email })
      .then(() => {
        setName("");
        setEmail("");
        onCreated();
      })
      .catch((err) => {
        setError(getErrorMessage(err, "Could not create user."));
      });
  }

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}

export default CreateUserForm;
