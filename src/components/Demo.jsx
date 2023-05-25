import React from "react";
import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../services/article";
import { copy, linkIcon, loader, tick } from "../assets";
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [copied, setCopied] = useState("");
  useEffect(() => {
    const articlesFromStorage = JSON.parse(localStorage.getItem("articles"));
    if (articlesFromStorage) {
      setAllArticles(articlesFromStorage);
    }
  }, []);
  const [allArticles, setAllArticles] = useState([]);
  const [getSummary, { err, isFetching }] = useLazyGetSummaryQuery();
  console.log({ err, isFetching });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };
  const handleCopy = (copyurl) => {
    setCopied(copyurl);
    navigator.clipboard.writeText(copyurl);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-ful gap-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={linkIcon}
            alt="link Icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn
          peer-focus:border-gray-700
          peer-focus:text-gray-700
          "
          >
            ↵
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p
                className="flex-1 font-satoshi text-blue-700 font-medium
                  text-sm truncate"
              >
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="
        my-10 max-w-full flex justify-center items-center
      "
      >
        {isFetching ? (
          <div className="flex flex-col w-full h-full justify-center items-center font-satoshi">
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
            <h1>Summary Is Loading Please Be Patient</h1>
          </div>
        ) : err ? (
          <p className="font-inter font-bold text-black text-center">
            Error Occurred
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {err?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
