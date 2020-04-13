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
    background-image: url('./assets/sty.jpg');
    z-index: -999;
    height: 100vh;
    width: 100%;
    object-fit: contain;
    // opacity: 0.3;
   filter: alpha(opacity=30); /* For Internet Explorer 8 and earlier */
  }
</style>
