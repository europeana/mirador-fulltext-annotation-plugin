import mirador from 'mirador';

import { miradorEuropeanaFulltextAnnotationPlugin } from '../../src';

const config = {
  id: 'demo',
  windows: [{
    loadedManifest: 'https://iiif.europeana.eu/presentation/9200301/BibliographicResource_3000126341277/manifest'
  }],
  window: {
    allowClose: false,
    allowFullscreen: true,
    allowMaximize: false,
    allowTopMenuButton: false,
    allowWindowSideBar: false,
    panels: {
      info: false,
      attribution: false,
      canvas: true,
      // Disabled due to performance issues with many annotations, pending
      // https://github.com/ProjectMirador/mirador/issues/2915
      annotations: false,
      search: false
    }
  },
  workspace: {
    showZoomControls: true,
    type: 'mosaic'
  },
  workspaceControlPanel: {
    enabled: false
  }
};

const miradorInstance = mirador.viewer(config, [
  miradorEuropeanaFulltextAnnotationPlugin,
]);
