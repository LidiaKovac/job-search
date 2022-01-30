import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Search } from "./views/Search/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { fireEvent } from "@testing-library/react";

configure({ adapter: new Adapter() });
let container: ReactDOM.Container | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container as Node);
  container = null;
});

describe("Search component", () => {
  it("1. Test if, with initial state and props, an error is shown", async () => {
    const wrapper = await render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
        </Routes>
      </BrowserRouter>
    );
    const text = await wrapper.findByText("No search parameters found");
    expect(text).toBeInTheDocument();
  });
  it("2. Test if, with x jobs found, the user sees x elements.", async () => {
    act(async () => {
      await ReactDOM.render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </BrowserRouter>,
        container
      );

      await new Promise((r) => setTimeout(r, 3000));
      const singleJobs = await document.querySelector(".single__wrap")
      expect(singleJobs).toBeInTheDocument();
    });
    // const wrapper = render(
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Search />} />
    //     </Routes>
    //   </BrowserRouter>
    // );

    // await new Promise((r) => setTimeout(r, 3000));
    // const text = await wrapper.findByText("No search parameters found");
    // expect(text).toBeInTheDocument();
  });
});
describe("Home component", () => {
  it("1. Test if empty inputs are invalid for submission", () => {
    act(() => {
      ReactDOM.render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>,
        container
      );
      let inputs = document.querySelectorAll("input");
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.value = "";
      }
      let isValid = document.forms[0].reportValidity();
      expect(isValid).toBe(false);
    });
  });
  it("2. Test if filled inputs are valid for submission", () => {
    act(() => {
      ReactDOM.render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>,
        container
      );
      let inputs = document.querySelectorAll("input");
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.value = "text";
      }
      let isValid = document.forms[0].reportValidity();
      expect(isValid).toBe(true);
    });
  });
  it("3. Test if the user sees the same thing they wrote", () => {
    act(() => {
      ReactDOM.render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>,
        container
      );
      let input = document.querySelector("input#position") as HTMLInputElement;
      let exampleString = "london";
      fireEvent.change(input, { target: { value: exampleString } });

      expect(input.value).toBe(exampleString);
    });
  });
});
