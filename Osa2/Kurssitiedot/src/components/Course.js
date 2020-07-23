import React from "react";

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};
const Header = ({ courseName }) => {
  return (
    <div>
      <h2>{courseName}</h2>
    </div>
  );
};

const Content = ({ course }) => {
  const courseToParts = course.parts.map((part) => (
    <Part key={part.id} part={part} />
  ));

  return <div>{courseToParts}</div>;
};
const Part = ({ part }) => {
  return (
    <div>
      <p>
        {" "}
        {part.name} {part.exercises}{" "}
      </p>
    </div>
  );
};

const Total = ({ course }) => {
  const exerciseCount = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <div>
      <p>Number of exercises {exerciseCount}</p>
    </div>
  );
};

export default Course;
