import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
} from "../actions/types";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  erorr: {},
};
const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case GET_POSTS:
      return {
        ...state,
        posts: payload.listComment,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) => {
          //   console.log(post);
          return post._id === payload.postId
            ? { ...post, likes: payload.body }
            : post;
        }),
        // posts: state.posts,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [...payload],
        },
        loading: false,
      };
    case UPDATE_COMMENT: {
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload,
        },
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default postReducer;
