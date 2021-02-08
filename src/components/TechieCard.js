import React from "react";
import "./TechieCard/TechieCard.css";

function TechieCard(props) {
  const { card, determineClasses, indexes, index, notFound } = props;

  if (notFound) {
    return (
      <li>
        <h2>Not Found</h2>
        <p>Consider adding to our database? Thank you</p>
      </li>
    );
  }

  return (
    <li
      key={card.id + card.term}
      className={`card ${determineClasses(indexes, index)}`}
    >
      <h2>{card.term}</h2>
      <p>{card.definition}</p>
    </li>
  );
}

export default TechieCard;
