import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';

async function onActivate(plugin: ReactRNPlugin) {

  await plugin.app.registerWidget(
    'selected_text_dictionary',
    WidgetLocation.SelectedTextMenu,
    {
      dimensions: {
        height: 'auto',
        width: '100%',
      },
      widgetTabIcon: 'https://cdn-icons-png.flaticon.com/512/2069/2069571.png',
      widgetTabTitle: 'Dictionary',
    },
  );
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
