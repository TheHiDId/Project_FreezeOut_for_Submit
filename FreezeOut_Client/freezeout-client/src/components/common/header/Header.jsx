import React from "react";
import FreezeOut_Logo from "/src/assets/freezeout_logo.png";
import { useNavigate } from "react-router-dom";

const NavItem = ({ text, path, onClick, children }) => {
    return (
        <li className="group relative h-full mx-8 flex items-center">
            <div className="rounded-md group-hover:bg-black group-hover:text-white group-hover:shadow-md transition-colors duration-100 cursor-pointer flex items-center" onClick={onClick}>
                {text}
            </div>
            {children && (
                <ul className="absolute top-full left-1/2 transform -translate-x-1/2 w-48 bg-white border border-gray-200 rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10">
                    {React.Children.toArray(children).map((child, index) => (
                        <li key={index}>{child}</li>
                    ))}
                </ul>
            )}
        </li>
    );
};

const DropdownItem = ({ text, path, onClick }) => {
    return (
        <div className="px-4 py-3 hover:bg-gray-100 text-xl text-center cursor-pointer" onClick={onClick}>
            {text}
        </div>
    );
};

const Header = () => {
    const navigate = useNavigate();

    const mainNavItems = [
        {
            text: "소개",
            path: "/",
            children: (
                <ul>
                    <li>
                        <DropdownItem key={0} text="프리즈 아웃" path="/" onClick={() => navigate("/")} />
                    </li>
                    <li>
                        <DropdownItem key={1} text="텍사스 홀덤" path="/" onClick={() => navigate("/")} />
                    </li>
                    <li>
                        <DropdownItem key={2} text="토너먼트" path="/" onClick={() => navigate("/")} />
                    </li>
                </ul>
            ),
        },
        {
            text: "공지사항",
            path: "/",
            children: (
                <ul>
                    <li>
                        <DropdownItem key={0} text="공지사항" path="/" onClick={() => navigate("/")} />
                    </li>
                    <li>
                        <DropdownItem key={1} text="온라인 대회 일정" path="/" onClick={() => navigate("/")} />
                    </li>
                    <li>
                        <DropdownItem key={2} text="오프라인 대회 일정" path="/" onClick={() => navigate("/")} />
                    </li>
                </ul>
            ),
        },
        {
            text: "커뮤니티",
            path: "/",
            children: (
                <ul>
                    <li>
                        <DropdownItem key={0} text="자유 게시판" path="/" onClick={() => navigate("/")} />
                    </li>
                    <li>
                        <DropdownItem key={1} text="핸드 게시판" path="/" onClick={() => navigate("/")} />
                    </li>
                    <li>
                        <DropdownItem key={2} text="문의 게시판" path="/" onClick={() => navigate("/")} />
                    </li>
                </ul>
            ),
        },
    ];

    const authNavItems = [
        { text: "로그인", path: "/login" },
        { text: "회원가입", path: "/sign-up" },
        // { text: "내 정보", path: "/" },
        // { text: "로그아웃", path: "/" },
    ];

    return (
        <header className="flex justify-center bg-white shadow-md">
            <section className="w-7xl h-32 flex">
                <div className="w-4/5 h-full flex justify-center items-center">
                    <div className="w-144 h-full cursor-pointer">
                        <a onClick={() => navigate("/")}>
                            <img className="size-full" src={FreezeOut_Logo} alt="FreezeOut Logo" />
                        </a>
                    </div>
                    <nav className="size-full">
                        <ul className="h-full gap-x-8 flex justify-center text-3xl">
                            {mainNavItems.map((item, index) => (
                                <NavItem key={index} text={item.text} path={item.path} onClick={() => navigate(item.path)}>
                                    {item.children}
                                </NavItem>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="w-1/5 h-full flex items-center">
                    <nav className="size-full">
                        <ul className="h-full flex justify-end text-xl">
                            {authNavItems.map((item, index) => (
                                <li className="group h-full mx-2 flex items-center" key={index}>
                                    <div
                                        className="rounded-md group-hover:bg-black group-hover:text-white group-hover:shadow-md transition-colors duration-100 cursor-pointer"
                                        onClick={() => navigate(item.path)}
                                    >
                                        {item.text}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </section>
        </header>
    );
};

export default Header;
