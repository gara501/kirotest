/**
 * Tests for DashboardLayout component
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { axe } from "jest-axe";
import { DashboardLayout } from "../DashboardLayout";
import { ThemeProvider } from "../../../providers/ThemeProvider";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock the useSidebar hook
const mockUseSidebar = {
  isCollapsed: false,
  isMobileMenuOpen: false,
  toggleSidebar: vi.fn(),
  toggleMobileMenu: vi.fn(),
  closeMobileMenu: vi.fn(),
  setIsCollapsed: vi.fn(),
  setIsMobileMenuOpen: vi.fn(),
};

vi.mock("../../../hooks/useSidebar", () => ({
  useSidebar: () => mockUseSidebar,
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.getItem.mockReturnValue(null);
});

describe("DashboardLayout", () => {
  it("renders correctly with children", () => {
    renderWithTheme(
      <DashboardLayout>
        <div data-testid="test-content">Test Content</div>
      </DashboardLayout>,
    );

    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders header with correct title", () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>,
    );

    // Check for the header title specifically (using role to be more specific)
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    // The header contains a heading with "Dashboard"
    expect(
      screen.getByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();
  });

  it("renders user menu with default user", () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>,
    );

    // Should show user initials for John Doe
    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  it("has correct responsive layout structure", () => {
    const { container } = renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>,
    );

    const mainContainer = container.querySelector(".min-h-screen");
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass("flex", "bg-gray-50", "dark:bg-gray-900");

    const contentArea = container.querySelector(".flex.flex-col.min-h-screen");
    expect(contentArea).toBeInTheDocument();
    expect(contentArea).toHaveClass("ml-0", "lg:ml-64", "w-full");
  });

  it("adjusts layout when sidebar is collapsed", () => {
    // Mock collapsed sidebar state
    mockUseSidebar.isCollapsed = true;

    const { container } = renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>,
    );

    const contentArea = container.querySelector(".flex.flex-col.min-h-screen");
    expect(contentArea).toBeInTheDocument();
    expect(contentArea).toHaveClass(
      "transition-all",
      "duration-300",
      "lg:ml-20",
    );

    // Reset for other tests
    mockUseSidebar.isCollapsed = false;
  });

  it("has proper main content structure", () => {
    renderWithTheme(
      <DashboardLayout>
        <div data-testid="child-content">Child Content</div>
      </DashboardLayout>,
    );

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("flex-1", "p-4", "lg:p-6");

    const contentWrapper = main.querySelector(".mx-auto");
    expect(contentWrapper).toBeInTheDocument();
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("handles mobile menu toggle", () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>,
    );

    // Find the mobile menu button in the header
    const menuButton = screen.getByLabelText("Open sidebar");
    expect(menuButton).toBeInTheDocument();

    // Click the button
    fireEvent.click(menuButton);

    // Verify the toggle function was called
    expect(mockUseSidebar.toggleMobileMenu).toHaveBeenCalledTimes(1);
  });

  it("handles user logout", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>,
    );

    // Open user menu and click logout
    const userMenuButton = screen.getByRole("button", { name: /john doe/i });
    fireEvent.click(userMenuButton);

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(consoleSpy).toHaveBeenCalledWith("User logged out");

    consoleSpy.mockRestore();
  });

  it("applies dark mode classes correctly", () => {
    const { container } = renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>,
    );

    const mainContainer = container.querySelector(".min-h-screen");
    expect(mainContainer).toHaveClass("dark:bg-gray-900");
  });

  it("has smooth transitions for layout changes", () => {
    const { container } = renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>,
    );

    const contentArea = container.querySelector(".flex.flex-col.min-h-screen");
    expect(contentArea).toHaveClass("transition-all", "duration-300");
  });

  it("renders with proper semantic HTML structure", () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>,
    );

    // Check for semantic elements
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument(); // Header
  });

  it("meets accessibility guidelines", async () => {
    const { container } = renderWithTheme(
      <DashboardLayout>
        <div>Accessible Content</div>
      </DashboardLayout>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("meets accessibility guidelines with complex content", async () => {
    const { container } = renderWithTheme(
      <DashboardLayout>
        <div>
          <h1>Dashboard Title</h1>
          <button>Interactive Element</button>
          <input type="text" aria-label="Search input" />
        </div>
      </DashboardLayout>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("supports keyboard navigation", () => {
    renderWithTheme(
      <DashboardLayout>
        <div>
          <button data-testid="focusable-content">Focusable Button</button>
        </div>
      </DashboardLayout>,
    );

    const button = screen.getByTestId("focusable-content");
    button.focus();
    expect(button).toHaveFocus();
  });

  it("handles window resize gracefully", () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Responsive Content</div>
      </DashboardLayout>,
    );

    // Simulate window resize
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 768,
    });
    window.dispatchEvent(new Event("resize"));

    // Layout should still be functional
    expect(screen.getByText("Responsive Content")).toBeInTheDocument();
  });

  it("renders consistently (snapshot)", () => {
    const { container } = renderWithTheme(
      <DashboardLayout>
        <div>Snapshot Content</div>
      </DashboardLayout>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders consistently with different content (snapshot)", () => {
    const { container } = renderWithTheme(
      <DashboardLayout>
        <div>
          <h1>Complex Content</h1>
          <p>Multiple elements</p>
          <button>Interactive</button>
        </div>
      </DashboardLayout>,
    );

    expect(container.firstChild).toMatchSnapshot("dashboard-layout-complex");
  });
});
