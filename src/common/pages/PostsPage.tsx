import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Head from "../../client/Head";
import { RootState } from "../store/reducers";
import { fetchPosts } from "../store/reducers/posts/PostsActionCreator";
import { uid } from "react-uid";
import Post from "../../client/Post";

export default function PostsPage(): React.ReactElement {
  const { posts } = useSelector((state: RootState) => state.PostsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts({}));
  }, []);

  const renderPosts: JSX.Element[] | string =
    posts.length >= 10
      ? posts.slice(0, 10).map(({ title, body }) => (
          <Post key={uid(title)} title={title}>
            {body}
          </Post>
        ))
      : "Few posts";

  return (
    <div>
      <Head title={"Todo page"} />
      <div className="d-flex flex-wrap">{renderPosts}</div>
    </div>
  );
}
