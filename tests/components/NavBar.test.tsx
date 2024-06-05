import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { AuthProvider } from "../../src/contexts/AuthContext";
import HomePage from "../../src/pages/home";
import SearchBarPage from "../../src/pages/searchPage";
import { MySongs } from "../../src/pages/mySongs";

import { FilterProvider } from "../../src/contexts/FilterContext";




describe("NavBar visibility", () => {
  const renderWithRouter = (route) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <FilterProvider>
          <AuthProvider>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              
              <Route path="/search" element={<SearchBarPage />} />
              <Route path="/mySongs" element={<MySongs />} />
            </Routes>
          </AuthProvider>
        </FilterProvider>
      </MemoryRouter>
    );
  };

  it("should display NavBar on the home page", async () => {
    renderWithRouter("/home");

    const navbars = await screen.findAllByTestId("navbar");
    expect(navbars).toHaveLength(1);
  });



  it("should display NavBar on the search page", async () => {
    renderWithRouter("/search");

    const navbars = await screen.findAllByTestId("navbar");
    expect(navbars).toHaveLength(1);
  });

  it("should display NavBar on my songs page", async () => {
    renderWithRouter("/mysongs");

    const navbars = await screen.findAllByTestId("navbar");
    expect(navbars).toHaveLength(1);
  });
});
