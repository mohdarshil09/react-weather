import React, { useMemo } from "react";
import "../css/DetailsCard.css";
import { useTranslation } from "react-i18next";
import CloudsCard from "./CloudsCard";
import MoreInfoCard from "./MoreInfoCard";

function DetailsCard({ weather_icon, data, degreeSymbol }) {
  const { clouds, main, weather } = data.list[0];
  const { t } = useTranslation();

  const formattedData = useMemo(() => {
    return {
      temp: Math.round(main.temp),
      feels_like: Math.round(main.feels_like),
      temp_min: Math.round(main.temp_min),
    };
  }, [main.feels_like, main.temp, main.temp_min]);

  return (
    <div className="details">
      <CloudsCard
        data={{ formattedData, degreeSymbol, weather, weather_icon }}
      />
      <MoreInfoCard data={{ formattedData, degreeSymbol, main, clouds, t }} />
    </div>
  );
}

export default DetailsCard;