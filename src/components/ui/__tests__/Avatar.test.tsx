/**
 * Tests for Avatar component
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { axe } from "jest-axe";
import { Avatar } from "../Avatar";

describe("Avatar", () => {
  it("renders with image when src is provided", () => {
    render(
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="John Doe"
        name="John Doe"
      />,
    );

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/avatar.jpg");
    expect(image).toHaveAttribute("alt", "John Doe");
  });

  it("renders initials when no src is provided", () => {
    render(<Avatar name="John Doe" />);

    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("generates correct initials for different name formats", () => {
    const testCases = [
      { name: "John Doe", expected: "JD" },
      { name: "Jane Smith Johnson", expected: "JS" },
      { name: "Alice", expected: "A" },
      { name: "bob charlie david edward", expected: "BC" },
      { name: "", expected: "" },
    ];

    testCases.forEach(({ name, expected }) => {
      const { unmount } = render(<Avatar name={name} />);

      if (expected) {
        expect(screen.getByText(expected)).toBeInTheDocument();
      }
      unmount();
    });
  });

  it("applies correct size classes", () => {
    const { container: sm } = render(<Avatar name="John Doe" size="sm" />);
    const { container: md } = render(<Avatar name="John Doe" size="md" />);
    const { container: lg } = render(<Avatar name="John Doe" size="lg" />);
    const { container: xl } = render(<Avatar name="John Doe" size="xl" />);

    expect(sm.firstChild).toHaveClass("h-6", "w-6", "text-xs");
    expect(md.firstChild).toHaveClass("h-8", "w-8", "text-sm");
    expect(lg.firstChild).toHaveClass("h-10", "w-10", "text-base");
    expect(xl.firstChild).toHaveClass("h-12", "w-12", "text-lg");
  });

  it("applies default size when no size is specified", () => {
    const { container } = render(<Avatar name="John Doe" />);

    expect(container.firstChild).toHaveClass("h-8", "w-8", "text-sm");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Avatar name="John Doe" className="custom-class" />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("uses fallback alt text when alt is not provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" name="John Doe" />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "John Doe avatar");
  });

  it("has proper base styling classes", () => {
    const { container } = render(<Avatar name="John Doe" />);

    expect(container.firstChild).toHaveClass(
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "rounded-full",
      "bg-gray-300",
      "dark:bg-gray-600",
      "overflow-hidden",
    );
  });

  it("applies proper text styling for initials", () => {
    render(<Avatar name="John Doe" />);

    const initialsElement = screen.getByText("JD");
    expect(initialsElement).toHaveClass(
      "font-medium",
      "text-gray-700",
      "dark:text-gray-300",
    );
  });

  it("handles empty name gracefully", () => {
    const { container } = render(<Avatar name="" />);

    expect(container.firstChild).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("meets accessibility guidelines with image", async () => {
    const { container } = render(
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="John Doe avatar"
        name="John Doe"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("meets accessibility guidelines with initials", async () => {
    const { container } = render(<Avatar name="John Doe" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders consistently with image (snapshot)", () => {
    const { container } = render(
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="John Doe"
        name="John Doe"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders consistently with initials (snapshot)", () => {
    const { container } = render(<Avatar name="John Doe" />);
    expect(container.firstChild).toMatchSnapshot("avatar-initials");
  });

  it("renders consistently across different sizes (snapshot)", () => {
    const { container: sm } = render(<Avatar name="John Doe" size="sm" />);
    const { container: md } = render(<Avatar name="John Doe" size="md" />);
    const { container: lg } = render(<Avatar name="John Doe" size="lg" />);
    const { container: xl } = render(<Avatar name="John Doe" size="xl" />);

    expect(sm.firstChild).toMatchSnapshot("avatar-sm");
    expect(md.firstChild).toMatchSnapshot("avatar-md");
    expect(lg.firstChild).toMatchSnapshot("avatar-lg");
    expect(xl.firstChild).toMatchSnapshot("avatar-xl");
  });
});
