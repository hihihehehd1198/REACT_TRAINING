import axios from "axios";
import { setAlert } from "./alert";
import { loadUser } from "./auth";
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_COMMENT,
  REMOVE_COMMENT,
  USER_LOADED,
} from "../actions/types";

//add comment
export const addComment = (postId, comment) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/addComment/${postId}`, comment);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data.body,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};
//add post
export const addPost = () => async (dispatch) => {
  try {
    await axios.post("/api/posts/");
    dispatch({
      type: ADD_POST,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};
//get all post
export const getAllPost = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts/getAll");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};
//get post from user id
export const getPostWithUserId = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/getAll/${userId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

//remove coment with comment id
export const removeComment = (commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/deleteComment/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: res.data.body,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

//add or update comment
export const updateComment = (postId, body) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/updateComment/${postId}`, body);
    dispatch({
      type: UPDATE_COMMENT,
      payload: res.data.body,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

//like post
export const likePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/updateLike/${postId}`);
    console.log(res);
    dispatch({
      type: UPDATE_LIKES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};
//unlike post with post Id
export const unLikePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/updateLike/${postId}`);
    console.log(res);
    dispatch({
      type: UPDATE_LIKES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
    });
  }
};

//delete post with post id
export const deletePostUser = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/delete/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};
