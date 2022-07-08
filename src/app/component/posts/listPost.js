import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { getAllPost } from "../../actions/profile";
import { getAllPost, likePost, unLikePost } from "../../actions/post";
const ListPost = ({
  getAllPost,
  post: { posts, loading },
  unLikePost,
  likePost,
}) => {
  //   const dispatch = useDispatch();

  useEffect(() => {
    getAllPost();
    console.log(posts);
  }, []);
  useEffect(() => {
    console.log("posts", posts);
  }, [posts]);
  return (
    posts && (
      <div>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community!
        </p>

        <div className="post-form">
          <div className="bg-primary p">
            <h3>Say Something...</h3>
          </div>
          <form className="form my-1">
            <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post"
              required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
          </form>
        </div>

        <div className="posts">
          {posts &&
            posts.map((post) => {
              return (
                <div className="post bg-white p-1 my-1">
                  <div>
                    <Link to="profile.html">
                      <h4>{post.name}</h4>
                    </Link>
                  </div>
                  <div>
                    <p className="my-1">{post.text}</p>
                    <p className="post-date">{post.date}</p>
                    <button
                      type="button"
                      onClick={() => {
                        likePost(post._id);
                      }}
                    >
                      <i className="fas fa-thumbs-up"></i>
                      <span>{post.likes?.length || 0}</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        unLikePost(post._id);
                      }}
                    >
                      <span>Unlike </span>
                    </button>
                    <Link to="/post/detail" className="btn btn-primary">
                      Comments :
                      <span className="comment-count">
                        {post.comments?.length || 0}
                      </span>
                    </Link>
                    <button type="button" className="btn btn-danger">
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

ListPost.propTypes = {
  getAllPost: PropTypes.func.isRequired,
  unLikePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getAllPost, likePost, unLikePost })(
  ListPost
);
