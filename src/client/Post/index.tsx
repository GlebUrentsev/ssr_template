import React, { Children } from "react";
import styles from "./index.css";

interface IPost {
  title: string;
}

const Post: React.FC<IPost> = ({ children, title }) => {  
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{children}</p>
        <a href="#" className="btn btn-primary">
          <div className={styles.Test}>Test</div>
          <div className={styles.Test2}>Test2</div>
        </a>
      </div>
    </div>
  );
};

export default Post;
