import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import AudioPlayer from "../../src/components/audioPlayer/index";
import "@testing-library/jest-dom/vitest";
import { AuthProvider } from "../../src/contexts/AuthContext";

describe("Audioplayer", () => {
  it("should render play and pause button", () => {
    render(
      <AuthProvider>
        <AudioPlayer />
      </AuthProvider>
    );
    const button = screen.getByRole("button", { name: "Play Pause" });
    expect(button).toBeInTheDocument();
  });
});
