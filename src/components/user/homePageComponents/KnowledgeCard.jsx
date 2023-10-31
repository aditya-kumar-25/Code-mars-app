import React from "react";
import Card from "./Card";
import { data } from "../../../utils/cardData";

function KnowledgeCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-16 px-2 py-8 gap-x-3 gap-y-5">
      {data.map((cardData, index) => (
        <Card
          key={index}
          icon={cardData.icon}
          title={cardData.title}
          description={cardData.description}
          link={cardData.link}
        />
      ))}
    </div>
  );
}

export default KnowledgeCard;
