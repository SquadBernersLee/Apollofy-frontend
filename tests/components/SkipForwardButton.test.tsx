import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import AudioPlayer from "../../src/components/audioPlayer/index";
import "@testing-library/jest-dom/vitest";
import { AuthProvider } from "../../src/contexts/AuthContext";

describe("Audioplayer", () => {
  it("should render skip forward button", () => {
    render(
      <AuthProvider>
        <AudioPlayer />
      </AuthProvider>
    );
    const button = screen.getByRole("button", { name: "Skip Forward" });
    expect(button).toBeInTheDocument();
  });
});
