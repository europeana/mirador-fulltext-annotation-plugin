import React, { Component, Fragment } from 'react';
import mirador from 'mirador';
import isEqual from 'lodash/isEqual';

class MiradorEuropeanaFulltextAnnotation extends Component {
  constructor(props) {
    super(props);
    this.fetchManifest = this.fetchManifest.bind(this);
    this.getAnnoPageURIs = this.getAnnoPageURIs.bind(this);
  }

  getAnnoPageURIs(sequences) {
    const annoPageURIs = []
    sequences.forEach((seq) => {
      seq.canvases.forEach((canvas) => {
        canvas.otherContent.forEach(oc => {
          annoPageURIs.push(oc)
        })
      })
    })

    return annoPageURIs
  }

  async fetchManifest(manifestId) {
    if (manifestId) {
      try {
        const fetchData = await fetch(manifestId, {
          method: 'GET',
        })

        const response = await fetchData.json()
        return response
      } catch (err) {
        console.log(err)
      }
    }
  }

  async componentDidMount() {
    const { targetProps } = this.props
    const { manifestId } = targetProps;
    const manifestResponse = await this.fetchManifest(manifestId);

    const monkey = this.getAnnoPageURIs(manifestResponse.sequences)

    console.log('fetch', monkey)

    
  }

  // componentDidUpdate(prevProps) {
  //   const { canvases } = this.props;
  //   const currentCanvasIds = canvases.map(canvas => canvas.id);
  //   const prevCanvasIds = (prevProps.canvases || []).map(canvas => canvas.id);
  //   if (!isEqual(currentCanvasIds, prevCanvasIds)) {
  //     this.fetchAnnotations(canvases);
  //   }
  // }

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
