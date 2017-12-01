export default {
  state: {
    editor: {
      gameHash: '',
      chapterHash: ''
    },
    alias: '',
    toolbarVisible: true,
    blocks: [],
    chapters: [],
    chapterStarter: '',
    params: [],
    container: null,
    editorTextEditor: {
      visible: false,
      fullScreen: true,
      title: '',
      params: {},
      block: {}
    },
    connection: {
      start: {
        block: {},
        position: {
          top: 0,
          left: 0
        },
        param: {}
      },
      dragging: {
        position: {
          top: 0,
          left: 0
        }
      },
      stop: {
        block: {},
        position: {
          top: 0,
          left: 0
        },
        param: {}
      },
      lastPosition: {
        top: 0,
        left: 0
      }
    }
  },
  mutations: {
    setToolbarVisible(state, payload){
      state.toolbarVisible = payload;
    },
    setEditor(state, payload){
      state.editor.gameHash = payload.game;
      state.editor.chapterHash = payload.chapter
    },
    setBlocks(state, payload){
      state.blocks = payload;
    },
    deleteBlock(state, block){
      state.blocks.splice(state.blocks.indexOf(block),1);
    },
    addBlock(state, block){
      state.blocks.push(block);
    },
    setContainer(state, container){
      state.container = container;
    },
    setEditorTextEditor(state, payload) {
      state.editorTextEditor.visible = payload.visible || false;
      state.editorTextEditor.title = payload.title || '';
      state.editorTextEditor.fullScreen = payload.fullScreen || true;
      state.editorTextEditor.params = payload.params || {};
      state.editorTextEditor.block = payload.block || {};
    },
    updateTextBlock(state, payload){
      state.blocks.forEach(block => {
        if (block.hash === payload.block_hash){
          block.extra.text = payload.text
        }
      });
    },
    startDragging(state, payload){
      state.isDragging = true;
      state.connection.start = {
        block: payload.block || {},
        position: {
          top: payload.hasOwnProperty('position') ? payload.position.top : 0,
          left: payload.hasOwnProperty('position') ? payload.position.left : 0
        },
        param: payload.param || {}
      };

      if (!payload.hasOwnProperty('block')) {
        state.connection.dragging.position = {
          top: 0,
          left: 0
        }
      }
    },
    setDragging(state, payload){
      state.connection.dragging = {
        position: {
          top: payload.position ? payload.position.top || 0 : 0,
          left: payload.position ? payload.position.left || 0 : 0
        }
      }
    },
    stopDragging(state, payload){
      state.isDragging = false;
      state.connection.stop = {
        block: payload.block || {},
        position: {
          top: payload.position ? payload.position.top || 0 : 0,
          left: payload.position ? payload.position.left || 0 : 0
        },
        param: payload.param || {}
      }
    },
    clearDragging(state){
      state.connection.start = {
        block: {},
        position: {
          top: 0,
          left: 0
        },
        param: {}
      };

      state.connection.dragging = {
        position: {
          top: 0,
          left: 0
        }
      };
      state.connection.stop = {
        block: {},
        position: {
          top: 0,
          left: 0
        },
        param: {}
      };
    },
    setChapters(state, payload){
      state.chapters = payload;
    },
    setParams(state, payload){
      state.params = payload;
    },
    addParam(state, payload){
      state.params.push(payload);
    },
    deleteParam(state, payload){
      state.params.splice(state.params.indexOf(payload),1);
    },
    setChapterStarter(state, payload){
      state.chapterStarter = payload;
    },
    addChapter(state, payload){
      state.chapters.push(payload);
    },
    setAlias(state, payload){
      state.alias = payload;
    }
  },
  getters: {
    getToolbarVisible(state){
      return state.toolbarVisible;
    },
    getEditor(state){
      return state.editor;
    },
    getBlocks(state){
      return state.blocks;
    },
    getContainer(state){
      return state.container;
    },
    getEditorTextEditor(state){
      return state.editorTextEditor;
    },
    getStopDragging(state){
      return state.connection.stop;
    },
    getStartDragging(state){
      return state.connection.start;
    },
    getConnection(state){
      return state.connection;
    },
    getChapters(state){
      return state.chapters;
    },
    getParams(state){
      return state.params;
    },
    getChapterStarter(state){
      return state.chapterStarter;
    },
    getAlias(state){
      return state.alias;
    }
  }
}
