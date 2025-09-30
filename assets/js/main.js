/**********************************************************************************************************
 * 解答入力欄のコンポーネントです。入力欄・送信ボタン・エラーメッセージを表示します。
 *********************************************************************************************************/
const app = Vue.createApp({
  data() {
    return {
      correctAnswer: {
        stage1: { q1: 'あああ' },
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
  created() {
    // ページを開いたときに localStorage から復元
    const saved = localStorage.getItem("gameState");
    if (saved) {
      const state = JSON.parse(saved);
      this.answer = state.answer;
      this.clear = state.clear;
      this.next = state.next;
    }
  },
  watch: {
    // データが変わるたびに保存
    answer: {
      handler() { this.saveState(); },
      deep: true
    },
    clear: {
      handler() { this.saveState(); },
      deep: true
    },
    next: {
      handler() { this.saveState(); },
      deep: true
    }
  },
  methods: {
    saveState() {
      const state = {
        answer: this.answer,
        clear: this.clear,
        next: this.next,
      };
      localStorage.setItem("gameState", JSON.stringify(state));
    },
    answerInput(event, stage, number, final) {
      this.answer[stage][number-1] = event;

      const result = this.answer[stage].every((element) => element);
      this.clear[stage] = result;

      if (this.clear[stage] === true && final === 'final') {
        // 最終ステージは final.html に飛ぶ
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
  data: function () {
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

app.mount('#stage')


