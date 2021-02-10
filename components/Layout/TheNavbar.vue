<template>
  <nav>
    <div class="container">
      <img src="@/assets/images/avatar.jpg" alt="logo" />
      <span>Aigis Discord Bot</span>
      <ul>
        <li>
          <label id="theme-switch" class="theme-switch" for="checkbox_theme">
            <input id="checkbox_theme" type="checkbox" />
          </label>
        </li>
        <li>
          <a
            href="https://discord.com/api/oauth2/authorize?client_id=784403906363916288&permissions=8&scope=bot"
            target="_blank"
            rel="noopener noreferrer"
            >Add to Discord</a
          >
        </li>
        <li><a href="#">Commands</a></li>
        <li>
          <a
            href="https://github.com/ToddLowell/Discord-Bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    // identify the toggle switch HTML element
    const toggleSwitch = document.querySelector(
      '#theme-switch input[type="checkbox"]'
    );

    // function that changes the theme, and sets a localStorage variable to track the theme between page loads
    function switchTheme(e) {
      if (e.target.checked) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true;
      } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
        toggleSwitch.checked = false;
      }
    }

    // listener for changing themes
    toggleSwitch.addEventListener('change', switchTheme, false);

    // pre-check the dark-theme checkbox if dark-theme is set
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      toggleSwitch.checked = true;
    }
  },
};
</script>

<style lang="scss" scoped>
nav {
  background: var(--nav);
  color: var(--text-dark);
  fill: var(--text-dark);

  a {
    border: none;
    display: flex;
  }

  > div,
  ul {
    display: flex;
    align-items: center;
  }

  ul {
    list-style: none;
  }

  li {
    display: flex;
    margin-left: 2rem;
  }

  img {
    height: 50px;
  }

  span {
    margin-right: auto;
  }

  svg {
    height: 25px;
    transition: all 0.2s ease;
  }
}
</style>
