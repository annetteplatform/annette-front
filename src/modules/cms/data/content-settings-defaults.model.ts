import {ContentLayout, ContentSettings} from './content-settings.model';

export function postIntroSettings(): ContentSettings {
  return {}

}


export function emptyContentLayout(): ContentLayout {
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
  }
}
