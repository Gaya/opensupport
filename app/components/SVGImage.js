import { h } from 'preact';

function SVGImage(props) {
  return (
    <picture
      dangerouslySetInnerHTML={{ __html: props.svg }}
      {...props}
    />
  );
}

export default SVGImage;
