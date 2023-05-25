import React from 'react'
import {logo} from '../assets'
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("")}
          className="black_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles With <br className="max-md:hidden" />{" "}
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Introducing SummaAI a cutting-edge tool powered by OpenAI's advanced
        language model. With SummaAI, you can effortlessly condense lengthy
        articles into concise summaries. Harnessing the power of artificial
        intelligence, SummaAI delivers comprehensive and accurate summaries,
        saving you valuable time while ensuring you stay informed.
      </h2>
    </header>
  );
}

export default Hero