import {OrgItem, OrgPosition, OrgUnit} from 'src/modules/org-structure';

export interface OrgNode {
  id: string,
  orgId: string,
  parentId: string,
  itemType: string,
  name: string,
  lazy: boolean,
  icon: string,
  expandable: boolean,
  selectable: boolean,
  children?: OrgNode[]
  childrenId: string[]
}

export function orgItemToOrgNode(orgItem: OrgItem): OrgNode {
  if (orgItem.itemType === 'unit') {
    const orgUnit = orgItem as OrgUnit
    return {
      id: orgUnit.id,
      // @ts-ignore
      orgId: orgUnit.orgId,
      parentId: orgUnit.parentId,
      itemType: orgUnit.itemType,
      name: orgUnit.name,
      icon: orgUnit.parentId === 'ROOT' ? 'account_balance' : 'account_tree',
      lazy: orgUnit.children.length > 0,
      selectable: true,
      expandable: orgUnit.children.length > 0,
      childrenId: [...orgUnit.children]
    }
  } else {
    const orgPosition = orgItem as OrgPosition
    return {
      id: orgPosition.id,
      // @ts-ignore
      orgId: orgPosition.orgId,
      parentId: orgPosition.parentId,
      itemType: orgPosition.itemType,
      name: orgPosition.name,
      icon: 'person',
      lazy: false,
      selectable: true,
      expandable: false,
      childrenId: []
    }
  }
}
