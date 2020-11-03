import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  interface CoursePartBaseTwo extends CoursePartBase {
    description: string;
  }
  interface CoursePartOne extends CoursePartBaseTwo {
    name: "Fundamentals";
  }

  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }

  interface CoursePartThree extends CoursePartBaseTwo {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }
  interface CoursePartFour extends CoursePartBaseTwo {
    name: "Using props to pass time";
  }
  type CoursePart =
    | CoursePartOne
    | CoursePartTwo
    | CoursePartThree
    | CoursePartFour;

  const Header: React.FC<{ name: string }> = ({ name }) => {
    return <h1>{name}</h1>;
  };

  interface ContentProps {
    parts: CoursePart[];
  }
  interface PartProps {
    part: CoursePart;
  }
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const Part: React.FC<PartProps> = ({ part }) => {
    console.log(part.name);
    switch (part.name) {
      case "Fundamentals":
        return (
          <div>
            <h2> {part.name}</h2> <p>exercises: {part.exerciseCount}</p>
            <p>description: {part.description}</p>
          </div>
        );

      case "Using props to pass data":
        return (
          <div>
            {" "}
            <h2>{part.name}</h2> <p>exercises: {part.exerciseCount}</p>
            <p>groupProjectCount: {part.groupProjectCount}</p>
          </div>
        );

      case "Deeper type usage":
        return (
          <div>
            <h2>{part.name}</h2> <p>exercises: {part.exerciseCount}</p>
            <p>exerciseSubmissionLink: {part.exerciseSubmissionLink}</p>
          </div>
        );

      case "Using props to pass time":
        return (
          <div>
            <h2> {part.name}</h2> <p>exercises: {part.exerciseCount}</p>
            <p>description: {part.description}</p>
          </div>
        );
      default:
        return assertNever(part);
    }
    //return <p>{part.name}</p>;
  };
  const Content: React.FC<ContentProps> = ({ parts }) => {
    console.log(parts);
    return (
      <div>
        {parts.map((part, i) => (
          <div key={i}>
            <Part part={part} />
          </div>
        ))}
      </div>
    );
  };

  const Total: React.FC<{
    parts: { name: string; exerciseCount: number }[];
  }> = ({ parts }) => {
    return (
      <div>
        <h2>Total exercises:</h2>
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </div>
    );
  };
  const courseName = "Half Stack application development";

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
    {
      name: "Using props to pass time",
      exerciseCount: 999,
      description: "This part will never end",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
