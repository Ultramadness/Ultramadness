import { RevealText } from "./RevealText";

const LinksAnimation = ({
  open,
  text,
  delay,
  onClick,
  link,
}: {
  open: boolean;
  text: string;
  delay: number;
  onClick: () => void;
  link: string;
}) => {
  return (
    <li className="font-crimson font-thin tracking-tight text-6xl h-16 md:text-7xl xl:text-8xl md:h-20 xl:h-[98px] overflow-hidden relative">
      <span
        onClick={onClick}
        style={{ transitionDelay: `${delay}ms` }}
        className={`w-max cursor-pointer absolute transition-all ease-[cubic-bezier(0.76,0,0.24,1)] duration-900 ${
          open ? "translate-y-0" : "translate-y-[130px]"
        }`}
      >
        <RevealText text={text} to={link} delayPerLetter={30} />
      </span>
    </li>
  );
};

export default LinksAnimation;
