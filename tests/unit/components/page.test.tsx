import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import HomePage, { metadata } from "@/app/page";

expect.extend(toHaveNoViolations);

describe("HomePage", () => {
  it("renders the main heading", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /hello from loom/i })
    ).toBeInTheDocument();
  });

  it("renders the empty state copy", () => {
    render(<HomePage />);
    expect(screen.getByText(/empty state/i)).toBeInTheDocument();
  });

  it("exports a meta description", () => {
    expect(metadata.description).toBeDefined();
    expect(typeof metadata.description).toBe("string");
    expect((metadata.description as string).length).toBeGreaterThan(20);
  });

  it("exports a meta title", () => {
    expect(metadata.title).toBeDefined();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
