import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, debug, waitForElementToBeRemoved, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});


it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();

});

describe("Application testing", () => {  

  it("loads data, books an interview and reduces spots remaining for the first day by 1", async ()=> {
    const {container} = render(<Application />);

    await waitForElement( ()=> getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");    
    const appointment = appointments[0];

    //set day vriable to the monday portion of the container
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // test flow below with data
    //click add on slot 0 (which is open in our axios mock)
    fireEvent.click(getByAltText(appointment, "Add"));

    //set Student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //click save
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //save appointment
    fireEvent.click(getByText(appointment, "Save"));

    //ensure we get the "Saving" status
    expect(getByText(appointment, "Saving Appointment")).toBeInTheDocument();

    //ensure that the new appointment shows up once appointment is saved
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    //check that monday is now filled
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const {container, debug} = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement( ()=> getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen"));
  
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting Appointment")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => (getByAltText(appointment, "Add")));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

    //set day variable to the monday portion of the container
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const {container, debug} = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement( ()=> getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen"));
    
    fireEvent.click(getByAltText(appointment, "Edit"));

    //set Student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //click/set interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //save appointment
    fireEvent.click(getByText(appointment, "Save"));

    //ensure we get the "Saving" status
    expect(getByText(appointment, "Saving Appointment")).toBeInTheDocument();

    //ensure that the new appointment shows up once appointment is saved
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  });

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  it("shows the save error when failing to save an appointment", async () =>{
    const {container} = render(<Application />);

    await waitForElement( ()=> getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");    
    const appointment = appointments[0];

    //set day vriable to the monday portion of the container
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // test flow below with data
    //click add on slot 0 (which is open in our axios mock)
    fireEvent.click(getByAltText(appointment, "Add"));

    //set Student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //click save
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //save appointment
    fireEvent.click(getByText(appointment, "Save"));

    //fail at saving 
    axios.put.mockRejectedValueOnce();

    //expect to see error message
    expect(queryByText(appointment, "Error: Could not save appointment"));


  });

  it("shows the delete error when failing to delete an existing appointment", async () =>{

    // 1. Render the Application.
    const {container, debug} = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement( ()=> getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen"));
  
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    //fail at deleting 
    axios.put.mockRejectedValueOnce();

    //expect to see error message
    expect(queryByText(appointment, "Error: Could not delete appointment"));



  });

  
});
