import React from 'react';

const SvgColor = ({ src, style = {}, ...other }) => {
  return (
    <div
      className="svg-color"
      style={{
        display: 'inline-block',
        backgroundColor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        zIndex: 10,
        ...style,
      }}
      {...other}
    />
  );
};

export default SvgColor;
