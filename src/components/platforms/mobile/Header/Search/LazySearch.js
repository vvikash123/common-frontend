import React from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import(/* webpackChunkName: 'Search' */ './Search'),
  loading: () => null,
});

export default class LazySearch extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, 3000);
  }

  render() {
    const { load } = this.state;
    if (!load) {
      return null;
    }
    return <LoadableComponent {...this.props} />;
  }
}
