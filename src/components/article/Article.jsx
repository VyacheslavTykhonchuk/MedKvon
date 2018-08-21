import React from "react";
import Btn from "../buttons/Btn";
const Article = props => (
  <article className="article">
    <header className="article__header">
      <h4 className="article__heading">{props.heading}</h4>
    </header>
    <section className="article__content">
      <p className="article__text">{props.content}</p>
    </section>
    <Btn text={"присоединиться"} appearing={"btn_small btn_blue"} />
  </article>
);

export default Article;
