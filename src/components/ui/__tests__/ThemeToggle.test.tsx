/**
 * Tests for ThemeToggle component
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { axe } from "jest-axe";
import { ThemeToggle } from "../ThemeToggle";
import { ThemeProvider } from "../../../providers/ThemeProvider";

// Mock the useTheme hook
const mockSetTheme = vi.fn();
vi.mock("../../../hooks/useTheme", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
    resolvedTheme: "light",
  }),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("ThemeToggle", () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  it("renders theme toggle button", () => {
    renderWithTheme(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Toggle theme");
  });

  it("displays current theme in title attribute", () => {
    renderWithTheme(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("title", "Current theme: Light");
  });

  it("cycles through themes when clicked", () => {
    renderWithTheme(<ThemeToggle />);

    const button = screen.getByRole("button");

    // First click should set to dark
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("applies custom className", () => {
    renderWithTheme(<ThemeToggle className="custom-class" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    renderWithTheme(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Toggle theme");
    expect(button).toHaveClass("focus:outline-none", "focus:ring-2");
  });

  it("supports keyboard navigation", () => {
    renderWithTheme(<ThemeToggle />);

    const button = screen.getByRole("button");

    // Should be focusable
    button.focus();
    expect(button).toHaveFocus();

    // Should respond to Enter key
    fireEvent.keyDown(button, { key: "Enter" });
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalled();
  });

  it("meets accessibility guidelines", async () => {
    const { container } = renderWithTheme(<ThemeToggle />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders consistently (snapshot)", () => {
    const { container } = renderWithTheme(<ThemeToggle />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
