<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />

    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />

    <hr class="my-4" />
    <AppGrid :items="posts">
      <template v-slot="{ item }">
        <PostItem
          :title="item.title"
          :content="item.content"
          :created-at="item.createdAt"
          @click="goPage(item.id)"
        ></PostItem>
      </template>
    </AppGrid>

    <AppPagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="(page) => (params._page = page)"
    />

    <template v-if="posts && posts.length > 0">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="posts[0].id"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostItem from "@/components/posts/PostItem.vue";
import { getPosts } from "@/api/posts";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import AppPagination from "@/components/AppPagination.vue";
import AppGrid from "@/components/AppGrid.vue";
import PostFilter from "@/components/posts/PostFilter.vue";

const router = useRouter();
const posts = ref([]);

const params = ref({
  // 정렬을 위한 객체로 axios에 파라미터로 전달한다.
  _sort: "createdAt", // 어떤 컬럼 기준으로
  _order: "desc", // 내림차순 , 오름차순
  _limit: 3, // 총 몇개 불러올건지 request header에 "x-total-count" 를 만들어준다.
  _page: 1, // 현재 페이지
  title_like: "",
});

//pagination
const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit)
);
const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers["x-total-count"]; // 불러온 전체 데이터의 크기
  } catch (error) {
    console.error(error);
  }
};

watchEffect(fetchPosts); // 데이터가 변경이 되었을 경우 콜백함수를 재실행해 변경된 컴포넌트만 재랜더링한다.

const goPage = (id) => {
  // router.push(`/posts/${id}`);
  router.push({
    name: "PostDetail",
    params: {
      id,
    },
  });
};
</script>

<style lang="scss" scoped></style>