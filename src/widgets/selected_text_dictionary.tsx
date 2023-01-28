import { renderWidget, SelectionType, usePlugin, useTracker } from '@remnote/plugin-sdk';

export const SelectedTextDictionary = () => {

  const plugin = usePlugin();

  const selectedText = useTracker(async (reactActivePlugin) => {
    const sel = await reactActivePlugin.editor.getSelection();
    if (sel?.type == SelectionType.Text) {
      return await plugin.richText.toString(sel.richText);
    } else {
      return "";
    }
  });


  return <div>{selectedText}</div>
}

renderWidget(SelectedTextDictionary)
