
export function determineClasses(indexes, cardIndex, IsHighlighted) {

    if (indexes.currentIndex === cardIndex || IsHighlighted) {
      return "active";
    } else if (indexes.nextIndex === cardIndex) {
      return "next";
    } else if (indexes.previousIndex === cardIndex) {
      return "prev";
    }
    return "inactive";
}

export function Illustration(props) 
{
  const {mainClass, illustration, description, imgClassName, optionalDivStyle} = props;
  return <div className={mainClass}>
    <div className= {optionalDivStyle ? optionalDivStyle : ''}>
      <img
        src={illustration}
        alt={description}
        className={imgClassName} />
    </div>
  </div>;
}