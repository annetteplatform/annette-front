import {PersonProfile, ServiceGroup, serviceGroups} from 'layouts/store/model';
import axios from 'axios';

export const mainService = {
  async profile () {
    return await axios.get<PersonProfile>('/api/annette/v1/person/profile')
      .then(result => convertPersonProfile(result.data))
  },

  async serviceGroups() {
    const promise = new Promise<ServiceGroup[]>( (resolve) => {
      resolve(serviceGroups())
    })
    return await promise
  }


}

function convertPersonProfile(person: PersonProfile): PersonProfile {
  return  {
    ...person,
    fullname: `${person.lastname}, ${person.firstname} ${person.middlename || ''}`
  }
}
