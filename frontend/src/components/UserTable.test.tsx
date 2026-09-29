import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UserTable from "./UserTable";
import type { User } from "../types/user";

const mockUsers: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    enabled: true,
    provider: "local",
    createdAt: "2026-01-01T00:00:00",
    updatedAt: "2026-01-01T00:00:00",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    enabled: false,
    provider: "google",
    createdAt: "2026-01-02T00:00:00",
    updatedAt: "2026-01-02T00:00:00",
  },
];

describe("UserTable", () => {
  it("renders each user's name, email, and status", () => {
    render(<UserTable users={mockUsers} onSave={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();

    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });
});
