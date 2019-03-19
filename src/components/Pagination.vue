<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click="changePage(prevPage)"
          v-if="hasPrev()"
          style="margin: 0 10px;"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item" v-if="hasFirst()">
        <a class="page-link" href="#" @click="changePage(1)">1</a>
      </li>
      <li v-if="hasFirst()" style="margin: 0 10px;">...</li>

      <li class="page-item" v-for="page in pages" :key="page" :class="{ active: current === page }">
        <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
      </li>

      <li v-if="hasLast()" style="margin: 0 10px;">...</li>
      <li class="page-item" v-if="hasLast()">
        <a class="page-link" href="#" @click="changePage(totalPages)">{{ totalPages }}</a>
      </li>

      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click="changePage(nextPage)"
          v-if="hasNext()"
          style="margin: 0 10px;"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    pageRange: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    nextPage() {
      return this.current + 1;
    },
    prevPage() {
      return this.current - 1;
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },
    rangeStart() {
      const start = this.current - this.pageRange;
      return start > 0 ? start : 1;
    },
    rangeEnd() {
      const end = this.current + this.pageRange;
      return end < this.totalPages ? end : this.totalPages;
    },
    pages() {
      const pages = [];
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    changePage(page) {
      this.$emit('page-changed', page);
    },
    hasPrev() {
      return this.current > 1;
    },
    hasNext() {
      return this.current < this.totalPages;
    },
    hasFirst() {
      return this.rangeStart !== 1;
    },
    hasLast() {
      return this.rangeEnd < this.totalPages;
    },
  },
};
</script>
