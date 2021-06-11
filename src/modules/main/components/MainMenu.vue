<template>
  <q-list padding>
    <template v-for="group in groups">
      <q-expansion-item
        expand-separator
        switch-toggle-sideu
        :icon="group.icon"
        :label="group.title"
        :value="true"
        :key="group.id"
        :content-inset-level="0.4"
      >
        <q-list>
          <q-item v-for="service in group.services" :key="service.id" :to="service.action">
            <q-item-section avatar>
              <q-icon color="primary" :name="service.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ service.title }}</q-item-label>
              <q-item-label caption lines="2">{{ service.subtitle ? service.subtitle : ' ' }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </template>
    <!--    <template v-for="(group, index) in groups">-->
    <!--        <q-item-label header :key="group.id">{{ group.title }}</q-item-label>-->
    <!--        <q-item v-for="service in group.services" :key="service.id" :to="service.action">-->
    <!--            <q-item-section avatar>-->
    <!--                <q-icon color="primary" :name="service.icon"/>-->
    <!--            </q-item-section>-->
    <!--            <q-item-section>-->
    <!--                <q-item-label>{{ service.title }}</q-item-label>-->
    <!--                <q-item-label caption lines="2">{{ service.subtitle ? service.subtitle : ' ' }}</q-item-label>-->
    <!--            </q-item-section>-->
    <!--        </q-item>-->
    <!--        <q-separator spaced :key="group.id+'separator'" v-if="index<groups.length-1" />-->
    <!--    </template>-->
  </q-list>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Getter} from 'vuex-class'

const appNamespace = 'app'

@Component({
  components: {}
})
export default class MainMenu extends Vue {
  @Getter('serviceGroups', {namespace: appNamespace}) groups;
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
