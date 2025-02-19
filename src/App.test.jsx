import { it, describe, vi, beforeEach, test } from 'vitest';
import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import '@testing-library/jest-dom';
import { expect } from 'vitest';


import App from "./App";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        users: [
          {
            id: 1,
            firstName: "Emily",
            lastName: "Johnson",
            email: "emily.johnson@x.dummyjson.com",
            gender: "female",
          },
          {
            id: 2,
            firstName: "Michael",
            lastName: "Williams",
            email: "michael.williams@x.dummyjson.com",
            gender: "male",
          },
        ],
      }),
  })
);

describe("User List App", () => {
  beforeEach(async () => {
    fetch.mockClear();
    render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  it("fetches and displays users", async () => {
    expect(await screen.findByText("Emily Johnson")).toBeInTheDocument();
    expect(await screen.findByText("Michael Williams")).toBeInTheDocument();
  });

  it("displays user details when clicked", async () => {
    const user = await screen.findByText("Emily Johnson");
    fireEvent.click(user);

    expect(await screen.findByText("First Name: Emily")).toBeInTheDocument();
    expect(screen.getByText("Last Name: Johnson")).toBeInTheDocument();
    expect(screen.getByText("Email: emily.johnson@x.dummyjson.com")).toBeInTheDocument();
    expect(screen.getByText("Gender: female")).toBeInTheDocument();
  });

  it("updates user details when another user is clicked", async () => {

    const firtUsers = await screen.findAllByText("Emily Johnson");
fireEvent.click(firtUsers[0]); // Click the first instance

const secondUsers = await screen.findAllByText("Michael Williams");
fireEvent.click(secondUsers[0]);


expect(await screen.findByText("Michael")).toBeInTheDocument();

    expect(screen.getByText("Last Name: Williams")).toBeInTheDocument();
    expect(screen.getByText("Email: michael.williams@x.dummyjson.com")).toBeInTheDocument();
    expect(screen.getByText("Gender: male")).toBeInTheDocument();
  });
});

