import React, { useCallback, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  connectHits,
  connectHighlight,
  connectStateResults,
} from "react-instantsearch-dom";
import TechieCard from "./TechieCard";
import Header from "./Header";
import "./HomePage/HomePage.css";
import { determineClasses, Illustration } from "../helper/techCarouselHelper";
import { BsFillCaretRightFill } from "react-icons/bs";
import Illustration1 from "../resources/illustration-img-1.svg";
import Illustration2 from "../resources/illustration-img-2.svg";
import Illustration3 from "../resources/illustration-img-3.svg";

const searchClient = algoliasearch(
  "HYNMEB36NP",
  "bb1451a177778bc6f07bbf99fffe1622"
);

const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div>No results have been found for {searchState.query}.</div>
    )
);

function HomePage() {
  const [lengthOfIndices, setIndicesLength] = useState(20);
  // const [previousCardItems, setPreviousCardItems] = useState([]);
  // const categoryEl = useRef();
  // const searchEl = useRef();

  // const { allTerms, readTerm } = api;

  const [indexes, setIndexes] = useState({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1,
  });

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   const output = await axios.get(allTerms);
  //   //   let termsInOneArray = [];
  //   //   output.data.map(function (item) {
  //   //     return termsInOneArray.push(item["item"]);
  //   //   });

  //   //   setCardItems([].concat.apply([], termsInOneArray));
  //   //   setPreviousCardItems([].concat.apply([], termsInOneArray));
  //   // };

  //   // fetchData();

  // }, []);

  const NoOfHits = ({ hits }) => (
    <div className='noOfHits'>
      {setIndicesLength(hits.length)}
      {`Results:- ${hits.length}`}
    </div>
  );
  const CustomHits = connectHits(NoOfHits);

  // const filterTechTerms = async (categoryText, searchText, setCardItems) => {
  //   const output = await axios.get(readTerm + categoryText);
  //   console.log(readTerm + categoryText);
  //   const termFound = Object.values(output[0]);
  //   let terms = termFound.filter(function (item) {
  //     return item.term === searchText;
  //   });

  //   setCardItems(terms);
  // };

  const handleCardForwardTransition = useCallback(() => {
    // If we've reached the end, start again from the first card,
    // but carry previous value over
    console.log(indexes, lengthOfIndices);
    if (indexes.currentIndex >= lengthOfIndices - 1) {
      setIndexes({
        previousIndex: lengthOfIndices - 1,
        currentIndex: 0,
        nextIndex: 1,
      });
    } else {
      setIndexes((prevState) => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === lengthOfIndices
            ? 0
            : prevState.currentIndex + 2,
      }));
    }
  }, [indexes.currentIndex]);

  // useEffect(() => {
  //   const transitionInterval = setInterval(() => {
  //     handleCardForwardTransition();
  //   }, 4000); // The interval value could also be a prop

  //   // Clear the interval when the component unmounts!
  //   return () => clearInterval(transitionInterval);
  // }, [handleCardForwardTransition, indexes]);

  // function handleSearchTerm(e) {
  //   e.preventDefault();

  //   let categoryText = makeTextCompatible(categoryEl.current.value);
  //   let searchText = searchEl.current.value.trim();

  //   if (categoryText === "category") {
  //     let terms = cardItems.filter(function (item) {
  //       return item.term === searchText;
  //     });

  //     setCardItems(terms);
  //   } else {
  //     filterTechTerms(categoryText, searchText, setCardItems);
  //   }
  // }

  // function makeTextCompatible(text) {
  //   let betterText = text.includes("&") ? text.replace("&", "and") : text;

  //   return betterText.split(" ").join("").toLowerCase();
  // }

  // function onChangeHandler() {
  //   if (searchEl.current.value === "") {
  //     setCardItems(previousCardItems);
  //   }
  // }

  const Hit = ({ hit }) => <CustomHighlight attribute='term' hit={hit} />;

  const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
    const parsedHit = highlight({
      highlightProperty: "_highlightResult",
      attribute,
      hit,
    });

    return (
      <TechieCard
        card={hit}
        parsedHit={parsedHit}
        determineClasses={determineClasses}
        indexes={indexes}
      />
    );
  });

  return (
    <>
      <InstantSearch indexName='techterms' searchClient={searchClient}>
        <Header
          nbOfHits={CustomHits}
          // categoryForm={
          //   <CategoryForm
          //     handleSubmit={handleSearchTerm}
          //     categoryEl={categoryEl}
          //     searchEl={searchEl}
          //     onChangeHandler={onChangeHandler}
          //   />
          // }
        />
        <section className='grid-container'>
          <Illustration
            mainClass='row shape2'
            illustration={Illustration2}
            description='icon shape'
            imgClassName='shape2-img'
          />
          <div className='main'>
            <div className='row carousel'>
              <ul className='card-carousel'>
                {/* {cardItems.length === 0 ? (
                <TechieCard notFound={true} />
              ) : (
                cardItems.map((card, index) => (
                  <TechieCard
                    card={card}
                    determineClasses={determineClasses}
                    indexes={indexes}
                    index={index}
                  />
                ))
              )} */}
                <Results>
                  <Hits hitComponent={Hit} />
                </Results>
                <CustomHits />
                <BsFillCaretRightFill
                  size={50}
                  color='#2f2f2f'
                  className='right-arrow btn'
                  onClick={handleCardForwardTransition}
                />
              </ul>
            </div>
          </div>
          <div className="sideBar2">
            <Illustration
              mainClass='row bubbles'
              illustration={Illustration3}
              description='icon bubble'
              imgClassName='bubbles-img'
            />
            <Illustration
              mainClass='row shape3'
              illustration={Illustration1}
              description='icon shape'
              imgClassName='shape3-img'
              optionalDivStyle='div-img-wrapper'
            />
          </div>
        </section>
      </InstantSearch>
    </>
  );
}
export default HomePage;
