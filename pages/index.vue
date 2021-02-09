<template>
  <main>
    <section class="hero">
      <div class="container">
        <div class="text">
          <h1>A random bot made by some coffee addict.</h1>
          <a
            class="cta"
            href="https://discord.com/api/oauth2/authorize?client_id=784403906363916288&permissions=8&scope=bot"
            target="_blank"
            rel="noopener noreferrer"
            >Add to Discord</a
          >
        </div>
        <div class="image">
          <img src="@/assets/images/PQ2 Aigis.png" alt="Aigis from PQ2" />
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h1>Features</h1>
        <div class="feature-list">
          <div
            @mouseenter="play('bookAnim')"
            @mouseleave="playReverse('bookAnim')"
          >
            <lottie
              :options="bookAnimation"
              :height="150"
              :width="150"
              @animCreated="handleAnimation($event, 'bookAnim')"
            />
            <h2>Command Rich</h2>
            <p>Has a growing list of fun commands coming your way.</p>
          </div>
          <div
            @mouseenter="play('walletAnim')"
            @mouseleave="playReverse('walletAnim')"
          >
            <lottie
              :options="walletAnimation"
              :height="150"
              :width="150"
              @animCreated="handleAnimation($event, 'walletAnim')"
            />
            <h2>Free</h2>
            <p>Completely free to use.</p>
          </div>
          <div
            @mouseenter="play('simpleAnim')"
            @mouseleave="playReverse('simpleAnim')"
          >
            <lottie
              :options="simpleAnimation"
              :height="150"
              :width="150"
              @animCreated="handleAnimation($event, 'simpleAnim')"
            />
            <h2>Simple to Use</h2>
            <p>
              No extra steps required. Just click 'Add to Discord' and get
              started right away.
            </p>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="container">
        <div class="title">
          <p>Aigis</p>
          <p>
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
          </p>
        </div>
        <div>
          <p class="heading">Product</p>
          <p><a href="#">Documentation</a></p>
          <a
            href="https://discord.com/api/oauth2/authorize?client_id=784403906363916288&permissions=8&scope=bot"
            target="_blank"
            rel="noopener noreferrer"
            >Add to Discord</a
          >
        </div>
        <div>
          <p class="heading">Support</p>
          <p><a href="#">Contact Us</a></p>
          <p><a href="">FAQ</a></p>
        </div>
        <a
          class="cta"
          href="https://discord.com/api/oauth2/authorize?client_id=784403906363916288&permissions=8&scope=bot"
          target="_blank"
          rel="noopener noreferrer"
          >Add to Discord</a
        >
      </div>

      <div class="bottom">
        <p>
          Coded by
          <a
            href="https://www.raaedkabir.com/"
            target="_blank"
            rel="noopener noreferrer"
            >Raaed M. Kabir.</a
          >
        </p>
        <p>© Aigis Discord Bot 2021.</p>
      </div>
    </footer>
  </main>
</template>

<script>
import Lottie from '@/components/UI/lottie.vue';
import bookAnimation from '../assets/features/book.json';
import walletAnimation from '../assets/features/wallet.json';
import simpleAnimation from '../assets/features/simple.json';

export default {
  components: {
    Lottie,
  },
  data() {
    return {
      bookAnimation: {
        animationData: bookAnimation,
        loop: false,
        autoPlay: false,
      },

      walletAnimation: {
        animationData: walletAnimation,
        loop: false,
        autoPlay: false,
      },

      simpleAnimation: {
        animationData: simpleAnimation,
        loop: false,
        autoPlay: false,
      },
    };
  },

  methods: {
    handleAnimation(anim, type) {
      this[type] = anim;
    },

    play(type) {
      this[type].setSpeed(1);
      this[type].play();
    },

    playReverse(type) {
      this[type].setSpeed(-1);
      this[type].play();
    },
  },
};
</script>

<style lang="scss" scoped>
.hero .container {
  height: 80vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
    flex: 1;
  }

  .image {
    flex: 2;

    img {
      margin-left: auto;
    }
  }
}

.features {
  padding: 20rem 0;
  background: var(--clr-grey-darker);
  clip-path: polygon(0 15%, 100% 0%, 100% 85%, 0% 100%);

  .feature-list {
    margin-top: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    h2 {
      font-size: 3rem;
    }
  }
}

footer {
  padding: 5rem 0 0;

  .container {
    display: flex;
    justify-content: space-between;

    a {
      border: none;
    }

    .title {
      & > p:first-child {
        margin-bottom: 0.5em;
        font-weight: 600;
      }

      svg {
        height: 25px;

        path {
          fill: var(--clr-text);
        }

        &:hover path {
          fill: var(--clr-primary);
        }
      }
    }

    .heading {
      margin-bottom: 0.5em;
      color: var(--clr-grey-lighter);
      font-weight: 600;
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    padding: 6rem 2rem 2rem;
    font-size: 1.4rem;
  }
}
</style>
