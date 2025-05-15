import React, { Component } from 'react';
import { isAMPRequest } from 'utils/serverUtils';

const withReadMoreAndLessWrapper = (WrappedComponent) => {
  return class ReadMoreAndLess extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isExpanded: false,
      };
    }

    toggleExpanded = () => {
      this.setState((prevState) => ({
        expanded: !prevState.expanded,
      }));
    };

    render() {
      const { expanded } = this.state;
      const { text, characterLimit, isGlance = false } = this.props;
      const displayText = expanded
        ? text
        : isAMPRequest() || isGlance
        ? text
        : text;

      return (
        <WrappedComponent
          {...this.props}
          text={displayText}
          expanded={expanded}
          onToggle={this.toggleExpanded}
        />
      );
    }
  };
};

export default withReadMoreAndLessWrapper;
