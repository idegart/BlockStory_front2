export default {
  state: {
    loading: false,
    textEditor: {
      visible: false,
      text: '',
      title: ''
    },
    windowSize: {
      height: 0,
      width: 0
    },
    editorMode: false
  },
  mutations: {
    setLoading(state, payload){
      state.loading = payload;
    },
    setTextEditor(state, payload){
      state.textEditor.visible = payload.visible;
      state.textEditor.text = payload.text;
    },
    setSize(state, payload){
      state.windowSize.height = payload.height;
      state.windowSize.width = payload.width;
    },
    setEditorMode(state, payload){
      state.editorMode = payload;
    }
  },
  getters: {
    getLoading(state){
      return state.loading;
    },
    getTextEditor(state){
      return state.textEditor;
    },
    getSize(state){
      return state.windowSize;
    },
    getEditorMode(state){
      return state.editorMode;
    }
  }
}
