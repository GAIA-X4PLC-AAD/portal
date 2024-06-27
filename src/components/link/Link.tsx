import { FC } from 'react';

interface ILink {
    url: string;
    label?: string;
    fontSize?: string;
}

const Link: FC<ILink> = ({ url, label, fontSize }) => {
  return (
    <a href={url} target="_blank" style={fontSize ? { fontSize } : {}} rel="noreferrer">
      {label ? label : url}
    </a>
  );
};

export default Link;
