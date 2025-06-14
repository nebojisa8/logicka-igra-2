<template>
  <div class="app">
    <h1>🧠 Логичка игра</h1>

    <div>
      <p><strong>Тежина:</strong> {{ puzzle.difficulty }}</p>
      <p><strong>Статистика трагова</strong></p>
      <ul>
        <li v-for="stat in puzzle.stats" :key="stat.type">
          {{ stat.type }}: {{ stat.count }}
        </li>
      </ul>
    </div>

    <ClueList :clues="puzzle.clues" />
    <GameBoardView />

    <button @click="checkSolution">Провери решење</button>
    <button @click="giveHint">Hint</button>
  </div>
</template>

<script>
import { generateCluesFromSolution } from './logic/clueGenerator';
import GameBoardView from './components/GameBoard.vue';
import ClueList from './components/ClueList.vue';

export default {
  components: { GameBoardView, ClueList },
  data() {
    return {
      puzzle: null
    };
  },
  created() {
    this.puzzle = generateCluesFromSolution('medium');
  },
  methods: {
    checkSolution() {
      alert('Провера решења – логика у изради');
    },
    giveHint() {
      alert('Hint – ускоро!');
    }
  }
};
</script>
