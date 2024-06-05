import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import SearchBarPage from "../../src/pages/searchPage";
import { AuthProvider } from "../../src/contexts/AuthContext";
import { FilterProvider } from "../../src/contexts/FilterContext";
import { MemoryRouter } from "react-router";

describe("Search bar input", () => {
  it("should render search bar input", () => {
    render(
      <MemoryRouter>
        <FilterProvider>
          <AuthProvider>
            <SearchBarPage />
          </AuthProvider>
        </FilterProvider>
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox", { name: "Search Bar" });
    expect(input).toBeInTheDocument();
  });
});
