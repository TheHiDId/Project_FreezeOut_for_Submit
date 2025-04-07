import { useState, useMemo } from "react";

const FindId = () => {
    const inputFields = [
        {
            id: "nickname",
            label: "닉네임",
            type: "text",
            placeholder: "사용 중인 닉네임을 입력해 주세요.",
            validationKey: "nickname",
        },
        {
            id: "realname",
            label: "이름",
            type: "text",
            placeholder: "가입 시 입력했던 이름을 입력해 주세요.",
            validationKey: "name",
        },
        {
            id: "email",
            label: "이메일",
            type: "email",
            placeholder: "가입 시 입력했던 이메일을 입력해 주세요.",
            validationKey: "email",
        },
    ];

    const validationRules = useMemo(
        () => ({
            nickname: {
                regExp: /^[\uAC00-\uD7A3a-zA-Z0-9]{2,10}$/,
                successMessage: "사용 가능한 닉네임 입니다.",
                errorMessage: "잘못된 닉네임 입니다.",
                helperMessage: "2 ~ 10자, 한글과 영어 알파벳, 숫자로 이루어져야 합니다.",
            },
            name: {
                regExp: /^([a-zA-Z]{2,30}|[\uAC00-\uD7A3]{2,5})$/,
                successMessage: "사용 가능한 이름 입니다.",
                errorMessage: "잘못된 이름 입니다.",
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
        nickname: "",
        realname: "",
        email: "",
    });

    const [isEmptyErrors, setIsEmptyErrors] = useState({
        nickname: "",
        realname: "",
        email: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
        setIsEmptyErrors({ ...isEmptyErrors, [id]: "" });
    };

    const validateForm = () => {
        let isValid = true;
        let focusedElement = null;

        inputFields.forEach((field) => {
            const key = field.id;

            if (!formValues[key]) {
                let particle = "을";

                const labelMap = {
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
                setIsEmptyErrors((prev) => ({
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
        // axios
        console.log("아이디 찾기 완료:", formValues);
    };

    return (
        <main className="h-full flex justify-center items-center">
            <div className="w-lg h-auto my-32 flex flex-col justify-center items-center bg-white rounded-xl shadow-md">
                <h1 className="w-fit my-16 text-4xl">아이디 찾기</h1>
                <form className="w-md mb-16 flex flex-col items-center" onSubmit={handleSubmit}>
                    {inputFields.map((field) => {
                        return (
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
                                <div>{isEmptyErrors[field.id] && <p className="mt-1 ml-1 text-red-500">{isEmptyErrors[field.id]}</p>}</div>
                            </div>
                        );
                    })}
                    <button type="submit" className="w-48 h-16 mt-12 text-xl border border-gray-100 rounded-full hover:bg-black hover:text-white hover:shadow-md cursor-pointer">
                        아이디 찾기
                    </button>
                </form>
            </div>
        </main>
    );
};

export default FindId;
