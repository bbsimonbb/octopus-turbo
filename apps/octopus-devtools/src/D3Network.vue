<script>
// https://medium.com/@lambrospd/5-simple-rules-to-data-visualization-with-vue-js-and-d3-js-f6b2bd6a1d40
import * as d3 from 'd3';
export default {
  name: 'LineChart',
  props: {
    data: {
      required: true,
      type: Array,
    },
    width: {
      default: 500,
      type: Number,
    },
    height: {
      default: 270,
      type: Number,
    }
  },
  data() {
    return {
      padding: 60,
    };
  },
  computed: {
    rangeX() {
      const width = this.width - this.padding;
      return [0, width];
    },
    rangeY() {
      const height = this.height - this.padding;
      return [0, height];
    },
    path() {
      const x = d3.scaleLinear().range(this.rangeX);
      const y = d3.scaleLinear().range(this.rangeY);
      d3.axisLeft().scale(x);
      d3.axisTop().scale(y);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, d => d)]);
      return d3.line()
        .x((d, i) => x(i))
        .y(d => y(d));
    },
    line() {
      return this.path(this.data);
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`;
    }
  },
};
</script>

<template>
  <svg
    class="line-chart"
    :viewBox="viewBox"
  >
    <g transform="translate(0, 10)">
      <path
        class="line-chart__line"
        :d="line"
      />
    </g>
  </svg>
</template>

<style lang="sass">
.line-chart
  margin: 25px
  &__line
    fill: none
    stroke: #76BF8A
    stroke-width: 3px
</style>