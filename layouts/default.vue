<template>
  <div>
    <TheNavbar />
    <Nuxt />
  </div>
</template>

<script>
import TheNavbar from '@/components/Layout/TheNavbar.vue';

export default {
  components: {
    TheNavbar,
  },
};
</script>

<style lang="scss">
a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition: all 0.2s ease;

  &:hover {
    color: var(--clr-primary);
  }

  &.cta {
    margin-top: 1em;
    border: none;
    display: inline-block;
    padding: 0.5em 1.5em;
    font-size: 1.5em;
    font-weight: 700;
    background: var(--clr-primary);
    border-radius: 100vw;

    &:hover {
      color: var(--clr-primary);
      background: var(--clr-text);
    }
  }
}
</style>
