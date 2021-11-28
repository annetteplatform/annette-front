import {MarkdownData, markdownToIndex} from '../widget-model';
import {defaultLayout} from './layout';
import {WidgetTemplate} from './template';

const markdownLoremIpsum = '# Lorem ipsum!\n\n' +
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ullamcorper sodales libero sit amet auctor. Suspendisse tempus ipsum in turpis faucibus, sed aliquet est dapibus. Quisque tempus, nulla vitae dignissim porttitor, erat nunc placerat mauris, nec facilisis magna turpis eget nisl. Vivamus nec enim eget quam varius elementum. Morbi eu semper lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacus ante, molestie ac ante nec, eleifend sodales risus. Nunc eget libero congue, blandit nibh in, suscipit lorem.\n\n' +
  'Mauris eu leo urna. Cras sit amet dolor dolor. In tempus eros eget lacus suscipit, a dignissim nunc bibendum. Morbi eu faucibus dui, sit amet vehicula leo. Sed augue tellus, tincidunt quis augue et, pellentesque scelerisque arcu. Sed ullamcorper est nulla. Sed pharetra gravida magna, eget efficitur quam iaculis non. Cras ornare imperdiet tellus, id accumsan ipsum venenatis sit amet. Nulla facilisi. Sed molestie consequat metus, ac eleifend nibh gravida at. Duis sed tincidunt nisi. Mauris vestibulum, ligula tristique interdum tincidunt, enim diam placerat mauris, sed finibus metus felis in tellus. Proin vitae mi commodo, maximus tortor ut, bibendum ante. Nam ac nunc orci. Quisque sit amet eros a neque luctus pretium ut at magna.\n'

export function markdownWidgets(): WidgetTemplate<MarkdownData>[] {
  return [
    {
      id: 'markdown-01',
      name: 'Markdown: Empty',
      widget: {
        id: '',
        widgetType: 'markdown',
        data: {
          markdown: '',
          layout: defaultLayout()
        },
        indexData: ''
      }
    },

    {
      id: 'markdown-02',
      name: 'Markdown: lorem ipsum',
      widget: {
        id: '',
        widgetType: 'markdown',
        data: {
          markdown: markdownLoremIpsum,
          layout: defaultLayout()
        },

        indexData: markdownToIndex(markdownLoremIpsum)
      }
    }
  ]
}

