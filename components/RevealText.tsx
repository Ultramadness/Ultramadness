export const RevealText = ({
  to,
  text,
  delayPerLetter = 30,
}: {
  to: string;
  text: string;
  delayPerLetter?: number;
}) => {
  const letters = text.split("");

  return (
    <a
      href={to}
      className="relative inline-block group overflow-hidden cursor-pointer"
    >
      <div className="block">
        {letters.map((letter: string, index: number) => (
          <span
            key={`top-${index}`}
            style={{ transitionDelay: `${index * delayPerLetter}ms` }}
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.024,1)] translate-y-0 group-hover:translate-y-[-110%]"
          >
            {letter === " " ? "\xa0" : letter}
          </span>
        ))}
      </div>
      <div className="block text-primary">
        {letters.map((letter: string, index: number) => (
          <span
            key={`bottom-${index}`}
            style={{ transitionDelay: `${index * delayPerLetter}ms` }}
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.024,1)] translate-y-full group-hover:translate-y-[-105%]"
          >
            {letter === " " ? "\xa0" : letter}
          </span>
        ))}
      </div>
    </a>
  );
};
