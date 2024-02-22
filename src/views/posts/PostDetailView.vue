<template>
	<div>
		<h2>{{ post.title }}</h2>
		<p>{{ post.content }}</p>
		<p class="text-muted">{{ post.createdAt }}</p>
		<hr class="my-4" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-danger" @click="remove">삭제</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getPostById, deletePost } from '@/api/posts';
import { ref } from 'vue';

// js에선 문자열로 날라 올지 숫자로 날라올지 모르기 때문에 반드시 타입을 정한 후
// 요청을 해야 정상적으로 리턴된다.
const props = defineProps({
	id: Number,
});

const router = useRouter();
// const id = route.params.id;
/**
 * ref
 * 장) 객체 할당 가능
 * 단) form.value.title, form.value.content 와 같이 from.value로 값을 가져와야한다.
 * 장) 일관성
 *
 * reactvie
 * 단) 객체 할당 불가능 하나하나 어트리뷰트를 쪼게서 객체에 할당해야한다는 이야기이다.
 * 장) form.title, form.content
 */
const post = ref({
	title: null,
	content: null,
	createdAt: null,
});

const fetchPost = async () => {
	try {
		const { data } = await getPostById(props.id);
		setPost(data);
	} catch (error) {
		console.error(error);
	}
};
const setPost = ({ title, content, createdAt }) => {
	post.value.title = title;
	post.value.content = content;
	post.value.createdAt = createdAt;
};
fetchPost();
const remove = async () => {
	try {
		if (confirm('삭제 하시겠습니까?') === false) {
			return;
		}
		await deletePost(props.id);
		router.push({ name: 'PostList' });
	} catch (error) {
		console.error(error);
	}
};
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
