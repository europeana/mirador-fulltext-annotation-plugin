import React, { Component, Fragment } from 'react'
import mirador from 'mirador';
import isEqual from 'lodash/isEqual';

class MiradorAnnototEndpoint extends Component {
  constructor(props) {
    super(props);
    this.fetchHandler = this.fetchHandler.bind(this);
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

  async fetchHandler(URI) {
    if (URI) {
      const fetchData = await fetch(URI, {
        method: 'GET',
      })

      const response = await fetchData.json()
      return response
    }
  }

  componentDidMount() {
    const { canvases, fetchAnnotation } = this.props;
    canvases.forEach(async canvas => {
      if (canvas) {
        const manifestId = canvas.options.resource.id
        const manifestResponse = await this.fetchHandler(manifestId);
        const annonPageResponse = this.getAnnoPageURIs(manifestResponse.sequences)
        const resourcesResponse = await this.fetchHandler(annonPageResponse[0]);
        const fullTextId = resourcesResponse.resources[0].resource['@id']
        const fullText = await this.fetchHandler(fullTextId)

        console.log(resourcesResponse.resources[0])
        
      }
    });
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
  target: 'WindowCanvasNavigationControls',
  mode: 'wrap',
  component: MiradorAnnototEndpoint,
  mapStateToProps: mapStateToProps,
  mapDispatchToProps: mapDispatchToProps,
}