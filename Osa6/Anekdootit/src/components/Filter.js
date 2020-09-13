import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const content = event.target.value;
    dispatch(setFilter(content));
  };
  const style = {
    marginBottom: 10,
  };
  const filtertext = useSelector((state) => state.filter);

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
      {filtertext}
    </div>
  );
};

export default Filter;
