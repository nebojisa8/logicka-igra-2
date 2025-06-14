<template>
  <div class="clue-list">
    <h2>🔍 Трагови</h2>
    <ul>
      <li v-for="(clue, index) in clues" :key="index">
        {{ formatClue(clue) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['clues'],
  methods: {
    formatClue(clue) {
      switch (clue.type) {
        case 'position':
          return `${clue.entity} је у колони број ${clue.column + 1}`;
        case 'adjacent':
          return `${clue.entity1} је до ${clue.entity2}`;
        case 'notAdjacent':
          return `${clue.entity1} није до ${clue.entity2}`;
        case 'between':
          return `${clue.middle} је између ${clue.left} и ${clue.right}`;
        case 'notBetween':
          return `${clue.middle} није између ${clue.left} и ${clue.right}`;
        case 'leftOf':
          return `${clue.left} је лево од ${clue.right}`;
        case 'sameColumn':
          return `${clue.entity1} је у истој колони са ${clue.entity2}`;
        case 'notSameColumn':
          return `${clue.entity1} није у колони са ${clue.entity2}`;
        case 'tripleSameColumn':
          return `${clue.entity1}, ${clue.entity2} и ${clue.entity3} су у истој колони`;
        case 'eitherColumn':
          return `${clue.entity1} је у колони са ${clue.entity2} или ${clue.entity3}`;
        case 'columnButNotOther':
          return `${clue.main} је у колони са ${clue.with}, али није са ${clue.without}`;
        default:
          return '[Непознат траг]';
      }
    }
  }
};
</script>
