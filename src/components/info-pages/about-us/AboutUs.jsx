import React, { PureComponent } from 'react';
import Article from '../../article/Article';
import { get } from 'axios';
import Preloader from '../../preloader/Preloader';

class AboutUs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    const API_Url = 'https://videodoctor.pp.ua/api_v1/about';

    get(API_Url).then((res) => {
      this.setState({
        title: res.data.title,
        text: res.data.text,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div className="main-page__section main-page__section_about-us AboutUs">
        {this.state.loading ? (
          <Preloader />
        ) : (
          <Article
            key={this.state.title}
            heading={this.state.title}
            content={this.state.text}
          />
        )}
      </div>
    );
  }
}

export default AboutUs;
