import React from "react";

function MoreInfoCard({ data }) {
  const { formattedData, degreeSymbol, main, clouds, t } = data;

  return (
    <div className="more-info">
      <p className="">
        {t("RealFeel")}:{" "}
        <span>
          {formattedData.feels_like}
          {degreeSymbol}
        </span>
      </p>
      <p className="">
        {t("Humidity")}: <span>{main.humidity}%</span>
      </p>
      <p className="">
        {t("CloudCover")}: <span>{clouds.all}%</span>
      </p>
      <p className="">
        {t("min-Temp")}:{" "}
        <span>
          {formattedData.temp_min}
          {degreeSymbol}
        </span>
      </p>
      <p className="">
        {t("max-Temp")}:{" "}
        <span>
          {formattedData.temp_max}
          {degreeSymbol}
        </span>
      </p>
    </div>
  );
}

export default MoreInfoCard;
