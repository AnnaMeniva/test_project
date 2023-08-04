import * as Yup from 'yup';

const SchemaTitleForm = Yup.object().shape({
    edit: Yup.string().min(3, "title must be longer than 3").max(20,"title must be shorter than 20").required()
   
})

export default SchemaTitleForm;
