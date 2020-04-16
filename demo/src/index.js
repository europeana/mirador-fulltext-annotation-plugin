import mirador from 'mirador';

import { miradorEuropeanaFulltextAnnotationPlugin } from '../../src';

const config = {
  id: 'demo',
  windows: [{
    loadedManifest: 'https://iiif.europeana.eu/presentation/9200396/BibliographicResource_3000118436341/manifest'
  }],
  window: {
    allowClose: false,
    allowFullscreen: true,
    allowMaximize: false,
    allowTopMenuButton: false,
    sideBarOpenByDefault: true,
    defaultSideBarPanel: 'annotations',
    allowWindowSideBar: false,
    panels: {
      info: false,
      attribution: false,
      canvas: true,
      // Disabled due to performance issues with many annotations, pending
      // https://github.com/ProjectMirador/mirador/issues/2915
      annotations: true,
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
