<template>
    <div style="width: 70%;">
      <BasicEditor></BasicEditor>
    </div>
    <div style="width: 600px;">
      <a-form
        ref="formRef"
        :model="dynamicValidateForm"
        v-bind="formItemLayoutWithOutLabel"
      >
        <a-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :key="domain.key"
          v-bind="index === 0 ? formItemLayout : {}"
          :label="index === 0 ? '标签' : ''"
          :name="['domains', index, 'value']"
          :rules="{
            required: true,
            message: 'domain can not be null',
            trigger: 'change',
          }"
        >
          <a-input
            v-model:value="domain.value"
            placeholder="请输入标签"
            style="width: 60%; margin-right: 8px"
          />
          <MinusCircleOutlined
            v-if="dynamicValidateForm.domains.length > 1"
            class="dynamic-delete-button"
            :disabled="dynamicValidateForm.domains.length === 1"
            @click="removeDomain(domain)"
          />
        </a-form-item>
        <a-form-item >
          <a-button type="dashed" style="width: 60%" @click="addDomain">
            <PlusOutlined />
            更多标签
          </a-button>
        </a-form-item>
      </a-form>
      </div>
  </template>
  
  <script lang="ts" setup>

    import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
    import { reactive, ref } from 'vue';
    import BasicEditor from '../../../components/wangEditor/BasicEditor.vue'
    import { PlusCircleFilled } from '@ant-design/icons-vue'
    interface Domain {
      value: string;
      key: number;
    }
    const formRef = ref();
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const formItemLayoutWithOutLabels = {
      wrapperCol: { xs: { span: 24, offset: 0 },sm: { span: 20, offset: 4 },},
    };
    const dynamicValidateForm = reactive<{ domains: Domain[] }>({
      domains: [],
    });
    const submitForm = () => {
      formRef.value.validate().then(() => {
          console.log('values', dynamicValidateForm.domains);
      }).catch((error:any) => {
          console.log('error', error);
      });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const removeDomain = (item: Domain) => {
      let index = dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1);
      }
    };
    const addDomain = () => {
      dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
      });
    }
  </script>

<style lang="less" scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>

