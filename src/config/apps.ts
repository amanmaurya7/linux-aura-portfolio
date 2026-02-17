
import photo from "../assets/IMG_1172.jpg";

export const appConfigs: any = {
    Profile: {
        title: "About Me",
        component: "Profile",
        props: {
            name: "Aman Maurya",
            title: "Software Developer",
            location: "Mumbai, Maharashtra, India",
            email: "amaurya.dev@gmail.com",
            photo: photo,
            linkedIn: "https://www.linkedin.com/in/amanmaurya-me/",
            github: "https://github.com/amanmaurya7",
            resume: "https://drive.google.com/file/d/1IUvCaLDExGS29Dhd3i1AOXY_smeX5Uwn/view?usp=drive_link"
        }
    },
    Experience: { title: "Experience", component: "Experience", props: {} },
    Projects: { title: "Projects", component: "Projects", props: {} },
    Skills: { title: "Skills", component: "Skills", props: {} },
    Education: { title: "Education", component: "Education", props: {} },
    Awards: { title: "Awards", component: "Awards", props: {} },
    Contact: {
        title: "Contact",
        component: "Contact",
        props: {
            email: "amaurya.dev@gmail.com",
            location: "Mumbai, Maharashtra, India",
            linkedin: "https://www.linkedin.com/in/amanmaurya-me/",
            github: "https://github.com/amanmaurya7"
        }
    },
    Terminal: { title: "Terminal", component: "Terminal", props: {} }
};
