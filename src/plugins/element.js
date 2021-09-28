import {
  ElButton,
  ElConfigProvider,
  ElInput,
  ElSelect,
  ElDatePicker,
  ElDialog,
  ElForm,
  ElFormItem,
  ElLoading
} from 'element-plus';

export default (app) => {
  app.use(ElButton);
  app.use(ElConfigProvider);
  app.use(ElInput);
  app.use(ElSelect);
  app.use(ElDatePicker);
  app.use(ElDialog);
  app.use(ElForm);
  app.use(ElFormItem);
  app.use(ElLoading);
};