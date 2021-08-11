import React from "react";
import { Helmet } from "react-helmet";

interface IProps {
  title: string;
}

const Head: React.FC<IProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Head;
