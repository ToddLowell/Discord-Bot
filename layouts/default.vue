<template>
  <div>
    <TheNavbar />
    <Nuxt />
  </div>
</template>

<script>
// determines if the user has a set theme
import TheNavbar from '@/components/Layout/TheNavbar.vue';

function detectColorScheme() {
  let theme = 'light'; // default to light

  // local storage is used to override OS theme settings
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'dark') {
      theme = 'dark';
    }
  } else if (!window.matchMedia) {
    // matchMedia method not supported
    return false;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // OS theme setting detected as dark
    theme = 'dark';
  }

  // dark theme preferred, set document with a `data-theme` attribute
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

if (process.browser) {
  detectColorScheme();
}

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

  &:hover,
  &:hover path {
    color: var(--text-hover);
    fill: var(--text-hover);
  }

  &.cta {
    margin-top: 1em;
    border: none;
    display: inline-block;
    padding: 0.5em 1.5em;
    font-size: 1.5em;
    font-weight: 700;
    color: var(--text-btn);
    background: var(--secondary);
    border-radius: 100vw;

    &:hover {
      color: var(--secondary);
      background: var(--text-btn);
    }
  }
}
</style>
