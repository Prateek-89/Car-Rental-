import React from "react";

const Title = ({ title, subtitle, align = "center" }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center 
        ${align === "left" ? "md:items-start md:text-left" : ""}`}
    >
      <h2 className="font-semibold text-4xl md:text-[40px]">{title}</h2>

      {subtitle && (
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-[600px]">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Title;
