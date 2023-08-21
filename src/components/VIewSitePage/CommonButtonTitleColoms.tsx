interface PropsType {
  onClick: () => void;
  title: string;
  className: string;
}

const CommonButtonTitleColoms: React.FC<PropsType> = ({
  onClick,
  title,
  className,
}: PropsType) => {
  return (
    <>
      <button className={className} onClick={onClick}>
        {title}
      </button>
    </>
  );
};

export default CommonButtonTitleColoms;
