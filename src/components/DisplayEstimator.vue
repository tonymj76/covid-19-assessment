<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="80%"
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.stop="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click.stop="dialog = false">close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row>
          <v-col sm="12" md="6">
            <v-list three-line subheader>
              <v-subheader
              class="text-uppercase font-weight-bold text-center">Impact</v-subheader>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    currently infected</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.impact.currentlyInfected}}
                    </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>infections By Requested Time</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.impact.infectionsByRequestedTime}}
                    </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Hospital Beds By Requested Time</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.impact.hospitalBedsByRequestedTime}}
                    </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Cases For ICU By Requested Time</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.impact.casesForICUByRequestedTime}}
                    </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Cases For Ventilators By Requested Time</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.impact.casesForVentilatorsByRequestedTime}}
                    </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Dollars In Flight</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.impact.dollarsInFlight}}
                    </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col sm="12" md="6">
            <v-list three-line subheader>
              <v-subheader
              class="text-uppercase font-weight-bold text-center">Severe Impact</v-subheader>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    currently infected</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.severeImpact.currentlyInfected}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>infections By Requested Time</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.severeImpact.infectionsByRequestedTime}}
                    </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Hospital Beds By Requested Time</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.severeImpact.hospitalBedsByRequestedTime}}
                    </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Cases For ICU By Requested Time</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.severeImpact.casesForICUByRequestedTime}}
                    </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Cases For Ventilators By Requested Time</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.severeImpact.casesForVentilatorsByRequestedTime}}
                    </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Dollars In Flight</v-list-item-title>
                  <v-list-item-subtitle>
                    {{estimateData.severeImpact.dollarsInFlight}}
                    </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DisplayEstimator',
  props: {
    estimateData: {
      type: Object
    }
  },
  data() {
    return {
      dialog: this.show,
      title: 'Build For SDG'
    };
  }
};
</script>
