import { describe, it, expect, vi, beforeEach } from "vitest";
import { financeService } from "./finance-service";
import * as api from "./api";

vi.mock("./api", () => ({
  apiFetch: vi.fn(),
}));

describe("financeService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch assets successfully", async () => {
    const mockAssets = [{ id: 1, name: "Cash", value: 1000, currency: "USD", type: "CASH" }];
    vi.mocked(api.apiFetch).mockResolvedValue({
      json: () => Promise.resolve(mockAssets),
    } as Response);

    const assets = await financeService.getAssets();
    expect(assets).toEqual(mockAssets);
    expect(api.apiFetch).toHaveBeenCalledWith("/finance/assets");
  });

  it("should add an asset successfully", async () => {
    const newAsset = { name: "New Asset", value: 500, currency: "USD", type: "STOCK" };
    const mockResponse = { id: 2, ...newAsset };
    vi.mocked(api.apiFetch).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const asset = await financeService.addAsset(newAsset);
    expect(asset).toEqual(mockResponse);
    expect(api.apiFetch).toHaveBeenCalledWith("/finance/assets", expect.objectContaining({
      method: "POST",
      body: JSON.stringify(newAsset),
    }));
  });
});
