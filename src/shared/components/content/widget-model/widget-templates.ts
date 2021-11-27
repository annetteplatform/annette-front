import {Widget} from 'src/modules/cms';
import {HtmlData, MarkdownData} from 'src/shared/components/content/widget-model/widget-model';
import {WidgetLayout} from 'src/shared/components/content/widget-model/widget-layout';

export interface WidgetTemplate<T> {
  id: string,
  name: string,
  type?: string,
  widget: Widget<T>
}

function defaultLayout(): WidgetLayout {
  return {
    padding: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    },
    margin: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    },
    backgroundColor: '#ffffff',
  }
}

const htmlLoremIpsum = '<h2>Lorem ipsum!</h2>\n' +
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ullamcorper sodales libero sit amet auctor. Suspendisse tempus ipsum in turpis faucibus, sed aliquet est dapibus. Quisque tempus, nulla vitae dignissim porttitor, erat nunc placerat mauris, nec facilisis magna turpis eget nisl. Vivamus nec enim eget quam varius elementum. Morbi eu semper lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacus ante, molestie ac ante nec, eleifend sodales risus. Nunc eget libero congue, blandit nibh in, suscipit lorem.</p>' +
  '<p>Mauris eu leo urna. Cras sit amet dolor dolor. In tempus eros eget lacus suscipit, a dignissim nunc bibendum. Morbi eu faucibus dui, sit amet vehicula leo. Sed augue tellus, tincidunt quis augue et, pellentesque scelerisque arcu. Sed ullamcorper est nulla. Sed pharetra gravida magna, eget efficitur quam iaculis non. Cras ornare imperdiet tellus, id accumsan ipsum venenatis sit amet. Nulla facilisi. Sed molestie consequat metus, ac eleifend nibh gravida at. Duis sed tincidunt nisi. Mauris vestibulum, ligula tristique interdum tincidunt, enim diam placerat mauris, sed finibus metus felis in tellus. Proin vitae mi commodo, maximus tortor ut, bibendum ante. Nam ac nunc orci. Quisque sit amet eros a neque luctus pretium ut at magna.</p>'
const markdownLoremIpsum = '# Lorem ipsum!\n\n' +
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ullamcorper sodales libero sit amet auctor. Suspendisse tempus ipsum in turpis faucibus, sed aliquet est dapibus. Quisque tempus, nulla vitae dignissim porttitor, erat nunc placerat mauris, nec facilisis magna turpis eget nisl. Vivamus nec enim eget quam varius elementum. Morbi eu semper lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacus ante, molestie ac ante nec, eleifend sodales risus. Nunc eget libero congue, blandit nibh in, suscipit lorem.\n\n' +
  'Mauris eu leo urna. Cras sit amet dolor dolor. In tempus eros eget lacus suscipit, a dignissim nunc bibendum. Morbi eu faucibus dui, sit amet vehicula leo. Sed augue tellus, tincidunt quis augue et, pellentesque scelerisque arcu. Sed ullamcorper est nulla. Sed pharetra gravida magna, eget efficitur quam iaculis non. Cras ornare imperdiet tellus, id accumsan ipsum venenatis sit amet. Nulla facilisi. Sed molestie consequat metus, ac eleifend nibh gravida at. Duis sed tincidunt nisi. Mauris vestibulum, ligula tristique interdum tincidunt, enim diam placerat mauris, sed finibus metus felis in tellus. Proin vitae mi commodo, maximus tortor ut, bibendum ante. Nam ac nunc orci. Quisque sit amet eros a neque luctus pretium ut at magna.\n'

function htmlWidgets(): WidgetTemplate<HtmlData>[] {
  return [
    {
      id: 'html-01',
      name: 'HTML: empty',
      widget: {
        id: '',
        widgetType: 'html',
        data: {
          html: '',
          layout: defaultLayout()
        },
        indexData: ''
      }
    },
    {
      id: 'html-02',
      name: 'HTML: lorem ipsum',
      widget: {
        id: '',
        widgetType: 'html',
        data: {
          html: htmlLoremIpsum,
          layout: defaultLayout()
        },
        indexData: ''
      }
    },
  ]
}

function markdownWidgets(): WidgetTemplate<MarkdownData>[] {
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

        indexData: ''
      }
    }
  ]
}


export function widgetTemplates(): WidgetTemplate<any>[] {
  return [
    ...markdownWidgets(),
    ...htmlWidgets(),
    {
      id: 'parallax-01',
      name: 'Parallax',
      widget: {
        id: '',
        widgetType: 'parallax',
        data: {
          src: 'https://cdn.quasar.dev/img/parallax1.jpg',
          height: '200',
          speed: '0.5'
        },
        indexData: ''
      }
    },
    {
      id: 'Video-01',
      name: 'Video',
      widget: {
        id: '',
        widgetType: 'video',
        data: {
          src: 'http://www.peach.themazzone.com/durian/movies/sintel-2048-surround.mp4',
          ratio: '1.777777',
          height: '400'
        },
        indexData: ''
      }
    },
    {
      id: 'YouTube-01',
      name: 'YouTube Video',
      widget: {
        id: '',
        widgetType: 'youtube',
        data: {
          src: 'http://youtube.com/embed/D9y2Ex3NN34',
          ratio: '1.777777',
          height: '400'
        },
        indexData: ''
      }
    }
  ]
}
