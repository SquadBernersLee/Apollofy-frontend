
import React from "react";
import { it, expect, describe, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import SearchBarPage from "../../src/pages/searchPage";
import { AuthProvider } from "../../src/contexts/AuthContext";
import { FilterProvider } from "../../src/contexts/FilterContext";
import { MemoryRouter } from "react-router-dom";
import useSearchResults from "../../src/services/services.search";


vi.mock("../../src/services/services.search", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("Search bar fetch results", () => {
  it("should display search results", async () => {
   
    const mockResults = {
      songs: [
        {
          id: 1,
          name: "Multitude",
          artist: "Stromae",
          thumbnail: "thumbnail1.jpg",
        },
      ],
      artists: [
        {
          id: 2,
          first_name: "Oques Grasses",
          img: "artist2.jpg",
        },
      ],
      albums: [
        {
          id: 3,
          name: "Lamperetes",
          artist: "Antònia Font",
          imageUrl: "album1.jpg",
        },
      ],
    };

    useSearchResults.mockReturnValue(mockResults);

    render(
      <MemoryRouter>
        <FilterProvider>
          <AuthProvider>
            <SearchBarPage />
          </AuthProvider>
        </FilterProvider>
      </MemoryRouter>
    );

  
    const input = screen.getByLabelText("Search Bar");
    fireEvent.change(input, { target: { value: "Stromae" } });

    
    await waitFor(() => {
      expect(screen.getByText("Multitude")).toBeInTheDocument();
      expect(screen.getByText("Oques Grasses")).toBeInTheDocument();
      expect(screen.getByText("Lamperetes")).toBeInTheDocument();
    });
  });

  it("should display 'No songs/artists/album found' when no song/artist/album results", async () => {
    const mockResults = {
      songs: [],
      artists: [],
      albums: [],
    };

    useSearchResults.mockReturnValue(mockResults);

    render(
      <MemoryRouter>
        <FilterProvider>
          <AuthProvider>
            <SearchBarPage />
          </AuthProvider>
        </FilterProvider>
      </MemoryRouter>
    );

    
    const input = screen.getByLabelText("Search Bar");
    fireEvent.change(input, { target: { value: "Unknown Artist" } });

   
    await waitFor(() => {
      expect(screen.getByText("No songs found")).toBeInTheDocument();
      expect(screen.getByText("No artists found")).toBeInTheDocument();
      expect(screen.getByText("No albums found")).toBeInTheDocument();
    });
  });
});
