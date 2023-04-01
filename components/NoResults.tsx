import React from "react";

interface Iprops {
  text: string;
  IconComponent: React.ElementType;
}

const NoResults = ({ text, IconComponent }: Iprops) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">
        <IconComponent />
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
