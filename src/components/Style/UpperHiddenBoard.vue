<template>
  <div class="flex-center" v-touch-pan.prevent.mouse="handlePan"
       ref="board"
       style="display: none; position: fixed; margin: auto; left: 0; right: 0; background-color: black; width: 500px; height: 100px">
    <div class="text-center">
      <q-btn flat
             round
             text-color="primary"
             :icon="!visible ? 'visibility' : 'visibility_off'"
             @click="visible = !visible"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UpperHiddenBoard",
    props: {
      src: {
        type: String,
        default: ''
      }
    },
    data: function () {
      return {
        boardWidth: document.body.clientWidth * 0.8,
        boardHeight: document.body.clientHeight * 0.05,
        direction: '',
        startPos: [0, 0],
        visible: true,
        backgroundImage: ''
      };
    },
    watch: {
      visible(v) {
        let board = this.$refs.board;
        if (!v) {
          board.style.width = '42px';
          board.style.height = '42px';
          board.style.background = 'rgba(0, 0, 0, 0)';
          this.backgroundImage = '';
          board.style['margin-top'] = '-16px'
        } else {
          board.style.width = `${this.boardWidth}px`;
          board.style.height = `${this.boardHeight}px`;
          board.style.background = 'black';
          this.backgroundImage = this.src
          board.style.backgroundSize = 'cover';
          board.style['margin-top'] = '0px'
        }
      },
      src(v) {
        this.backgroundImage = v;
      },
      backgroundImage(v) {
        let board = this.$refs.board;
        board.style.backgroundImage = v;
      }
    },
    methods: {
      handlePan({evt, ...info}) {
        if (this.visible) {
          let board = this.$refs.board;
          if (info.isFirst) {
            this.boardWidth = Number(board.style.width.replace(/\s+|px/gi, ""));
            this.boardHeight = Number(board.style.height.replace(/\s+|px/gi, ""));
            this.direction = info.direction
          }

          if (this.direction === 'up' || this.direction === 'down') board.style.height = `${this.boardHeight + info.offset.y}px`;
          if (this.direction === 'left' || this.direction === 'right') board.style.width = `${this.boardWidth + info.offset.x}px`;

          if (this.boardHeight + info.offset.y <= document.documentElement.clientHeight * 0.1)
            board.style.height = `${document.documentElement.clientHeight * 0.1}px`;
          if (this.boardWidth + info.offset.x <= document.documentElement.clientWidth * 0.1)
            board.style.width = `${document.documentElement.clientWidth * 0.1}px`;

          if (this.boardHeight + info.offset.y > document.documentElement.clientHeight)
            board.style.height = `${document.documentElement.clientHeight}px`;
          if (this.boardWidth + info.offset.x > document.documentElement.clientWidth)
            board.style.width = `${document.documentElement.clientWidth}px`;

          if (this.boardHeight + info.offset.y < 50)
            board.style.height = '50px';
          if (this.boardWidth + info.offset.x < 50)
            board.style.width = '50px';

          if (info.isFinal) {
            this.boardWidth = Number(board.style.width.replace(/\s+|px/gi, ""));
            this.boardHeight = Number(board.style.height.replace(/\s+|px/gi, ""));
            this.$q.localStorage.set('upperHiddenBoard', [this.boardWidth, this.boardHeight]);
          }
        } else return;
      }
    },
    mounted() {
      let board = this.$refs.board;
      let boardRect = this.$q.localStorage.getItem('upperHiddenBoard');
      if (!boardRect) boardRect = [500, 100];
      this.boardWidth = boardRect[0];
      this.boardHeight = boardRect[1];
      board.style.width = `${this.boardWidth}px`;
      board.style.height = `${this.boardHeight}px`;
      this.backgroundImage = `${this.src}`;
      board.style.backgroundImage = this.backgroundImage;
      console.log(board.style.backgroundImage);
      board.style.backgroundSize = 'cover';
    }
  }
</script>

<style scoped>

</style>
