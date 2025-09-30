/**********************************************************************************************************
 * 解答入力欄のコンポーネントです。入力欄・送信ボタン・エラーメッセージを表示します。
 *********************************************************************************************************/
const app = Vue.createApp({
  data() {
    return {
      correctAnswer: {
        stage1: { q1: 'NSR' },
        stage2: { q1: '26' },
        stage3: { q1: 'SUNWEDMON' }
      },
      answer: {
        stage1: [false],
        stage2: [false],
        stage3: [false]
      },
      clear: {
        stage1: false,
        stage2: false,
        stage3: false,
      },
      next: {
        stage1: false,
        stage2: false,
      },
    }
  },
  mounted() {
    // ページ読み込み時に localStorage をリセットして初期状態にする
    localStorage.removeItem("gameState");

    // answer / clear / next を再初期化
    for (let stage in this.answer) {
      this.answer[stage] = this.answer[stage].map(() => false);
    }
    for (let stage in this.clear) {
      this.clear[stage] = false;
    }
    for (let stage in this.next) {
      this.next[stage] = false;
    }
  },
  methods: {
    answerInput(event, stage, number, final) {
      this.answer[stage][number-1] = event;
      const result = this.answer[stage].every((element) => element);
      this.clear[stage] = result;

      if (this.clear[stage] === true && final === 'final') {
        window.location.href = 'final.html';
      }
    },
    nextStage(stage) {
      this.clear[stage] = false;
      this.next[stage] = true;
    },
  }
})

/* 解答入力欄のコンポーネント */
app.component('answer-input', {
  props: ['correct'],
  data() {
    return {
      okMessage: '正解！',
      ngMessage: 'そのキーワードは違うようだぞ！？',
      message: '',
      inputAnswer: '',
    }
  },
  template: `
    <div class="answer__container">
      <div class="answer">
        <input type="text" v-model="inputAnswer" placeholder="ここに答えを入力しよう">
      </div>
      <p v-if="message === ngMessage" class="err-message">{{ message }}</p>
      <button v-on:click="judgement(inputAnswer)">送信</button>
      <p v-if="message === okMessage" class="err-message">{{ message }}</p>
    </div>`,
  methods: {
    judgement(answer) {
      if(answer === this.correct) {
        this.message = this.okMessage;
        this.$emit('answerInput', true);
      } else {
        this.message = this.ngMessage; 
        this.$emit('answerInput', false);
      }
    },
  }
})

app.mount('#stage');
