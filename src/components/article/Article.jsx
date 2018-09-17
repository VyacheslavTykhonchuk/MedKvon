import React from 'react';

const Article = (props) => (
  <article className="article">
    <header className="article__header">
      <h4 className="article__heading">{props.heading}</h4>
    </header>
    <section className="article__content">
      <p className="article__text">{props.content}</p>
    </section>
  </article>
);

export default Article;
