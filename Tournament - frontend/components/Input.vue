<template>
    <div>
        <input :type="type_name" :class="class_name" value :placeholder="placeholder_name" :form="form_id" :id="id" :style="{background: image_link}" >
    </div>
</template>
<script>
export default {
    name: 'Input',
    props:{
        class_name: String,
        type_name: String,
        placeholder_name: String,
        form_id: String,
        id: String,
        image_link: String,
    }
}
</script>