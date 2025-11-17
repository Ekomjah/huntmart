import { it, describe, expect } from "vitest";

describe("boolean", () => {
  it("is a truthy case", () => {
    expect(true).toBeTruthy();
  });
  it("is a falsy case", () => {
    expect(false).toBeFalsy();
  });
});
