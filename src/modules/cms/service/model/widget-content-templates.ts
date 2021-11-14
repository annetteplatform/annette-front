import {WidgetContent} from './post';

export interface WidgetContentTemplate {
  id: string,
  name: string,
  widgetContent: WidgetContent
}

export function widgetContentTemplates(): WidgetContentTemplate[] {
  return [
    {
      id: 'markdown-01',
      name: 'Markdown: Empty',
      widgetContent: {
        id: '',
        widgetType: 'markdown',
        data: '',
        indexData: ''
      }
    },

    {
      id: 'markdown-02',
      name: 'Markdown: lorem ipsum',
      widgetContent: {
        id: '',
        widgetType: 'markdown',
        data: '# Lorem ipsum!\n\n' +
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ullamcorper sodales libero sit amet auctor. Suspendisse tempus ipsum in turpis faucibus, sed aliquet est dapibus. Quisque tempus, nulla vitae dignissim porttitor, erat nunc placerat mauris, nec facilisis magna turpis eget nisl. Vivamus nec enim eget quam varius elementum. Morbi eu semper lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacus ante, molestie ac ante nec, eleifend sodales risus. Nunc eget libero congue, blandit nibh in, suscipit lorem.\n' +
          '\n' +
          'Mauris eu leo urna. Cras sit amet dolor dolor. In tempus eros eget lacus suscipit, a dignissim nunc bibendum. Morbi eu faucibus dui, sit amet vehicula leo. Sed augue tellus, tincidunt quis augue et, pellentesque scelerisque arcu. Sed ullamcorper est nulla. Sed pharetra gravida magna, eget efficitur quam iaculis non. Cras ornare imperdiet tellus, id accumsan ipsum venenatis sit amet. Nulla facilisi. Sed molestie consequat metus, ac eleifend nibh gravida at. Duis sed tincidunt nisi. Mauris vestibulum, ligula tristique interdum tincidunt, enim diam placerat mauris, sed finibus metus felis in tellus. Proin vitae mi commodo, maximus tortor ut, bibendum ante. Nam ac nunc orci. Quisque sit amet eros a neque luctus pretium ut at magna.' +
          '\n',
        indexData: ''
      }
    },

    {
      id: 'html-01',
      name: 'HTML: Empty',
      widgetContent: {
        id: '',
        widgetType: 'html',
        data: '',
        indexData: ''
      }
    },
    {
      id: 'html-02',
      name: 'HTML: Lorem ipsum',
      widgetContent: {
        id: '',
        widgetType: 'html',
        data:
          '<h2>Lorem ipsum!</h2>\n' +
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ullamcorper sodales libero sit amet auctor. Suspendisse tempus ipsum in turpis faucibus, sed aliquet est dapibus. Quisque tempus, nulla vitae dignissim porttitor, erat nunc placerat mauris, nec facilisis magna turpis eget nisl. Vivamus nec enim eget quam varius elementum. Morbi eu semper lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacus ante, molestie ac ante nec, eleifend sodales risus. Nunc eget libero congue, blandit nibh in, suscipit lorem.</p>' +
          '<p>Mauris eu leo urna. Cras sit amet dolor dolor. In tempus eros eget lacus suscipit, a dignissim nunc bibendum. Morbi eu faucibus dui, sit amet vehicula leo. Sed augue tellus, tincidunt quis augue et, pellentesque scelerisque arcu. Sed ullamcorper est nulla. Sed pharetra gravida magna, eget efficitur quam iaculis non. Cras ornare imperdiet tellus, id accumsan ipsum venenatis sit amet. Nulla facilisi. Sed molestie consequat metus, ac eleifend nibh gravida at. Duis sed tincidunt nisi. Mauris vestibulum, ligula tristique interdum tincidunt, enim diam placerat mauris, sed finibus metus felis in tellus. Proin vitae mi commodo, maximus tortor ut, bibendum ante. Nam ac nunc orci. Quisque sit amet eros a neque luctus pretium ut at magna.</p>',
        indexData: ''
      }
    },
    {
      id: 'paralax-01',
      name: 'Paralax',
      widgetContent: {
        id: '',
        widgetType: 'paralax',
        data: {
          src: 'https://cdn.quasar.dev/img/parallax1.jpg',
          height: "200",
          speed: "0.5"
        },
        indexData: ''
      }
    }
  ]
}
