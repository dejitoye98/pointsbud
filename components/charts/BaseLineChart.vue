

<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props:['chartData','options'],
  watch: {
    chartData() {
      this.update()
    }
  },
  methods: {
    update() {
      this.$data._chart.update()
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
};
</script>
