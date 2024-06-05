import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import AudioPlayer from "../../src/components/audioPlayer/index";
import "@testing-library/jest-dom/vitest";
import { AuthProvider } from "../../src/contexts/AuthContext";
import React from "react";

describe("Audioplayer", () => {
  it("should render skip back button", () => {
    render(
      <AuthProvider>
        <AudioPlayer />
      </AuthProvider>
    );
    const button = screen.getByRole("button", { name: "Skip Back" });
    expect(button).toBeInTheDocument();
  });
});
