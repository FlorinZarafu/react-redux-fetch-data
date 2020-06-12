import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPost());
  const usersIds = _.uniq(_.map(getState().posts, "userId"));
  usersIds.forEach((id) => dispatch(fetchUser(id)));
};

export const fetchPost = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`./users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};
