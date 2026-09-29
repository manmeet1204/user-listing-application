import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("calls onChange with the new value when the input changes", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Search by name or email...");
    fireEvent.change(input, { target: { value: "alice" } });

    expect(handleChange).toHaveBeenCalledWith("alice");
  });
});
