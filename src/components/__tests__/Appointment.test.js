import React from "react";
/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

import Application from "components/Application";

describe("appointment", () => {
  xit("renders without crashing", () => {
    render(<Application />);
  });

});
