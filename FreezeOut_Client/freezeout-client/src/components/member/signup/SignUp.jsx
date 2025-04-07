import { useMemo, useState } from "react";
import axios from "axios";

const SignUp = () => {
    const inputFields = [
        {
            id: "username",
            label: "아이디",
            type: "text",
            placeholder: "사용할 아이디를 입력해 주세요.",
            validationKey: "id",
        },
        {
            id: "password",
            label: "비밀번호",
            type: "password",
            placeholder: "사용할 비밀번호를 입력해 주세요.",
            validationKey: "password",
        },
        {
            id: "nickname",
            label: "닉네임",
            type: "text",
            placeholder: "사용할 닉네임을 입력해 주세요.",
            validationKey: "nickname",
        },
        {
            id: "realname",
            label: "이름",
            type: "text",
            placeholder: "이름을 입력해 주세요.",
            validationKey: "name",
        },
        {
            id: "email",
            label: "이메일",
            type: "email",
            placeholder: "이메일을 입력해 주세요.",
            validationKey: "email",
        },
    ];

    const validationRules = useMemo(
        () => ({
            id: {
                regExp: /^[a-z][a-z0-9]{6,14}[0-9]$/,
                successMessage: "사용 가능한 아이디 입니다.",
                errorMessage: "사용 불가능한 아이디 입니다.",
                helperMessage: "8 ~ 16자, 영어 소문자로 시작해서 숫자로 끝나야 합니다.",
            },
            password: {
                regExp: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,30}$/,
                successMessage: "사용 가능한 비밀번호 입니다.",
                errorMessage: "사용 불가능한 비밀번호 입니다.",
                helperMessage: "8 ~ 30자, 영어 알파벳과 숫자, 특수문자가 포함되어야 합니다.",
            },
            nickname: {
                regExp: /^[\uAC00-\uD7A3a-zA-Z0-9]{2,10}$/,
                successMessage: "사용 가능한 닉네임 입니다.",
                errorMessage: "사용 불가능한 닉네임 입니다.",
                helperMessage: "2 ~ 10자, 한글과 영어 알파벳, 숫자로 이루어져야 합니다.",
            },
            name: {
                regExp: /^([a-zA-Z]{2,30}|[\uAC00-\uD7A3]{2,5})$/,
                successMessage: "사용 가능한 이름 입니다.",
                errorMessage: "잘못된 이름 형식 입니다.",
            },
            email: {
                regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                successMessage: "사용 가능한 이메일 입니다.",
                errorMessage: "잘못된 이메일 형식 입니다.",
                helperMessage: "이메일 형식을 확인해 주세요. (예: example@email.com)",
            },
        }),
        []
    );

    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        nickname: "",
        realname: "",
        email: "",
    });

    const [fieldErrors, setFieldErrors] = useState({
        id: "",
        password: "",
        nickname: "",
        name: "",
        email: "",
    });

    const [isEmptyErrors, setIsEmptyErrors] = useState({
        id: "",
        password: "",
        nickname: "",
        name: "",
        email: "",
    });

    const [helperMessages, setHelperMessages] = useState({
        id: "",
        password: "",
        nickname: "",
        name: "",
        email: "",
    });

    const [isValid, setIsValid] = useState({
        id: null,
        password: null,
        nickname: null,
        name: null,
        email: null,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
        setIsEmptyErrors({ ...isEmptyErrors, [id]: "" });

        const field = inputFields.find((f) => f.id === id);
        const validation = validationRules[field.validationKey];

        if (!validation) return;

        if (!value) {
            setHelperMessages({ ...helperMessages, [id]: "" });
            setIsValid({ ...isValid, [id]: null });
            setFieldErrors({ ...fieldErrors, [id]: "" });
            return;
        }

        if (!validation.regExp.test(value)) {
            setHelperMessages({ ...helperMessages, [id]: validation.helperMessage || "" });
            setIsValid({ ...isValid, [id]: false });
            setFieldErrors({ ...fieldErrors, [id]: validation.errorMessage });
        } else {
            setHelperMessages({ ...helperMessages, [id]: "" });
            setIsValid({ ...isValid, [id]: true });
            setFieldErrors({ ...fieldErrors, [id]: validation.successMessage });
        }
    };

    const validateForm = () => {
        let isValid = true;
        let focusedElement = null;

        inputFields.forEach((field) => {
            const key = field.id;

            if (!formValues[key]) {
                let particle = "을";

                if (key === "username" || key === "password") {
                    particle = "를";
                }

                const labelMap = {
                    username: "아이디",
                    password: "비밀번호",
                    nickname: "닉네임",
                    realname: "이름",
                    email: "이메일",
                };

                setIsEmptyErrors((prev) => ({
                    ...prev,
                    [key]: `${labelMap[key]}${particle} 입력해주세요.`,
                }));

                if (!focusedElement) {
                    focusedElement = document.getElementById(key);
                }
                isValid = false;
            }

            if (formValues[key] && !validationRules[field.validationKey].regExp.test(formValues[key])) {
                setFieldErrors((prev) => ({
                    ...prev,
                    [key]: validationRules[field.validationKey].errorMessage,
                }));

                if (!focusedElement) {
                    focusedElement = document.getElementById(key);
                }
                isValid = false;
            }
        });

        if (focusedElement) {
            focusedElement.focus();
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        axios
            .post(`http://localhost/users`, formValues)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("회원가입 완료:", formValues);
    };

    return (
        <main className="h-full flex justify-center items-center">
            <div className="w-lg h-auto my-32 flex flex-col justify-center items-center bg-white rounded-xl shadow-md">
                <h1 className="w-fit my-16 text-4xl">회원가입</h1>
                <div className="w-md mb-16 flex flex-col items-center">
                    {inputFields.map((field) => (
                        <div key={field.id} className="w-sm my-6">
                            <label htmlFor={field.id} className="ml-1 text-xl">
                                {field.label}
                            </label>
                            <div>
                                <input
                                    id={field.id}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={formValues[field.id]}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-2 text-lg border border-gray-100 rounded-sm"
                                />
                            </div>
                            <div>
                                {isEmptyErrors[field.id] && <p className="mt-1 ml-1 text-red-500">{isEmptyErrors[field.id]}</p>}
                                {fieldErrors[field.id] && <p className={`mt-2 ml-1 ${isValid[field.id] ? "text-green-500" : "text-red-500"}`}>{fieldErrors[field.id]}</p>}
                                {helperMessages[field.id] && <p className="mt-1 ml-1 text-sm text-red-500">{helperMessages[field.id]}</p>}
                            </div>
                        </div>
                    ))}
                    <button onClick={handleSubmit} className="w-48 h-16 mt-12 text-xl border border-gray-100 rounded-full hover:bg-black hover:text-white hover:shadow-md cursor-pointer">
                        가입하기
                    </button>
                </div>
            </div>
        </main>
    );
};

export default SignUp;
