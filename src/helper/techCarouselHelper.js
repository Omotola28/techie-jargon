
export function determineClasses(indexes, cardIndex) {
    if (indexes.currentIndex === cardIndex) {
      return "active";
    } else if (indexes.nextIndex === cardIndex) {
      return "next";
    } else if (indexes.previousIndex === cardIndex) {
      return "prev";
    }
    return "inactive";
}