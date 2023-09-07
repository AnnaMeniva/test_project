interface ButtonPropsType {
  context: string;
  className: string;
  onClick: () => void;
}
const CommonButtonFilterFiles: React.FC<ButtonPropsType> = ({
  onClick,
  context,
  className,
}) => {
  return (
    <div>
      <button className={className} onClick={onClick}>
        {context}
      </button>
    </div>
  );
};
export default CommonButtonFilterFiles;
