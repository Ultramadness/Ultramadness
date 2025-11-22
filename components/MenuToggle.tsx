const MenuToggle = ({
  button,
  icon,
}: {
  button: () => void;
  icon: React.ReactNode;
}) => {
  return (
    <button className="cursor-pointer" onClick={button}>
      {icon}
    </button>
  );
};

export default MenuToggle;
