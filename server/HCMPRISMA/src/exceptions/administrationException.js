import { createError } from 'apollo-errors';

const exceptions = {
    orgwithoutname: {
    message: "Organization creation failed, because organization name can not be null",
    code: 100001,
  }
}
const orgwithoutnameException = createError('orgwithoutname', {
  message: exceptions.orgwithoutname.message,
  data: { code: exceptions.orgwithoutname.code },
});

export {orgwithoutnameException}