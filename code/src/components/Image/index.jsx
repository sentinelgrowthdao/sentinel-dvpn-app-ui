import React from "react";

const Image = ({ src = "", ...rest }) => {
  const path = React.useMemo(() => {
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }
    return `${window.origin}${src}`;
  }, [src]);
  return (
    <img
      src={path}
      alt=""
      {...rest}
    />
  );
};

export default Image;
