import { isEmpty, isEqual } from "lodash";

export const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const validatePassword = (password) => {
    const isValidate = { message: "", isValid: true }
    if (password < 6) {
        isValidate.message = "valor de contraseña no valido"
        isValidate.isValid = false
    }

    return isValidate
}

export const validateConfirm = (confirm, password) => {
    const isValidateConfirm = { message: "", isValid: true }
    if (password != confirm) {
        isValidateConfirm.message = "password y confirmacion son distintos"
        isValidateConfirm.isValid = false
    }

    return isValidateConfirm
}

export const validateNameSurname = (nameuser, surname) => {
    const isValidate = { message: "", isValid: true }

    if (isEmpty(nameuser)) {
        isValidate.isValid = false;
        isValidate.message = "Nombre no puede estar vacio"
    }

    if (isEmpty(surname)) {
        isValidate.isValid = false;
        isValidate.message = "Apellido no puede estar vacio"
    }

    return isValidate
}

export const validateCompareSameName = (oldName, newname) => {
    const isValidate = { message: "", isValid: true }

    if (isEqual(oldName, newname)) {
        isValidate.isValid = false;
        isValidate.message = "No has modificado el nombre"
    }

    return isValidate
}