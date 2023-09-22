interface PropsType {
  onClick: () => void;
  content?: string;
  image?: string;
  altButton?: string;
  buttonClassName?: string;
  imageClassName?: string;
}

const CommonButton: React.FC<PropsType> = ({
  onClick,
  content,
  imageClassName,
  buttonClassName,
  image,
  altButton,
}: PropsType) => {
  return (
    <>
      <button className={buttonClassName} onClick={onClick}>
        <img className={imageClassName} src={image} alt={altButton} />
        Sort by: {content}
      </button>
    </>
  );
};

export default CommonButton;
