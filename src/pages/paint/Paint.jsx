import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading } from "../../redux/slice/loading.slice";

function Paint(props) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(hideLoading());
  }, [loading]);
  return <div>Hello</div>;
}

export default Paint;
