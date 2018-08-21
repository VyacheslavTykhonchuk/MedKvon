import React from "react";
import Article from "../../article/Article";
const articles = [
  {
    heading: `Lorem ipsum dolor sit amet, tation laboramus assueveri ttation`,
    content: `Lorem ipsum dolor sit amet, tation laboramus assueverit an sed, vis dolore disputationi et. Qui ex quando prompta, lobortis rationibus at per. Quo ad choro graeco disputando. Oblique sententiae definiebas pro an. Est id novum veritus temporibus. Accusamus concludaturque sed id, est at denique vulputate. Et solum accumsan quaerendum vim, ad debet tation eumLorem ipsum dolor sit amet, tation laboramus assueverit an sed, vis dolore disputationi et. Qui ex quando prompta, lobortis rationibus at per. Quo ad choro graeco disputando. Oblique sententiae definiebas pro an. Est id novum veritus temporibus. Accusamus concludaturque sed id, est at denique vulputate. Et solum accumsan quaerendum vim, ad debet tation eum.Lorem ipsum dolor sit amet, tation laboramus assueverit an sed, vis dolore disputationi et. Qui ex quando prompta, lobortis rationibus at per. Quo ad choro graeco disputando. Oblique sententiae definiebas pro an. Est id novum veritus temporibus. Accusamus concludaturque sed id, est at denique vulputate. Et solum accumsan quaerendum vim, ad debet tation eum.Lorem ipsum dolor sit amet, tation laboramus assueverit an sed, vis dolore disputationi et. Qui ex quando prompta, lobortis rationibus at per.rompta, lobortis rationibus at per.`
  }
];
const AboutUs = props => (
  <div className="main-page__section main-page__section_about-us AboutUs">
    {articles.map(item => (
      <Article
        key={item.heading}
        heading={item.heading}
        content={item.content}
      />
    ))}
  </div>
);

export default AboutUs;
