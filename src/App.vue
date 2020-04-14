<template>
  <v-app>
    <v-content>
      <main id="main">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-row
                align="center"
                justify="end"
              >
                <v-card
                  color="rgba(187, 236, 233, .5)"
                  tile
                  outlined
                  width="60%"
                  mb-2
                >
                  <v-card-title class='display-2 text-uppercase blue--text'>
                    <span class="font-weight-light">
                      Skill-
                      </span>
                      <span>Assessment Test</span>
                  </v-card-title>
                  <v-container>
                    <ValidationObserver ref="observer" v-slot="{ invalid, handleSubmit  }">
                      <form>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="data-population"
                          rules="required|integer"
                        >
                          <v-text-field
                            v-model="population"
                            prepend-icon="mdi-account-group"
                            :error-messages="errors"
                            data-population
                            label="Population"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="data-reported-cases"
                          rules="required|integer"
                        >
                          <v-text-field
                            v-model="reportedCases"
                            :error-messages="errors"
                            prepend-icon="mdi-account-voice"
                            data-reported-cases
                            label="Reported Cases"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="data-total-hospital-beds"
                          rules="required|integer"
                        >
                          <v-text-field
                            v-model="totalHospitalBeds"
                            :error-messages="errors"
                            prepend-icon="mdi-bed "
                            data-total-hospital-beds
                            label="Total Hospital Beds"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="data-time-to-elapse"
                          rules="required|integer"
                        >
                          <v-text-field
                            v-model="timeToElapse"
                            :error-messages="errors"
                            data-time-to-elapse
                            prepend-icon="mdi-alarm-check"
                            label="Time To Elapse"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="data-period-type"
                          rules="required"
                        >
                          <v-select
                            v-model="periodType"
                            prepend-icon="mdi-timeline"
                            :items="periods"
                            :error-messages="errors"
                            data-period-type
                            label="Period Type"
                            data-vv-name="data-period-type"
                            required
                          ></v-select>
                        </ValidationProvider>

                        <v-btn
                          class="mr-4 primary"
                          :disabled="invalid"
                          @click="handleSubmit(submit)"
                        >submit</v-btn>
                        <v-btn @click="clear" mb-2>clear</v-btn>
                        <DisplayEstimator :estimateData="estimateData" ref='dialogV'/>
                      </form>
                    </ValidationObserver>
                  </v-container>
                </v-card>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </main>
    </v-content>
  </v-app>
</template>

<script>
import { required, integer } from 'vee-validate/dist/rules';
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode
} from 'vee-validate';
import DisplayEstimator from './components/DisplayEstimator.vue';
import estimator from './estimator';


setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
});

extend('integer', {
  ...integer,
  message: '{_field_} must be an integer'
});

const data = {
  population: '',
  timeToElapse: '',
  reportedCases: '',
  totalHospitalBeds: '',
  periodType: null,
  periods: [
    'Days',
    'Weeks',
    'Months'
  ]
};
const region = {
  name: 'Africa',
  avgAge: 19.7,
  avgDailyIncomeInUSD: 5,
  avgDailyIncomePopulation: 0.71
};


export default {
  name: 'App',

  components: {
    ValidationProvider,
    ValidationObserver,
    DisplayEstimator
  },

  data() {
    return {
      ...data,
      estimateData: {}
    };
  },

  methods: {
    submit() {
      this.estimateData = estimator({ region: { ...region }, ...this.$data });
      this.$refs.dialogV.dialog = true;
    },
    clear() {
      this.population = '';
      this.timeToElapse = '';
      this.reportedCases = '';
      this.totalHospitalBeds = '';
      this.periodType = null;
      this.$refs.observer.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
  #main {
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='88' y1='88' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23064e77'/%3E%3Cstop offset='1' stop-color='%230a7dbe'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='75' y1='76' x2='168' y2='160'%3E%3Cstop offset='0' stop-color='%238f8f8f'/%3E%3Cstop offset='0.09' stop-color='%23b3b3b3'/%3E%3Cstop offset='0.18' stop-color='%23c9c9c9'/%3E%3Cstop offset='0.31' stop-color='%23dbdbdb'/%3E%3Cstop offset='0.44' stop-color='%23e8e8e8'/%3E%3Cstop offset='0.59' stop-color='%23f2f2f2'/%3E%3Cstop offset='0.75' stop-color='%23fafafa'/%3E%3Cstop offset='1' stop-color='%23FFFFFF'/%3E%3C/linearGradient%3E%3Cfilter id='c' x='0' y='0' width='200%25' height='200%25'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='12' /%3E%3C/filter%3E%3C/defs%3E%3Cpolygon fill='url(%23a)' points='0 174 0 0 174 0'/%3E%3Cpath fill='%23000' fill-opacity='.5' filter='url(%23c)' d='M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z'/%3E%3Cpath fill='url(%23b)' d='M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z'/%3E%3C/svg%3E");
    background-attachment: fixed;
    height: 100vh;
    background-repeat: no-repeat;
    background-position: top left;
  }
</style>
