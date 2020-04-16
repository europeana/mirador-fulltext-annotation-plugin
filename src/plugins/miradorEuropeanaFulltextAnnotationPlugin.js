import React, { Component, Fragment } from 'react';
import * as ReactDOM from 'react-dom';
import mirador from 'mirador';
import isEqual from 'lodash/isEqual';
import createCachedSelector from 're-reselect';

class MiradorEuropeanaFulltextAnnotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annotations: []
    }
  }

  componentDidMount() {
    fetch('https://iiif.europeana.eu/presentation/9200396/BibliographicResource_3000118436341/annopage/1')
      .then(res => res.json())
      .then(res => {
        this.setState({
          annotations: res.resources
        })
        let fullTextData = JSON.stringify(this.state.annotations[1].resource).split('@id":"')[1].split('char=')[0]
        let firstAnnotationText = JSON.stringify(this.state.annotations[1].resource).split('char=')[1].substr(0,3)
        let textStart = parseInt(firstAnnotationText.split(',')[0])
        let textEnd = parseInt(firstAnnotationText.split(',')[1])
        let firstAnnotationShape = this.state.annotations[1].on.toString().split('xywh=')[1]
        let x = parseInt(firstAnnotationShape.split(',')[0])
        let y = parseInt(firstAnnotationShape.split(',')[1])
        let w = parseInt(firstAnnotationShape.split(',')[2]) / 2
        let h = parseInt(firstAnnotationShape.split(',')[3]) / 2

        const node = ReactDOM.findDOMNode(this);
        let canvasWidth = node.getBoundingClientRect().width
        let canvasHeight = node.getBoundingClientRect().height

        let c = document.createElement('canvas');
        c.width = canvasWidth
        c.height = canvasHeight
        c.style.position = "absolute";
        c.style.left = "105px";
        c.style.top = "-45px";
        c.style.zIndex = "100";
        c.style.pointerEvents = "none";
        document.body.appendChild(c);

        let ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.strokeStyle = "#4993d8";
        ctx.lineWidth = 3;
        ctx.stroke();

        let fullText = ''
        fetch(fullTextData)
          .then(res => res.json())
          .then(res => {
            fullText = res.value.substr( textStart, textEnd )
            console.log( fullText )
            return fullText
          })

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
