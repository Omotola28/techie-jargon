import React, { useCallback, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  connectStats,
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
  process.env.REACT_APP_APPLICATION_ID,
  process.env.REACT_APP_SEARCH_ONLY_API_KEY
);

const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div className='not-found-card'>
        <p>No results have been found for </p>
        <p className='no-result'> {searchState.query}.</p>
      </div>
    )
);

function HomePage() {
  const [lengthOfIndices, setIndicesLength] = useState(20);

  const [indexes, setIndexes] = useState({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1,
  });

  const Stats = ({ processingTimeMS, nbHits }) => (
    
    <div className='noOfHits'>
      {setIndicesLength(nbHits)}
      Found {nbHits} results in {processingTimeMS}ms
    </div>
  );

  const CustomStats = connectStats(Stats);
 

  const handleCardForwardTransition = useCallback(() => {
    // If we've reached the end, start again from the first card,
    // but carry previous value over
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
        <Header />
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
                <Results>
                  <Hits hitComponent={Hit} />
                </Results>
                <CustomStats/>
                <BsFillCaretRightFill
                  size={50}
                  color='#2f2f2f'
                  className='right-arrow btn'
                  onClick={handleCardForwardTransition}
                />
              </ul>
            </div>
          </div>
          <div className='sideBar2'>
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
