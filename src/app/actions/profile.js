import axios from "axios";

import { setAlert } from "./alert";
import { loadUser } from "./auth";

import {
  ACCOUNT_DELETED,
  PROFILE_ERROR,
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  LOGOUT,
} from "./types";

//get current profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile/");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
//get profile with id
export const getProfileWithId = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`api/profile/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//get all profile
export const getAllProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    // dispatch(loadUser());
    const res = await axios.get("/api/profile/findall");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//delete all profile
export const deleteProfile = () => async (dispatch) => {
  try {
    await axios.post("/api/profile/deleteProfileDetail");
    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch(setAlert("delete all profile sucess !"));
  } catch {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//create or update Profile
export const createProfile =
  (formBody, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "/api/profile/createAndUpdate",
        formBody,
        config
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  };

//add experience

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    const res = await axios.put("/api/profile/experience", body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success"));
    history.push("/dashboard");
  } catch {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//delete profile with user id
export const deleteProfileAccount = (params) => async (dispatch) => {
  try {
    await axios.delete(`/api/profile/${params}`);
    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch({ type: ACCOUNT_DELETED });
    dispatch(setAlert("Your account has been permanantly deleted"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//delete exp with exp id
export const deleteExpProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/exp/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//add or edit exp
export const addOrEditExp = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/experience", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Update", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//delete exp with id
export const deleteExpWithId = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/exp/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//delete all exp
export const deleteAllExp = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/profile/deleteProfileDetail");
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//delete current user
export const deleteCurrentAccount = (history) => async (dispatch) => {
  try {
    const res = await axios.delete("/api/profile");
    dispatch({
      type: CLEAR_PROFILE,
      payload: res.data,
    });
    dispatch({
      type: LOGOUT,
      payload: [],
    });
    dispatch(setAlert("Account has Removed", "success"));
    history.push("/login");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//find profile with user id
export const findProfileWithUserId = (id) => async (dispatch) => {
  dispatch(loadUser());
  try {
    const res = await axios.get(`/api/profile/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
