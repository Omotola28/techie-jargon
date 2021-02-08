import React, { useState, useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { GiAbstract021, GiBallHeart } from "react-icons/gi";
import axios from "axios";
import {TiSocialInstagram, TiSocialTwitter, TiSocialGithub, TiSocialDribbbleCircular } from "react-icons/ti"; 
import {api} from "../helper/apiUrls";
import BuyMeCoffee from "../resources/bmc.svg";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import Badges from "./Badges";
import "./Header/Header.css";

function Header(props) {
  const { categoryForm } = props;

  const initialCount = () => Number(window.localStorage.getItem('count')); 
  const [click, setClick] = useState(false);
  const [noOfSubmits, setNoOfSubmits] = useState(initialCount);
  const [open, setOpen] = useState(false);
  const { width, height } = useWindowSize();
  const [formSubmitSuccess, setFormSubmitSuccess] = useState();
  const closeModal = () => setOpen(false);

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const { register, handleSubmit, errors } = useForm();

  const {create} = api;

  useEffect(() => {
    window.localStorage.setItem('count', noOfSubmits)
  }, [noOfSubmits]);

  const onSubmit = (data) => {
    console.log(data);
    axios.post(create, data)
    .then(function (response) {
      if(response.status !== 200){
        setFormSubmitSuccess(false);
      }

        setFormSubmitSuccess(true);
        setNoOfSubmits(noOfSubmits + 1);
        setTimeout(() => {
          closeModal();
          setFormSubmitSuccess(null);
        }, 3000);
    })
    .catch(function (error) {
      setFormSubmitSuccess(false);
    });
  };

  return (
    <header className='navBar'>
      <div className='nav-container'>
        {categoryForm}
        <div className='menu-icon' onClick={handleClick}>
          {click ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className='nav-item-empty'></li>
          <li className='nav-item-empty'></li>
          <li className='nav-item'>
            <GiAbstract021 size={32} />
            <span className='link-text'>Badges</span>
          </li>
          <Badges size={20} noOfSubmits={noOfSubmits} />
          <li className='nav-item'>
            <GiBallHeart size={32} />
            <span
              onClick={() => {
                setOpen((o) => !o);
                closeMenu();
              }}
              className='link-text'
            >
              Add Techie Jargon
            </span>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
              <div className='modal'>
                {formSubmitSuccess === true ? (
                  <Confetti width={width / 2.5} height={height / 2} />
                ) : null}
                <button className='close' onClick={closeModal}>
                  &times;
                </button>
                {formSubmitSuccess === false ? (
                  <p className='error-message'>
                    Something went wrong, try again later
                  </p>
                ) : (
                  ""
                )}
                <div className='header'> Add Techie Jargon</div>
                <div className='content'>
                  <form
                    className='form-header'
                    onSubmit={handleSubmit(onSubmit)}
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
                        <span className='error-message'>
                          {errors.term.message}
                        </span>
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
                      <input type='submit' />
                    </div>
                  </form>
                </div>
              </div>
            </Popup>
          </li>
          <li className='nav-item creator-info'>
            <div className='sidebar-footer'>
              <div>
                  <p>Built by @mycodinghabits</p>
                  <div className="bmc-logo">
                      <a href="https://www.buymeacoffee.com/mycodinghabits"><img src={BuyMeCoffee} alt={"Buy me coffee"}/></a>
                  </div>
              </div>
              
              <div className='social-icons'>
                <a href='http://instagram.com/mycodinghabits'><TiSocialInstagram size={20}/></a>
                <a href='http://blog.oshogunle.com'><TiSocialDribbbleCircular size={20}/></a>
                <a href='https://twitter.com/mycodinghabits'><TiSocialTwitter size={20}/></a>
                <a href='https://github.com/Omotola28'><TiSocialGithub size={20}/></a>
              </div>
              
            </div>
          
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
