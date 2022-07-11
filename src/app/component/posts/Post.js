import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { getAllPost } from "../../actions/profile";
import {
  getAllPost,
  addComment,
  removeComment,
  updateComment,
} from "../../actions/post";
const PostDetail = ({
  getAllPost,
  post: { post, loading },
  addComment,
  removeComment,
  updateComment,
}) => {
  const refAddComment = useRef(null);
  const refText = useRef("");
  const addCommentPost = () => {
    const body = {
      comment: refAddComment.current.value,
    };
    // console.log(refAddComment.current.value);
    console.log(post._id);
    addComment(post._id, body);
  };
  const [updateCommentInput, setUpdateCommentInput] = useState(false);
  return (
    post && (
      <div>
        <Link to="/post" className="btn">
          Back To Posts
        </Link>
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to="/profile">
              {/* <img
              className="round-img"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              alt=""
            /> */}
              <h4>{post.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{post.text}</p>
            <p className="post-date">post on {post.date}</p>
          </div>
        </div>

        <div className="post-form">
          <div className="bg-primary p">
            <h3>Leave A Comment</h3>
          </div>
          <div className="form my-1">
            <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Comment on this post"
              required
              ref={(ref) => {
                refAddComment.current = ref;
              }}
            ></textarea>
            <input
              type="button"
              onClick={addCommentPost}
              className="btn btn-light  my-1"
              value="Add comment "
            />
          </div>
        </div>

        <div className="comments">
          {console.log(post.comments)}
          {post.comments &&
            post.comments.map((comment) => {
              return (
                <div className="post bg-white p-1 my-1">
                  <div>
                    <Link to="/profile">
                      {/* <img
                   className="round-img"
                   src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                   alt=""
                 /> */}
                      <h4>{comment.user}</h4>
                    </Link>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="my-1"
                      style={{ border: 0, outline: 0 }}
                      readOnly={true}
                      id={`input_${comment._id}`}
                      onLoad={(e) => {
                        e.target.value = comment.text;
                      }}
                      onKeyDown={(e) => {
                        if (e.code === "Enter") {
                          console.log(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        console.log(post);
                        console.log(comment._id);
                        removeComment(post._id, comment._id);
                      }}
                    >
                      xóa comment
                    </button>
                    <button
                      onClick={() => {
                        const el = document.getElementById(
                          `input_${comment._id}`
                        );
                        console.log(el);
                        el.readOnly = !el.readOnly;
                        if (el.readOnly === false) {
                          el.focus();
                        }
                      }}
                    >
                      sửa comment
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

PostDetail.propTypes = {
  getAllPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, {
  getAllPost,
  addComment,
  updateComment,
  removeComment,
})(PostDetail);
