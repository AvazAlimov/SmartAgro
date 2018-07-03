<script>
import { Line } from "vue-chartjs";
import DataService from "../../services/DataService";

export default {
  extends: Line,
  props: ["rkey"],
  data() {
    return {
      datacollection: null,
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Angle (°)"
              },
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    loadData() {
      var vm = this;
      if (vm.rkey === "") return;
      DataService.loadWindDirection(vm.rkey, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(response => {
          if (response.status === 200) {
            var datacollection = {
              labels: [],
              datasets: [
                {
                  label: "Wind Direction",
                  fill: false,
                  borderColor: "#778899",
                  pointBackgroundColor: "white",
                  borderWidth: 3,
                  pointBorderColor: "#249EBF",
                  data: []
                }
              ]
            };
            var options = {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            };
            for (var i = 0; i < response.data.length; i++) {
              datacollection.datasets[0].data.push(
                response.data[i].wind_direction
              );
              datacollection.labels.push(
                new Date(response.data[i].created_at).toLocaleTimeString(
                  "ru",
                  options
                )
              );
            }
            vm.datacollection = datacollection;
            vm.renderChart(vm.datacollection, vm.options);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>
</style>
