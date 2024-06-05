import { it, expect, describe, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ArtistPage from "../../src/pages/artistPage";
import useArtist from "../../src/services/services.artist";
import React from "react";
import { AuthProvider } from "../../src/contexts/AuthContext";
import { useParams } from "react-router";


vi.mock("../../src/services/services.artist", () => ({
  __esModule: true,
  default: vi.fn(),
}));


vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useParams: vi.fn(),
}));

describe("ArtistPage", () => {
  it("should display artist information correctly", async () => {
    const mockArtist = {
      first_name: "Stromae",
      img: "artist1.jpg",
      ArtistTracks: [
        {
          Track: {
            id: 1,
            name: "Song 1",
            thumbnail: "thumbnail1.jpg",
          },
        },
      ],
      AlbumArtist: [
        {
          Album: {
            id: 1,
            name: "Album 1",
            imageUrl: "album1.jpg",
          },
        },
      ],
    };

    useArtist.mockReturnValue(mockArtist);
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ userId: "1" });

    render(
      <MemoryRouter initialEntries={["/artist/1"]}>
        <AuthProvider>
          <Routes>
            <Route path="/artist/:userId" element={<ArtistPage />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Stromae")).toBeInTheDocument();
    });

    expect(screen.getByText("Song 1")).toBeInTheDocument();
    expect(screen.getByAltText("Song 1")).toHaveAttribute("src", "thumbnail1.jpg");

    expect(screen.getByText("Album 1")).toBeInTheDocument();
    expect(screen.getByAltText("Album 1")).toHaveAttribute("src", "album1.jpg");
  });

  it("should display 'No artist found' when no artist data", async () => {
    useArtist.mockReturnValue(undefined);
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ userId: "1" });

    render(
      <MemoryRouter initialEntries={["/artist/1"]}>
        <AuthProvider>
          <Routes>
            <Route path="/artist/:userId" element={<ArtistPage />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No artist found. Please provide a valid ID.")).toBeInTheDocument();
    });
  });
});
