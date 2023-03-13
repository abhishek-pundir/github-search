import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchResult from "./index";
import { useSearchUsers } from "../../hooks/useSearchUsers";

jest.mock("../../hooks/useSearchUsers");

const useSearchUsersMock = useSearchUsers as jest.MockedFunction<typeof useSearchUsers>;

describe("SearchResult", () => {
  it("renders a loading state initially", async () => {
    useSearchUsersMock.mockReturnValue({
      isLoading: true,
      data: undefined,
      isError: false
    });

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <SearchResult />
      </MemoryRouter>
    );

    expect(screen.getByTestId("bounce-loader")).toBeInTheDocument();
  });

  it("renders an error message if the search fails", async () => {
    useSearchUsersMock.mockReturnValue({
      isLoading: false,
      isError: true,
      data: {
        message: "Request Failed",
      },
    });

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <SearchResult />
      </MemoryRouter>
    );

    const errorMessageElement = await screen.findByText(
      "Request Failed. Please try after some time"
    );
    expect(errorMessageElement).toBeInTheDocument();
  });

  it("renders a No User Found message if no search results are found", async () => {
    useSearchUsersMock.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        total_count: 0,
        items: [],
      },
    });

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <SearchResult />
      </MemoryRouter>
    );

    const noUserFoundElement = await screen.findByText("No User Found");
    expect(noUserFoundElement).toBeInTheDocument();
  });

  it("renders template search message if no search query present", async () => {
    useSearchUsersMock.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        message: "Validation Failed",
      },
    });

    render(
      <MemoryRouter initialEntries={["/search?q="]}>
        <SearchResult />
      </MemoryRouter>
    );

    const messageElement = await screen.findByText(
      "Search more than 110M users"
    );
    expect(messageElement).toBeInTheDocument();
  });

  it("renders the search results when data is fetched successfully", async () => {
    const mockData = {
      total_count: 2,
      items: [
        {
          id: 1,
          login: "user1",
          avatar_url: "https://avatar1.com",
        },
        {
          id: 2,
          login: "user2",
          avatar_url: "https://avatar2.com",
        },
      ],
    };

    useSearchUsersMock.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
    });

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <SearchResult />
      </MemoryRouter>
    );

    const userCountElement = await screen.findByText("2 users");
    const user1Element = await screen.findByText("@user1");
    const user2Element = await screen.findByText("@user2");

    expect(userCountElement).toBeInTheDocument();
    expect(user1Element).toBeInTheDocument();
    expect(user2Element).toBeInTheDocument();
  });

  it("disables the Previous button and Next button when there is only one page", async () => {
    const mockData = {
      total_count: 2,
      items: [
        {
          id: 1,
          login: "user1",
          avatar_url: "https://avatar1.com",
        },
        {
          id: 2,
          login: "user2",
          avatar_url: "https://avatar2.com",
        },
      ],
    };

    useSearchUsersMock.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
    });

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <SearchResult />
      </MemoryRouter>
    );

    const pageNumberElement = await screen.findByText("1 / 1");
    const nextBtnElement = await screen.findByText("Next");
    const prevBtnElement = await screen.findByText("Previous");

    expect(pageNumberElement).toBeInTheDocument();
    expect(nextBtnElement).toBeInTheDocument();
    expect(nextBtnElement).toBeDisabled();
    expect(prevBtnElement).toBeInTheDocument();
    expect(prevBtnElement).toBeDisabled();
  });

  it("enables the Previous button and Next button when there are multiple pages", async () => {
    const mockData = {
      total_count: 50,
      items: [
        {
          id: 1,
          login: "user1",
          avatar_url: "https://avatar1.com",
        },
        {
          id: 2,
          login: "user2",
          avatar_url: "https://avatar2.com",
        },
      ],
    };

    useSearchUsersMock.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
    });

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <SearchResult />
      </MemoryRouter>
    );

    let pageNumberElement = await screen.findByText("1 / 2");
    expect(pageNumberElement).toBeInTheDocument();

    const prevBtnElement = await screen.findByText("Previous");
    expect(prevBtnElement).toBeDisabled();

    const nextBtnElement = await screen.findByText("Next");
    expect(nextBtnElement).not.toBeDisabled();

    fireEvent.click(nextBtnElement);
    pageNumberElement = await screen.findByText("2 / 2");
    expect(pageNumberElement).toBeInTheDocument();

    fireEvent.click(prevBtnElement);
    pageNumberElement = await screen.findByText("1 / 2");
    expect(pageNumberElement).toBeInTheDocument();
  });
});
