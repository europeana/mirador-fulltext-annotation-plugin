import React, { Component, Fragment } from 'react';
import mirador from 'mirador';
import isEqual from 'lodash/isEqual';
import createCachedSelector from 're-reselect';

class MiradorEuropeanaFulltextAnnotation extends Component {
  constructor(props) {
    super(props);
    this.fetchAnnotations = this.fetchAnnotations.bind(this);
    this.state = {
      annotations: []
    }
  }

  fetchAnnotations(canvases) {

    // console.log('MiradorEuropeanaFulltextAnnotation fetchAnnotations');
  }

  componentDidMount() {
    const { canvases } = this.props;
    this.fetchAnnotations(canvases);

    fetch('https://iiif.europeana.eu/presentation/9200396/BibliographicResource_3000118436341/annopage/1')
      .then(res => res.json())
      .then(res => {
        this.setState({
          annotations: res.resources
        })
        let fullTextData = JSON.stringify(this.state.annotations[1].resource).split('@id":"')[1].split('char=')[0]
        let firstAnnotationText = JSON.stringify(this.state.annotations[1].resource).split('char=')[1].substr(0,3)
        let firstAnnotationShape = this.state.annotations[1].on.toString().split('xywh=')[1]
        fetch(fullTextData)
          .then(res => res.json())
          .then(res => {
            let fullText = res.value
            console.log(res.value.substr( parseInt(firstAnnotationText) ))
          })
        console.log(parseInt(firstAnnotationText))
        console.log(firstAnnotationShape)
      })

  }

  componentDidUpdate(prevProps) {
    // const { canvases } = this.props;
    // const currentCanvasIds = canvases.map(canvas => canvas.id);
    // const prevCanvasIds = (prevProps.canvases || []).map(canvas => canvas.id);
    // if (!isEqual(currentCanvasIds, prevCanvasIds)) {
    //   this.fetchAnnotations(canvases)
    // }
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
