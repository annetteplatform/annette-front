import {Widget} from 'src/modules/cms';

export interface WidgetTemplate<T> {
  id: string,
  name: string,
  type?: string,
  widget: Widget<T>
}
