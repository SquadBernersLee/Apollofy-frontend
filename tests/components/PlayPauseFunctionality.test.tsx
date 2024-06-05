import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen, act } from "@testing-library/react";
import AudioPlayer from "../../src/components/audioPlayer/index";
import "@testing-library/jest-dom/vitest";
import { AuthProvider } from "../../src/contexts/AuthContext";
import ReactPlayer from "react-player";


vi.mock("react-player", () => ({
  __esModule: true,
  default: ({ onProgress, playing, onDuration }) => {
    onDuration(100); 
    let interval;
    if (playing) {
      interval = setInterval(() => {
        onProgress({ playedSeconds: 10, played: 0.1 }); 
      }, 1000);
    }
    return () => clearInterval(interval);
  },
}));

describe("AudioPlayer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });

  it("advances and pauses time when play/pause button is clicked", async () => {
    render(
      <AuthProvider>
        <AudioPlayer />
      </AuthProvider>
    );

    const toggleButton = screen.getByRole("button", { name: "Play Pause" });

    
    expect(screen.getByTestId("play-icon")).toBeInTheDocument();

    
    fireEvent.click(toggleButton);
    await screen.findByTestId("pause-icon"); 

    
    act(() => {
      vi.advanceTimersByTime(1000);
    });

 
    expect(screen.getByText("0:10")).toBeInTheDocument();

   
    fireEvent.click(toggleButton);
    await screen.findByTestId("play-icon"); 

    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("0:10")).toBeInTheDocument(); 
  }, 20000);
});
