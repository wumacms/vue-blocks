import VisualBuilder from './VisualBuilder.vue'
import BuilderHeader from './components/BuilderHeader.vue'
import MaterialPalette from './components/MaterialPalette.vue'
import PropertyInspector from './components/PropertyInspector.vue'
import JsonExportModal from './components/JsonExportModal.vue'
import FieldRenderer from './fields/FieldRenderer.vue'

export * from './state/editorState.js'
export * from './state/commandHistory.js'
export * from './state/storageAdapter.js'
export * from './state/defaultPages.js'
export * from './fields/fieldRegistry.js'

export {
  VisualBuilder,
  BuilderHeader,
  MaterialPalette,
  PropertyInspector,
  JsonExportModal,
  FieldRenderer
}

VisualBuilder.install = (app) => {
  app.component(VisualBuilder.name || 'VisualBuilder', VisualBuilder)
}

export default VisualBuilder
