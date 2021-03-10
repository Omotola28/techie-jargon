import React, { useState, useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { GiAbstract021, GiBallHeart } from "react-icons/gi";
import axios from "axios";
import {
  TiSocialInstagram,
  TiSocialTwitter,
  TiSocialGithub,
  TiSocialDribbbleCircular,
} from "react-icons/ti";
import {
  CREATE_JARGON_API_LINK,
  BMC_LINK,
  TWITTER_LINK,
  INSTAGRAM_LINK,
  BLOG_LINK,
  GITHUB_LINK,
} from "../constants/externalLinks";
import { RequestState, LIMIT } from "../constants/requestState";
import BuyMeCoffee from "../resources/bmc.svg";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import Badges from "./Badges";
import "./Header/Header.css";
import { SearchBox } from "react-instantsearch-dom";

function Header() {
  const initialCount = () => Number(window.localStorage.getItem("count"));
  const [click, setClick] = useState(false);
  const [noOfSubmits, setNoOfSubmits] = useState(initialCount);
  const [open, setOpen] = useState(false);
  const { width, height } = useWindowSize();
  const [status, setStatus] = useState(RequestState.NOACTION);
  const closeModal = () => setOpen(false);

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    window.localStorage.setItem("count", noOfSubmits);
  }, [noOfSubmits]);

  const onHandleJargonSubmit = (data) => {
    setStatus(RequestState.LOADING);
    axios
      .post(CREATE_JARGON_API_LINK, data)
      .then(function (response) {
        if (response.status !== 200) {
          setStatus(RequestState.ERROR);
        }

        setStatus(RequestState.SUCCESS);
        setNoOfSubmits(noOfSubmits + 1);
        setTimeout(() => {
          closeModal();
          setStatus(RequestState.NOACTION);
        }, 2000);
      })
      .catch(function (error) {
        setStatus(RequestState.ERROR);
      });
  };

  return (
    <header className='navBar'>
      <div className='nav-container'>
        <SearchBox
          className='search-bar'
          translations={{ placeholder: "Search Techie Jargon" }}
        />
        <div className='menu-icon' onClick={handleClick}>
          {click ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {returnEmptyListItem()}
          {returnEmptyListItem()}
          <li className='nav-item'>
            <GiAbstract021 size={32} />
            <span className='link-text'>Badges</span>
          </li>
          <Badges size={20} noOfSubmits={noOfSubmits} />
          <li className='nav-item transitionCard'>
            <GiBallHeart size={32} />
            {noOfSubmits > LIMIT ? (
              <span className='link-text'>Submit Limit Reached :)</span>
            ) : (
              <span
                onClick={() => {
                  setOpen((o) => !o);
                  closeMenu();
                }}
                className='link-text'
              >
                Add Techie Jargon
              </span>
            )}
          </li>
          {returnPopForm()}
          {returnEmptyListItem()}
          {returnSideMenuFooter()}
        </ul>
      </div>
    </header>
  );

  function returnSideMenuFooter() {
    return (
      <li className='nav-item creator-info'>
        <div className='sidebar-footer'>
            <a href={BMC_LINK} target='_blank' rel='noreferrer'>
              <div className='bmc-logo'>
                <img src={BuyMeCoffee} alt={"Buy me coffee"} />
              </div>
            </a>
          {returnSocialIcons()}
        </div>
      </li>
    );
  }

  function returnEmptyListItem() {
    return <li className='nav-item-empty'></li>;
  }

  function returnSocialIcons() {
    return (
      <div className='social-icons'>
        <a href={INSTAGRAM_LINK}>
          <div>
            <TiSocialInstagram size={20} />
          </div>
        </a>
        <a href={BLOG_LINK}>
          <TiSocialDribbbleCircular size={20} />
        </a>
        <a href={TWITTER_LINK}>
          <TiSocialTwitter size={20} />
        </a>
        <a href={GITHUB_LINK}>
          <TiSocialGithub size={20} />
        </a>
        <span>Built by @mycodinghabits</span>
      </div>
    );
  }

  function returnPopForm() {
    return (
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className='modal'>
          {status === RequestState.SUCCESS && (
            <Confetti width={width / 2.5} height={height / 2} />
          )}
          <button className='close' onClick={closeModal}>
            &times;
          </button>
          {status === RequestState.ERROR && (
            <p className='error-message'>
              Something went wrong, try again later
            </p>
          )}
          {status === RequestState.LOADING ? (
            <div className='header'>
              <h3>Your term will show after it has been verified!</h3>
            </div>
          ) : (
            <div className='header'>
              <h3>Add Techie Jargon</h3>
            </div>
          )}
          <div className='content'>
            <form
              className='form-header'
              onSubmit={handleSubmit(onHandleJargonSubmit)}
            >
              <div className='form-group'>
                <label htmlFor='term'>Write Term</label>
                <input
                  name='term'
                  type='text'
                  ref={register({
                    required: "*Term field cannot be empty",
                    maxLength: 20,
                  })}
                />
                {errors.term && (
                  <span className='error-message'>{errors.term.message}</span>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='definition'>Write Definition</label>
                <textarea
                  name='definition'
                  rows={10}
                  cols={50}
                  ref={register({
                    required: "*Definition field cannot be empty",
                  })}
                />
                {errors.definition && (
                  <span className='error-message'>
                    {errors.definition.message}
                  </span>
                )}
              </div>
              <div className='form-group'>
                {status === RequestState.LOADING ? (
                  <span className='request-waiting'>
                    Processing request....
                  </span>
                ) : (
                  <input type='submit' />
                )}
              </div>
            </form>
          </div>
        </div>
      </Popup>
    );
  }
}

export default Header;
