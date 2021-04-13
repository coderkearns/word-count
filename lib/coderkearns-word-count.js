'use babel';

import CoderkearnsWordCountView from './coderkearns-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  coderkearnsWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.coderkearnsWordCountView = new CoderkearnsWordCountView(state.coderkearnsWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.coderkearnsWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'coderkearns-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.coderkearnsWordCountView.destroy();
  },

  serialize() {
    return {
      coderkearnsWordCountViewState: this.coderkearnsWordCountView.serialize()
    };
  },

  toggle() {
    console.log('CoderkearnsWordCount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
