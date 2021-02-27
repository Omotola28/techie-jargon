import React, { useState, useEffect } from "react";
import "./TechieCard/TechieCard.css";

function TechieCard(props) {
  const { card, parsedHit, determineClasses, indexes } = props;
  const [IsMarked, setIsMarked] = useState(false);

  useEffect(() => {
    //Still show marked card for when tech jargon is active
    let isMarked = parsedHit
      .map((part) => (part.isHighlighted ? true : false))
      .includes(true);
    isMarked ? setIsMarked(true) : setIsMarked(false);
  }, [parsedHit]);

  return (
    <li
      key={card.id}
      className={`card ${determineClasses(indexes, card.__position, IsMarked)}`}
    >
      <h2>
        {parsedHit.map((part) =>
          part.isHighlighted ? <mark>{part.value}</mark> : part.value
        )}
      </h2>
      <p>{card.definition}</p>
    </li>
  );
}

export default TechieCard;
