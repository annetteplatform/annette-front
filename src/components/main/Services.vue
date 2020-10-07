<template>
  <div>
    <h6 class="q-pl-md">Available services</h6>

    <div class="row ">
      <q-list class="full-width">

        <template v-for="(group,  index) in groups">
          <q-expansion-item header-class="service"
                            :label="group.title"
                            :caption="group.subtitle"
                            :key="group.id"
                            :value="groupOpen[group.id]"
                            @input="flag => setOpenFlag({groupId: group.id, flag}) "
          >
            <q-separator/>

            <div class=" row ">
              <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm" v-for="service in group.services" :key="service.id">
                <q-card>
                  <div class="service-card">
                    <q-item>
                      <q-item-section top avatar>
                        <q-avatar size="xl">
                          <q-icon color="primary" size="lg" :name="service.icon"/>
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>{{ service.title }}</q-item-label>
                        <q-item-label caption lines="2">{{ service.subtitle ? service.subtitle : ' ' }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <q-separator/>

                  <q-card-actions align="right">
                    <q-btn flat color="primary"
                           :to="service.action">
                      {{ service.actionName ? service.actionName : 'Получить услугу ' }}
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </div>
          </q-expansion-item>

          <q-separator v-if="index+1 != groups.length" :key="group.id + '-separator'"/>
        </template>
      </q-list>
    </div>

  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Mutation } from 'app/node_modules/vuex-class'

const appNamespace = 'app'

@Component({
  components: {}
})
export default class Services extends Vue {
  @Getter('serviceGroups', { namespace: appNamespace }) groups;
  @Getter('groupOpen', { namespace: appNamespace }) groupOpen;
  @Mutation('SetOpenFlag', { namespace: appNamespace }) setOpenFlag;
}
</script>

<style>
.service-card {
  height: 70px;
}

.service {
  font-weight: bolder;
}
</style>
