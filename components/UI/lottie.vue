<template>
  <div ref="container" :style="style"></div>
</template>

<script>
import lottie from 'lottie-web';

// <!-- loader -->
// <div v-if="isLoading" class="d-flex justify-center" style="stroke: var(--v-primary-base)">
//   <lottie :options="lottieOptions" :height="200" :width="200" class="loader" />
// </div>
// import Lottie from '@/components/UI/lottie.vue';
// import animationData from '../assets/lordicon/341-loader-12.json';
//  lottieOptions: { animationData: animationData },

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      style: {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '100%',
        overflow: 'hidden',
        margin: '0 auto',
      },
    };
  },

  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.container,
      renderer: 'svg',
      loop: this.options.loop !== false,
      autoplay: this.options.autoPlay !== false,
      animationData: this.options.animationData,
      rendererSettings: this.options.rendererSettings,
    });

    this.$emit('animCreated', this.anim);
  },
};
</script>
