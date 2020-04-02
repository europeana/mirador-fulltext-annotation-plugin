import React, { Component, Fragment } from 'react';
import mirador from 'mirador';
import isEqual from 'lodash/isEqual';

class MiradorEuropeanaFulltextAnnotation extends Component {
  constructor(props) {
    super(props);
    this.fetchAnnotations = this.fetchAnnotations.bind(this);
  }

  fetchAnnotations(canvases) {
    console.log('MiradorEuropeanaFulltextAnnotation fetchAnnotations');
  }

  componentDidMount() {
    const { canvases } = this.props;
    this.fetchAnnotations(canvases);
  }

  componentDidUpdate(prevProps) {
    const { canvases } = this.props;
    const currentCanvasIds = canvases.map(canvas => canvas.id);
    const prevCanvasIds = (prevProps.canvases || []).map(canvas => canvas.id);
    if (!isEqual(currentCanvasIds, prevCanvasIds)) {
      this.fetchAnnotations(canvases);
    }
  }

  render() {
    const { TargetComponent } = this.props;

    return <TargetComponent {...this.props.targetProps} />;
  }
}

function mapStateToProps(state, { targetProps }) {
  return {
    canvases: mirador.selectors.getVisibleCanvases(state, { windowId: targetProps.windowId }),
    config: state.config,
  };
};

const mapDispatchToProps = {
  fetchAnnotation: mirador.actions.fetchAnnotation
};

export default {
  target: 'Window',
  mode: 'wrap',
  component: MiradorEuropeanaFulltextAnnotation,
  mapStateToProps: mapStateToProps,
  mapDispatchToProps: mapDispatchToProps,
}
