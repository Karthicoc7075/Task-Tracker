import * as actionTypes from "../contants/actionsTypes";
import { GetDatas } from "../api/dashboard";
import { addToast } from "../actions/toaster";

export const getDashboardDatas = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_DASHBOARD_DATA_REQUEST });
  try {
    const response = await GetDatas(dispatch);
    const payload = response.data;
    dispatch({ type: actionTypes.GET_DASHBOARD_DATA_SUCCESS, payload });
    dispatch(addToast(response.message, "success"));
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.GET_DASHBOARD_DATA_FAILURE, error });
  }
};
