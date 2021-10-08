import { useEffect, useState } from "react";
import InstructorClass from "./InstructorClass";
import CreateClass from "./CreateClass";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { baseURL } from "../../utils/baseURL";
import styled from "styled-components";
import "intro.js/introjs.css";
import introJs from "intro.js";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 10%;
  height: 5%;
`;

export default function InstructorManageClasses(props) {
  const [classes, setClasses] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [instructor, setInstructor] = useState({});

  //CHECK FOR USER FIRST VISIT - RUN ONBOARDING
  const checkForOnboarding = () => {
    if (window.localStorage.getItem("id_first")) {
      return;
    } else
      introJs()
        .setOptions({
          steps: [
            {
              intro:
                "Thanks for signing up as an instructor! We look forward to providing our services to you and our customers!",
            },
            {
              element: document.querySelector(".create-class-btn"),
              intro: "Create a class for prospects to see.",
            },
          ],
        })
        .start();
  };

  useEffect(() => {
    //CHECK FOR USER FIRST VISIT - RUN ONBOARDING
    checkForOnboarding();
    //set instructor classes to state
    axiosWithAuth()
      .get(`${baseURL}/users/getuserinfo`)
      .then((res) => {
        setInstructor(res.data);
        setClasses(res.data.classes);
      })
      .catch((err) => console.log(err));
  }, [setClasses]);

  return (
    <StyledDiv>
      <h2>Class Management</h2>
      {isCreating ? (
        <CreateClass
          setIsCreating={setIsCreating}
          instructor={instructor}
          setClasses={setClasses}
          classes={classes}
        />
      ) : (
        <StyledButton
          className="create-class-btn"
          onClick={() => setIsCreating(true)}
        >
          Create a Class
        </StyledButton>
      )}
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {
          //c is class
          classes &&
            classes.map((c) => (
              <InstructorClass
                key={c.classid}
                c={c}
                classes={classes}
                setClasses={setClasses}
                instructor={instructor}
              />
            ))
        }
      </div>
    </StyledDiv>
  );
}
