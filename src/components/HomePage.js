import React, { useEffect, useRef, useCallback, useState } from "react";
import TechieCard from "./TechieCard";
import Header from "./Header";
import CategoryForm from "./CategoryForm";
import "./HomePage/HomePage.css";
import {api} from '../helper/apiUrls';
import axios from 'axios';
import { determineClasses } from "../helper/techCarouselHelper";
import { BsFillCaretRightFill } from "react-icons/bs";
import Illustration1 from "../resources/illustration-img-1.svg";
import Illustration2 from "../resources/illustration-img-2.svg";
import Illustration3 from "../resources/illustration-img-3.svg";

function HomePage() {
  const [cardItems, setCardItems] = useState([]);
  const [previousCardItems, setPreviousCardItems] = useState([]);
  const categoryEl = useRef();
  const searchEl = useRef();

  const {allTerms, readTerm} = api;

  const [indexes, setIndexes] = useState({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      const output = await axios.get(allTerms);
      let termsInOneArray = [];
      output.data.map(function (item) {
        return termsInOneArray.push(item["item"]);;
      });

      setCardItems([].concat.apply([], termsInOneArray));
      setPreviousCardItems([].concat.apply([], termsInOneArray));
    };

    fetchData();
  }, []);

  const filterTechTerms = async (categoryText, searchText, setCardItems) => {
    const output = await axios.get(readTerm + categoryText);
    console.log(readTerm+categoryText);
    const termFound = Object.values(output[0]);
      let terms = termFound.filter(function (item) {
        return item.term === searchText;
      });

      setCardItems(terms);
  };

  const handleCardForwardTransition = useCallback(() => {
    // If we've reached the end, start again from the first card,
    // but carry previous value over
    if (indexes.currentIndex >= cardItems.length - 1) {
      setIndexes({
        previousIndex: cardItems.length - 1,
        currentIndex: 0,
        nextIndex: 1,
      });
    } else {
      setIndexes((prevState) => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === cardItems.length
            ? 0
            : prevState.currentIndex + 2,
      }));
    }
  }, [cardItems.length]);

  useEffect(() => {
    const transitionInterval = setInterval(() => {
      handleCardForwardTransition();
    }, 4000); // The interval value could also be a prop

    // Clear the interval when the component unmounts!
    return () => clearInterval(transitionInterval);
  }, [handleCardForwardTransition, indexes]);

  function handleSearchTerm(e) {
    e.preventDefault();

    let categoryText = makeTextCompatible(categoryEl.current.value);
    let searchText = searchEl.current.value.trim();

    if (categoryText === "category") {
      let terms = cardItems.filter(function (item) {
        return item.term === searchText;
      });

      setCardItems(terms);
    } else {
     filterTechTerms(categoryText, searchText, setCardItems);
    }
  }

  function makeTextCompatible(text) {
    let betterText = text.includes("&") ? text.replace("&", "and") : text;

    return betterText.split(" ").join("").toLowerCase();
  }

  function onChangeHandler() {
    if (searchEl.current.value === "") {
      setCardItems(previousCardItems);
    }
  }


  return (
    <>
      <Header
        categoryForm={
          <CategoryForm
            handleSubmit={handleSearchTerm}
            categoryEl={categoryEl}
            searchEl={searchEl}
            onChangeHandler={onChangeHandler}
          />
        }
      />
      <section className='grid-container'>
        <div className="row" id="bubbles">
              <div>
                <img src={Illustration3} alt={"illustration"} className='bubbles-img' />
              </div>
        </div>
        <div className="row" id="shape2">
                <div>
                  <img src={Illustration2} alt={"illustration"} className='shape2-img' />
                </div>
        </div>
        <div className="row" id="carousel">
            <ul className='card-carousel'>
              {cardItems.length === 0 ? (
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
              )}
            </ul>
            <BsFillCaretRightFill size={50} color="#2f2f2f" className="right-arrow btn" onClick={handleCardForwardTransition}/>
        </div>
        <div id="shape3" className="row">
              <div className='home__hero-img-wrapper'>
                <img src={Illustration1} alt={"illustration"} className='shape3-img' />
              </div>
        </div>
      </section>
    </>
  );
}
export default HomePage;
