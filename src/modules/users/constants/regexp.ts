export const regexp = {
  email: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: new RegExp(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
  ),
  phone: new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
};
