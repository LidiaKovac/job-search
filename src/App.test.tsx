import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Search } from "./views/Search/Search";

import { shallow } from "enzyme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Search component", () => {
  it("should render 'No jobs found' if state matches", () => {
    let searchPage = shallow(
    <BrowserRouter>
      <Routes>
        <Route element={<Search />}/>
        
      </Routes>
    </BrowserRouter>
    );
    searchPage.setState({ error: "No jobs found!" });
    const errorMess = screen.getByText("No jobs found!");
    expect(errorMess).toBeInTheDocument();
  });
});
