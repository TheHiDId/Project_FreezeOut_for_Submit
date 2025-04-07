import axios from "axios";
import { useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const inputFields = [
        {
            id: "username",
            label: "아이디",
            type: "text",
            placeholder: "아이디를 입력해 주세요.",
            validationKey: "id",
        },
        {
            id: "password",
            label: "비밀번호",
            type: "password",
            placeholder: "비밀번호를 입력해 주세요.",
            validationKey: "password",
        },
    ];

    const validationRules = useMemo(
        () => ({
            id: {
                regExp: /^[a-z][a-z0-9]{6,14}[0-9]$/,
                errorMessage: "잘못된 아이디 입니다.",
            },
            password: {
                regExp: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,30}$/,
                errorMessage: "잘못된 비밀번호 입니다.",
            },
        }),
        []
    );

    const [keep, isKeep] = useState(false);

    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        keep: false,
    });

    const [isEmptyErrors, setIsEmptyErrors] = useState({
        username: "",
        password: "",
    });

    const navi = useNavigate();

    const keepBtnRef = useRef(null);

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
                if (key === "username" || key === "password") {
                    particle = "를";
                }

                const labelMap = {
                    username: "아이디",
                    password: "비밀번호",
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

    const handleKeep = () => {
        if (keep === false) {
            keepBtnRef.current.classList.add("bg-black");
            isKeep(true);
            setFormValues({ ...formValues, keep: true });
        } else {
            keepBtnRef.current.classList.remove("bg-black");
            isKeep(false);
            setFormValues({ ...formValues, keep: false });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        axios
            .post(`http://localhost/auth/login`, formValues)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(formValues);
    };

    return (
        <main className="h-full flex justify-center items-center">
            <div className="w-lg h-auto my-32 flex flex-col justify-center items-center bg-white rounded-xl shadow-md">
                <h1 className="w-fit my-16 text-4xl">로그인</h1>
                <div className="w-md mb-16 flex flex-col items-center">
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
                    <div className="w-sm mt-4 flex">
                        <button id="keep" ref={keepBtnRef} onClick={handleKeep} className="size-6 mr-2 text-gray-200 border border-gray-200 rounded-full">
                            ✓
                        </button>
                        <label htmlFor="keep">로그인 상태 유지</label>
                    </div>
                    <button onClick={handleSubmit} className="w-48 h-16 my-12 text-xl border border-gray-100 rounded-full hover:bg-black hover:text-white hover:shadow-md cursor-pointer">
                        로그인
                    </button>
                    <div className="flex justify-center">
                        <a onClick={() => navi("/find-id")} className="mx-4 rounded-md hover:bg-black hover:text-white hover:shadow-md cursor-pointer">
                            아이디 찾기
                        </a>
                        <a onClick={() => navi("/find-pw")} className="mx-4 rounded-md hover:bg-black hover:text-white hover:shadow-md cursor-pointer">
                            비밀번호 찾기
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
