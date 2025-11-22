export const TitleSection = ({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div
      className={`${className} space-y-4 w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl`}
    >
      <h2 className={`font-crimson text-6xl lg:text-7xl font-light italic`}>
        {title}
      </h2>
      {description && (
        <p className="text-xl lg:text-2xl xl:text-3xl font-light 2xl:w-10/12">
          {description}
        </p>
      )}

      <div className="w-2/4 bg-primary h-1" />
    </div>
  );
};
